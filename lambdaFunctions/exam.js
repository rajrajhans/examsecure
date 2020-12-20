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

  let firebaseURL = `https://project2-e6924-default-rtdb.firebaseio.com/users/${username}.json?auth=${firebaseApiKey}`;

  await fetch(firebaseURL, {
    method: "put",
    body: '{"examState":"started", "isDisqualified":"false"}',
  }).catch(() => console.log("error"));

  return respond(200, { status: "done" });
};

exports.endExamHandler = async (event) => {
  const body = JSON.parse(event.body);
  let username = body.username;

  let firebaseURL = `https://project2-e6924-default-rtdb.firebaseio.com/users/${username}.json?auth=${firebaseApiKey}`;

  await fetch(firebaseURL, {
    method: "delete",
    body: '{"examState":"ended"}',
  }).catch(() => console.log("error"));

  return respond(200, { status: "done" });
};

exports.checkIsDisqualified = async (event) => {
  const body = JSON.parse(event.body);
  let username = body.username;
  let isDisqualified = false;

  let firebaseURL = `https://project2-e6924-default-rtdb.firebaseio.com/users/${username}/isDisqualified.json?auth=${firebaseApiKey}`;

  await fetch(firebaseURL)
    .then((data) => data.text())
    .then((res) => {
      isDisqualified = res;
    })
    .catch(() => console.log("error"));

  return respond(200, { isDisqualified: isDisqualified });
};
