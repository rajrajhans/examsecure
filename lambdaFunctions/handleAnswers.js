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

exports.updateAnswer = async (event) => {
  const body = JSON.parse(event.body);
  let username = body.username;
  let questionSetID = body.qSetID;
  let questionID = body.qID;
  let userSelectedAnswer = body.selectedAnswer;

  let firebaseURL = `https://project2-e6924-default-rtdb.firebaseio.com/users/${username}/${questionSetID}/userAnswers/${questionID}.json?auth=${firebaseApiKey}`;

  await fetch(firebaseURL, {
    method: "PUT",
    body: `"${userSelectedAnswer}"`,
  }).catch(() => console.log("error"));

  return respond(200, { status: "done " });
};

exports.getSavedAnswers = async (event) => {
  const body = JSON.parse(event.body);
  let username = body.username;
  let questionSetID = body.qSetID;
  let savedAnswers = null;

  let firebaseURL = `https://project2-e6924-default-rtdb.firebaseio.com/users/${username}/${questionSetID}/userAnswers.json?auth=${firebaseApiKey}`;

  await fetch(firebaseURL)
    .then((res) => res.json())
    .then((data) => {
      savedAnswers = data;
    })
    .catch(() => console.log("error"));

  return respond(200, { savedAnswers: savedAnswers });
};
