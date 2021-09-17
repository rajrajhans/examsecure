const AWS = require('aws-sdk');
const uuid = require('uuid').v4;
global.fetch = require('node-fetch');

const {
  COLLECTION_ID,
  FACES_TABLENAME,
  MIN_CONFIDENCE,
  OBJECTS_OF_INTEREST_LABELS,
  REGION,
  firebaseApiKey,
} = process.env;

const rekognition = new AWS.Rekognition({ region: REGION });
const dynamo = new AWS.DynamoDB({ region: REGION });

const respond = (statusCode, response) => ({
  statusCode,
  body: JSON.stringify(response),
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

exports.indexHandler = async (event) => {
  const ExternalImageId = uuid();
  const body = JSON.parse(event.body);

  const indexFace = () =>
    rekognition
      .indexFaces({
        CollectionId: COLLECTION_ID,
        ExternalImageId,
        Image: { Bytes: Buffer.from(body.image, 'base64') },
      })
      .promise();

  const persistMetadata = () =>
    dynamo
      .putItem({
        Item: {
          CollectionId: { S: COLLECTION_ID },
          ExternalImageId: { S: ExternalImageId },
          FullName: { S: body.fullName },
        },
        TableName: FACES_TABLENAME,
      })
      .promise();

  try {
    await indexFace();
    await persistMetadata();
    return respond(200, { ExternalImageId });
  } catch (e) {
    console.log(e);
    return respond(500, { error: e });
  }
};

const fetchFaces = async (imageBytes) => {
  /*
    Detect Faces
    Uses Rekognition's DetectFaces functionality
  */

  const facesTest = {
    TestName: 'Face Detection',
  };

  const detectFaces = () =>
    rekognition
      .detectFaces({
        Attributes: ['ALL'],
        Image: { Bytes: imageBytes },
      })
      .promise();

  try {
    const faces = await detectFaces();
    const nFaces = faces.FaceDetails.length;
    facesTest.Success = nFaces === 1;
    facesTest.Details = nFaces;
    facesTest.MoreDetails = faces.FaceDetails;
  } catch (e) {
    console.log(e);
    facesTest.Success = false;
    facesTest.Details = 'Server error';
  }
  return facesTest;
};

const fetchLabels = async (imageBytes) => {
  /*
    Detect Objects Of Interest and number of Persons
    Uses Rekognition's DetectLabels functionality
  */

  const objectsOfInterestLabels = OBJECTS_OF_INTEREST_LABELS.trim().split(',');
  const objectsOfInterestTest = { TestName: 'Objects of Interest' };
  const peopleTest = { TestName: 'Person Detection' };

  const detectLabels = () =>
    rekognition
      .detectLabels({
        Image: { Bytes: imageBytes },
        MinConfidence: MIN_CONFIDENCE,
      })
      .promise();

  try {
    const labels = await detectLabels();

    const people = labels.Labels.find((x) => x.Name === 'Person');
    const nPeople = people ? people.Instances.length : 0;
    peopleTest.Success = nPeople === 1;
    peopleTest.Details = nPeople;

    const objectsOfInterest = labels.Labels.filter((x) =>
      objectsOfInterestLabels.includes(x.Name),
    );
    objectsOfInterestTest.Success = objectsOfInterest.length === 0;
    objectsOfInterestTest.Details = objectsOfInterestTest.Success
      ? '0'
      : objectsOfInterest
          .map((x) => x.Name)
          .sort()
          .join(', ');
  } catch (e) {
    console.log(e);
    objectsOfInterestTest.Success = false;
    objectsOfInterestTest.Details = 'Server error';
    peopleTest.Success = false;
    peopleTest.Details = 'Server error';
  }
  return [objectsOfInterestTest, peopleTest];
};

const searchForIndexedFaces = async (imageBytes) => {
  /*
    Face Matching

    Uses Rekognition's SearchFacesByImage functionality
    to match face across the database of previously
    indexed faces
  */

  const faceMatchTest = {
    TestName: 'Person Recognition',
    Success: false,
    Details: '0',
  };

  const searchFace = () =>
    rekognition
      .searchFacesByImage({
        CollectionId: COLLECTION_ID,
        FaceMatchThreshold: MIN_CONFIDENCE,
        MaxFaces: 1,
        Image: { Bytes: imageBytes },
      })
      .promise();

  const getFaceByExternalImageId = (id) =>
    dynamo
      .getItem({
        TableName: FACES_TABLENAME,
        Key: { ExternalImageId: { S: id } },
      })
      .promise();

  try {
    const faces = await searchFace();
    const faceDetails = await getFaceByExternalImageId(
      faces.FaceMatches[0].Face.ExternalImageId,
    );

    if (faceDetails.Item) {
      faceMatchTest.Success = true;
      faceMatchTest.Details = faceDetails.Item.FullName.S;
    }
  } catch (e) {
    // When 0 faces are recognized, rekognition.searchFacesByImage throws an error
    console.log(e);
  }
  return faceMatchTest;
};

async function uploadToS3(imageBytes) {
  const s3 = new AWS.S3({ region: REGION });

  const base64Data = new Buffer.from(
    imageBytes.replace(/^data:image\/\w+;base64,/, ''),
    'base64',
  );
  const fileName = uuid();

  const params = {
    Bucket: 'triggered-images',
    Key: `${fileName}.png`,
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: `image/png`,
  };

  let location = '';
  let key = '';
  try {
    const { Location, Key } = await s3.upload(params).promise();
    location = Location;
    key = Key;
  } catch (error) {
    console.log(error);
  }

  return location;
}

async function uploadFlaggedImagetoFirebase(
  s3ImgURL,
  username,
  testRes,
  reason,
  questionSetID,
  test_by,
) {
  let uniqueID = uuid();
  let firebaseURL = `https://project2-e6924-default-rtdb.firebaseio.com/tests/${test_by}/${questionSetID}/flagged_candidates/${username}/${uniqueID}.json?auth=${firebaseApiKey}`;

  let data = {
    imageURL: s3ImgURL,
    testRes: testRes,
    reason: reason,
  };

  await fetch(firebaseURL, {
    method: 'put',
    body: JSON.stringify(data),
  }).catch(() => console.log('error'));
}

async function checkIfFrameisOffendingAndUpload(
  res,
  image,
  username,
  questionSetID,
  test_by,
) {
  if (res[3]['Success'] === false && res[3]['Details'] === 0) {
    let s3URL = await uploadToS3(image);
    await uploadFlaggedImagetoFirebase(
      s3URL,
      username,
      res,
      "Face Not Detected in Candidate's Camera Frame",
      questionSetID,
      test_by,
    );
  } else if (res[1]['Success'] === false && res[3]['Details'] > 1) {
    let s3URL = await uploadToS3(image);
    await uploadFlaggedImagetoFirebase(
      s3URL,
      username,
      res,
      "Multiple People Detected in Candidate's Camera Frame",
      questionSetID,
      test_by,
    );
  } else if (res[0]['Success'] === false) {
    let s3URL = await uploadToS3(image);
    await uploadFlaggedImagetoFirebase(
      s3URL,
      username,
      res,
      "Mobile Phone Detected in Candidate's Camera Frame",
      questionSetID,
      test_by,
    );
  } else if (res[3]['MoreDetails'][0]) {
    let headPoseAnalysis = isHeadPoseOK(
      res[3]['MoreDetails'][0]['Pose'].Yaw,
      res[3]['MoreDetails'][0]['Pose'].Pitch,
    );

    if (headPoseAnalysis !== 'OK') {
      let s3URL = await uploadToS3(image);
      await uploadFlaggedImagetoFirebase(
        s3URL,
        username,
        res,
        headPoseAnalysis,
        questionSetID,
        test_by,
      );
    }
  }
}

exports.processHandler = async (event) => {
  const body = JSON.parse(event.body);
  const email = body.email.replace(/[., $, \[, \], #, \/]/g, '');
  const questionSetID = body.questionSetID;
  const test_by = body.test_by;
  const imageBytes = Buffer.from(body.image, 'base64');

  const result = await Promise.all([
    fetchLabels(imageBytes),
    searchForIndexedFaces(imageBytes),
    fetchFaces(imageBytes),
  ]);

  const res = result.flat();

  await checkIfFrameisOffendingAndUpload(
    res,
    body.image,
    email,
    questionSetID,
    test_by,
  );

  return respond(200, res);
};

function isHeadPoseOK(yaw, pitch) {
  let yawDeviation = '';
  let pitchDeviation = '';
  let res = '';

  if (yaw < -8) yawDeviation += 'Right';
  else if (yaw > 8) yawDeviation += 'Left';

  if (pitch < -11) pitchDeviation += ' Down';
  else if (pitch > 11) pitchDeviation += ' Up';

  if (yawDeviation && pitchDeviation) {
    res = `The candidate is facing ${yawDeviation} & ${pitchDeviation}`;
  } else if (yawDeviation) {
    res = `The candidate is facing ${yawDeviation}.`;
  } else if (pitchDeviation) {
    res = `The candidate is facing ${pitchDeviation}`;
  }

  if (!res) return 'OK';

  return res;
}
