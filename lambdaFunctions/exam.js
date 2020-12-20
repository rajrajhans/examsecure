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

exports.startExamHandler = async (event) => {
  const body = JSON.parse(event.body);

  let username = body.username;
  let questionSetID = body.questionSetID;
  let timestamp = Date.now();

  let firebaseURL = `https://project2-e6924-default-rtdb.firebaseio.com/users/${username}/${questionSetID}.json?auth=${firebaseApiKey}`;

  await fetch(firebaseURL, {
    method: "put",
    body: `{"examState":1, "isDisqualified":false, "startedAt": "${timestamp}"}`,
  }).catch(() => console.log("error"));

  return respond(200, { status: "done" });
};

exports.endExamHandler = async (event) => {
  const body = JSON.parse(event.body);
  let username = body.username;

  let questionSetID = body.questionSetID;
  let timestamp = Date.now();
  let firebaseURL = `https://project2-e6924-default-rtdb.firebaseio.com/users/${username}/${questionSetID}/examState.json?auth=${firebaseApiKey}`;
  let firebaseURLExamEnded = `https://project2-e6924-default-rtdb.firebaseio.com/users/${username}/${questionSetID}/endedAt.json?auth=${firebaseApiKey}`;

  await fetch(firebaseURL, {
    method: "put",
    body: "0",
  }).catch(() => console.log("error"));

  await fetch(firebaseURLExamEnded, {
    method: "put",
    body: `"${timestamp}"`,
  }).catch(() => console.log("error"));

  return respond(200, { status: "done" });
};

exports.checkIsDisqualified = async (event) => {
  const body = JSON.parse(event.body);
  let username = body.username;
  let isDisqualified = false;
  let questionSetID = body.questionSetID;

  let firebaseURL = `https://project2-e6924-default-rtdb.firebaseio.com/users/${username}/${questionSetID}/isDisqualified.json?auth=${firebaseApiKey}`;

  await fetch(firebaseURL)
    .then((data) => data.text())
    .then((res) => {
      isDisqualified = res;
    })
    .catch(() => console.log("error"));

  return respond(200, { isDisqualified: isDisqualified });
};
