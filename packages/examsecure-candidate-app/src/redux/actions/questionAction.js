import { FETCH_QUESTIONS } from './types';
import gateway from '../../utils/gateway';

function fetchQuestions(test_id, selectedQSetMetadata) {
  return function (dispatch) {
    gateway
      .getQuestions(test_id, selectedQSetMetadata.test_by)
      .then((questionsData) => {
        dispatch({
          type: FETCH_QUESTIONS,
          payload: {
            ...questionsData,
            test_id: test_id,
            selectedQSetDuration: selectedQSetMetadata.duration,
            metadata: selectedQSetMetadata,
          },
        });
      });
  };
}

export default fetchQuestions;
