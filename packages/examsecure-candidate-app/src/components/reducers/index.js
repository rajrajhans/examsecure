import { combineReducers } from "redux";
import questionsReducer from "./questionsReducer";

export default combineReducers({
  questions: questionsReducer,
});
