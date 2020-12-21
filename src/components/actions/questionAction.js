import { FETCH_QUESTIONS } from "./types";
import gateway from "../../utils/gateway";

function fetchQuestions(qSetID, selectedQSetDuration) {
  return function (dispatch) {
    gateway.getQuestions(qSetID).then((questionsData) => {
      dispatch({
        type: FETCH_QUESTIONS,
        payload: {
          ...questionsData,
          questionSetID: qSetID,
          selectedQSetDuration: selectedQSetDuration,
        },
      });
    });
  };
}

export default fetchQuestions;
