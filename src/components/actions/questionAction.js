import { FETCH_QUESTIONS } from "./types";
import gateway from "../../utils/gateway";

function fetchQuestions(qSetID) {
  return function (dispatch) {
    gateway.getQuestions(qSetID).then((questionsData) => {
      dispatch({
        type: FETCH_QUESTIONS,
        payload: questionsData,
      });
    });
  };
}

export default fetchQuestions;
