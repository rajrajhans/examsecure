global.fetch = require('node-fetch');

const { firebaseApiKey } = process.env;

const respond = (httpStatusCode, response) => ({
  isBase64Encoded: false,
  statusCode: httpStatusCode,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(response),
});

//todo: clean up this messy bad bad code

exports.startExamHandler = async (event) => {
  const body = JSON.parse(event.body);

  let username = body.username;
  let email = body.email.replace(/[., $, \[, \], #, \/]/g, '');
  let questionSetID = body.questionSetID;
  let test_by = body.test_by;

  let firebaseUserExamObjectURL = `https://project2-e6924-default-rtdb.firebaseio.com/tests/${test_by}/${questionSetID}/candidates/${email}.json?auth=${firebaseApiKey}`;

  let userExamObj = null;
  let userExamStartedAt = null;

  await fetch(firebaseUserExamObjectURL)
    .then((data) => data.json())
    .then((res) => {
      userExamObj = res;
    })
    .catch(() => console.log('error'));

  if (userExamObj) {
    userExamObj.loginCount = userExamObj.loginCount + 1;
    userExamStartedAt = userExamObj.startedAt;
  } else {
    userExamObj = {
      examState: 1,
      isDisqualified: false,
      startedAt: Date.now(),
      loginCount: 1,
      candidateName: username,
    };
  }

  await fetch(firebaseUserExamObjectURL, {
    method: 'put',
    body: JSON.stringify(userExamObj),
  }).catch(() => console.log('error'));

  return respond(200, { startedAt: userExamStartedAt });
};

exports.endExamHandler = async (event) => {
  const body = JSON.parse(event.body);
  let email = body.email.replace(/[., $, \[, \], #, \/]/g, '');

  let questionSetID = body.questionSetID;
  let timestamp = Date.now();

  let test_by = body.test_by;

  let firebaseUserExamObjectURL = `https://project2-e6924-default-rtdb.firebaseio.com/tests/${test_by}/${questionSetID}/candidates/${email}.json?auth=${firebaseApiKey}`;

  let userExamObj = null;

  await fetch(firebaseUserExamObjectURL)
    .then((data) => data.json())
    .then((res) => {
      userExamObj = res;
    })
    .catch(() => console.log('error'));

  userExamObj.endedAt = timestamp;
  userExamObj.examState = 0;

  await fetch(firebaseUserExamObjectURL, {
    method: 'put',
    body: JSON.stringify(userExamObj),
  }).catch(() => console.log('error'));

  return respond(200, { status: 'done' });
};

exports.checkIsDisqualified = async (event) => {
  const body = JSON.parse(event.body);
  let email = body.email.replace(/[., $, \[, \], #, \/]/g, '');
  let isDisqualified = false;
  let questionSetID = body.questionSetID;
  let timestamp = body.timeRemaining;
  let test_by = body.test_by;

  let firebaseURL = `https://project2-e6924-default-rtdb.firebaseio.com/tests/${test_by}/${questionSetID}/candidates/${email}/isDisqualified.json?auth=${firebaseApiKey}`;
  let firebaseLastAliveURL = `https://project2-e6924-default-rtdb.firebaseio.com/tests/${test_by}/${questionSetID}/candidates/${email}/timeRemaining.json?auth=${firebaseApiKey}`;

  await fetch(firebaseURL)
    .then((data) => data.text())
    .then((res) => {
      isDisqualified = res;
    })
    .catch(() => console.log('error'));

  await fetch(firebaseLastAliveURL, {
    method: 'put',
    body: `"${timestamp}"`,
  }).catch(() => console.log('error'));

  return respond(200, { isDisqualified: isDisqualified });
};

exports.getLastAlive = async (event) => {
  const body = JSON.parse(event.body);
  let email = body.email.replace(/[., $, \[, \], #, \/]/g, '');
  let timeRemaining = null;
  let questionSetID = body.questionSetID;
  let test_by = body.test_by;

  let firebaseTimeRemainingURL = `https://project2-e6924-default-rtdb.firebaseio.com/tests/${test_by}/${questionSetID}/candidates/${email}/timeRemaining.json?auth=${firebaseApiKey}`;

  await fetch(firebaseTimeRemainingURL)
    .then((data) => data.text())
    .then((res) => {
      timeRemaining = res;
    })
    .catch(() => console.log('error'));

  return respond(200, { lastAlive: timeRemaining });
};
