import request from "./request";

export default {
  addIndexFace(image, fullName) {
    return request("/faces/index", "post", {
      image: image,
      fullName: fullName,
    });
  },

  processImage(image, username) {
    return request("/process", "post", { image: image, username: username });
  },

  startExam(username) {
    return request("/start-exam", "post", { username: username });
  },

  endExam(username) {
    return request("/end-exam", "post", { username: username });
  },

  getQuestionSets() {
    return request("/get-questionsets", "get");
  },

  getQuestions(qSetID) {
    return request(`/get-questions?qSetID=${qSetID}`, "get");
  },

  updateAnswer(username, questionSetID, questionID, userSelectedAnswer) {
    return request("/update-answers", "post", {
      username: username,
      qSetID: questionSetID,
      qID: questionID,
      selectedAnswer: userSelectedAnswer,
    });
  },

  getSavedAnswers(username, questionSetID) {
    return request("/get-saved-answers", "post", {
      username: username,
      qSetID: questionSetID,
    });
  },
};
