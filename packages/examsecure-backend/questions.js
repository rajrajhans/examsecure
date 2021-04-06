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

exports.getQuestions = async (event) => {
  let questionSetID = event.queryStringParameters.qSetID;
  let firebaseURL = `https://project2-e6924-default-rtdb.firebaseio.com/questions/${questionSetID}.json?auth=${firebaseApiKey}`;
  let questions;

  await fetch(firebaseURL)
    .then((res) => res.json())
    .then((data) => {
      questions = data;
    })
    .catch(() => console.log("error"));

  return respond(200, { questions: questions });
};

exports.getQuestionSets = async (event) => {
  // const body = JSON.parse(event.body);
  // let username = body.username;

  let firebaseURL = `https://project2-e6924-default-rtdb.firebaseio.com/questionSets/.json?auth=${firebaseApiKey}`;
  let questionSets;

  await fetch(firebaseURL)
    .then((res) => res.json())
    .then((data) => {
      questionSets = data;
    })
    .catch(() => console.log("error"));

  return respond(200, { questionSets: questionSets });
};
