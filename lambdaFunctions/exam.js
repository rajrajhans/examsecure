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

  let firebaseURL = `https://exam-a3da3-default-rtdb.firebaseio.com/users/${username}.json?auth=${firebaseApiKey}`;

  await fetch(firebaseURL, {
    method: "put",
    body: '{"examState":"started"}',
  }).catch(() => console.log("error"));

  return respond(200, { status: "done" });
};

exports.endExamHandler = async (event) => {
  const body = JSON.parse(event.body);
  let username = body.username;

  let firebaseURL = `https://exam-a3da3-default-rtdb.firebaseio.com/users/${username}.json?auth=${firebaseApiKey}`;

  await fetch(firebaseURL, {
    method: "delete",
    body: '{"examState":"ended"}',
  }).catch(() => console.log("error"));

  return respond(200, { status: "done" });
};
