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

exports.updateAnswer = async (event) => {
  const body = JSON.parse(event.body);
  let email = body.email.replace(/[., $, \[, \], #, \/]/g, '');
  let questionSetID = body.qSetID;
  let questionID = body.qID;
  let userSelectedAnswer = body.selectedAnswer;
  let test_by = body.test_by;

  let firebaseURL = `https://project2-e6924-default-rtdb.firebaseio.com/tests/${test_by}/${questionSetID}/candidates/${email}/candidate_answers/${questionID}.json?auth=${firebaseApiKey}`;

  await fetch(firebaseURL, {
    method: 'PUT',
    body: `"${userSelectedAnswer}"`,
  }).catch(() => console.log('error'));

  return respond(200, { status: 'done ' });
};

exports.getSavedAnswers = async (event) => {
  const body = JSON.parse(event.body);
  let email = body.email.replace(/[., $, \[, \], #, \/]/g, '');
  let questionSetID = body.qSetID;
  let savedAnswers = null;
  let test_by = body.test_by;

  let firebaseURL = `https://project2-e6924-default-rtdb.firebaseio.com/tests/${test_by}/${questionSetID}/candidates/${email}/${questionSetID}/candidate_answers.json?auth=${firebaseApiKey}`;

  await fetch(firebaseURL)
    .then((res) => res.json())
    .then((data) => {
      savedAnswers = data;
    })
    .catch(() => console.log('error'));

  return respond(200, { savedAnswers: savedAnswers });
};
