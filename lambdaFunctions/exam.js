global.fetch = require("node-fetch");

const { firebaseApiKey } = process.env;

const respond = (httpStatusCode, response) => ({
  isBase64Encoded: false,
  statusCode: httpStatusCode,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(response),
});

//todo: clean up this messy bad bad code

exports.startExamHandler = async (event) => {
  const body = JSON.parse(event.body);

  let username = body.username;
  let questionSetID = body.questionSetID;

  let firebaseUserExamObjectURL = `https://project2-e6924-default-rtdb.firebaseio.com/users/${username}/${questionSetID}.json?auth=${firebaseApiKey}`;

  let userExamObj = null;

  await fetch(firebaseUserExamObjectURL)
    .then((data) => data.json())
    .then((res) => {
      userExamObj = res;
    })
    .catch(() => console.log("error"));

  if (userExamObj) {
    userExamObj.lastAlive = Date.now();
    userExamObj.loginCount = userExamObj.loginCount + 1;
  } else {
    userExamObj = {
      examState: 1,
      isDisqualified: false,
      startedAt: Date.now(),
      lastAlive: Date.now(),
      loginCount: 1,
    };
  }

  await fetch(firebaseUserExamObjectURL, {
    method: "put",
    body: JSON.stringify(userExamObj),
  }).catch(() => console.log("error"));

  return respond(200, { status: "done" });
};

exports.endExamHandler = async (event) => {
  const body = JSON.parse(event.body);
  let username = body.username;

  let questionSetID = body.questionSetID;
  let timestamp = Date.now();

  let firebaseUserExamObjectURL = `https://project2-e6924-default-rtdb.firebaseio.com/users/${username}/${questionSetID}.json?auth=${firebaseApiKey}`;

  let userExamObj = null;

  await fetch(firebaseUserExamObjectURL)
    .then((data) => data.json())
    .then((res) => {
      userExamObj = res;
    })
    .catch(() => console.log("error"));

  userExamObj.endedAt = timestamp;
  userExamObj.examState = 0;

  await fetch(firebaseUserExamObjectURL, {
    method: "put",
    body: JSON.stringify(userExamObj),
  }).catch(() => console.log("error"));

  return respond(200, { status: "done" });
};

exports.checkIsDisqualified = async (event) => {
  const body = JSON.parse(event.body);
  let username = body.username;
  let isDisqualified = false;
  let questionSetID = body.questionSetID;
  let timestamp = Date.now();

  let firebaseURL = `https://project2-e6924-default-rtdb.firebaseio.com/users/${username}/${questionSetID}/isDisqualified.json?auth=${firebaseApiKey}`;
  let firebaseLastAliveURL = `https://project2-e6924-default-rtdb.firebaseio.com/users/${username}/${questionSetID}/lastAlive.json?auth=${firebaseApiKey}`;

  await fetch(firebaseURL)
    .then((data) => data.text())
    .then((res) => {
      isDisqualified = res;
    })
    .catch(() => console.log("error"));

  await fetch(firebaseLastAliveURL, {
    method: "put",
    body: `"${timestamp}"`,
  }).catch(() => console.log("error"));

  return respond(200, { isDisqualified: isDisqualified });
};

exports.getLastAlive = async (event) => {
  const body = JSON.parse(event.body);
  let username = body.username;
  let lastAlive = null;
  let questionSetID = body.questionSetID;

  let firebaseLastAliveURL = `https://project2-e6924-default-rtdb.firebaseio.com/users/${username}/${questionSetID}/lastAlive.json?auth=${firebaseApiKey}`;

  await fetch(firebaseLastAliveURL)
    .then((data) => data.text())
    .then((res) => {
      lastAlive = res;
    })
    .catch(() => console.log("error"));

  return respond(200, { lastAlive: lastAlive });
};
