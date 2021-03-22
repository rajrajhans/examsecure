import { FETCH_QUESTIONS } from "../actions/types";

const initialState = {
  questions: [],
};

const questionsReducer = (state = initialState, action) => {
  if (action.type === FETCH_QUESTIONS) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return state;
};

export default questionsReducer;
