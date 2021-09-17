import request from './request';

export default {
  addIndexFace(image, fullName) {
    return request('/faces/index', 'post', {
      image: image,
      fullName: fullName,
    });
  },

  processImage(image, email, questionSetID, test_by) {
    return request('/process', 'post', {
      image: image,
      email: email,
      questionSetID: questionSetID,
      test_by: test_by,
    });
  },

  processDemoImage(image, username) {
    return request('/process-demo-image', 'post', {
      image: image,
      username: username,
      questionSetID: 'null',
    });
  },

  startExam(username, email, questionSetID, test_by) {
    return request('/start-exam', 'post', {
      username: username,
      email: email,
      questionSetID: questionSetID,
      test_by: test_by,
    });
  },

  endExam(email, questionSetID, test_by) {
    return request('/end-exam', 'post', {
      email: email,
      questionSetID: questionSetID,
      test_by: test_by,
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

  updateAnswer(
    username,
    email,
    questionSetID,
    questionID,
    userSelectedAnswer,
    test_by,
  ) {
    return request('/update-answers', 'post', {
      username: username,
      email: email,
      qSetID: questionSetID,
      qID: questionID,
      selectedAnswer: userSelectedAnswer,
      test_by: test_by,
    });
  },

  getSavedAnswers(email, questionSetID, test_by) {
    return request('/get-saved-answers', 'post', {
      email: email,
      qSetID: questionSetID,
      test_by: test_by,
    });
  },

  checkIsDisqualified(email, questionSetID, test_by, timeRemaining) {
    return request('/is-disqualified', 'post', {
      email: email,
      questionSetID: questionSetID,
      timeRemaining: timeRemaining,
      test_by: test_by,
    });
  },

  getLastAlive(email, questionSetID, test_by) {
    return request('/get-lastalive', 'post', {
      email: email,
      questionSetID: questionSetID,
      test_by: test_by,
    });
  },
};
