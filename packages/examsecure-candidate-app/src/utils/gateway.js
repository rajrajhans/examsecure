import request from './request';

export default {
  addIndexFace(image, fullName) {
    return request('/faces/index', 'post', {
      image: image,
      fullName: fullName,
    });
  },

  processImage(image, email, questionSetID) {
    return request('/process', 'post', {
      image: image,
      email: email,
      questionSetID: questionSetID,
    });
  },

  processDemoImage(image, username) {
    return request('/process-demo-image', 'post', {
      image: image,
      username: username,
      questionSetID: 'null',
    });
  },

  startExam(username, email, questionSetID) {
    return request('/start-exam', 'post', {
      username: username,
      email: email,
      questionSetID: questionSetID,
    });
  },

  endExam(email, questionSetID) {
    return request('/end-exam', 'post', {
      email: email,
      questionSetID: questionSetID,
    });
  },

  getQuestionSets() {
    return request('/get-questionsets', 'get');
  },

  getQuestions(test_id, test_by) {
    return request(
      `/get-questions?test_id=${test_id}&test_by=${test_by}`,
      'get',
    );
  },

  updateAnswer(username, email, questionSetID, questionID, userSelectedAnswer) {
    return request('/update-answers', 'post', {
      username: username,
      email: email,
      qSetID: questionSetID,
      qID: questionID,
      selectedAnswer: userSelectedAnswer,
    });
  },

  getSavedAnswers(username, questionSetID) {
    return request('/get-saved-answers', 'post', {
      username: username,
      qSetID: questionSetID,
    });
  },

  checkIsDisqualified(email, questionSetID, timeRemaining) {
    return request('/is-disqualified', 'post', {
      email: email,
      questionSetID: questionSetID,
      timeRemaining: timeRemaining,
    });
  },

  getLastAlive(email, questionSetID) {
    return request('/get-lastalive', 'post', {
      email: email,
      questionSetID: questionSetID,
    });
  },
};
