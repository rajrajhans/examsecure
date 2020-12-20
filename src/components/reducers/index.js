import { combineReducers } from "redux";
import questionSetsReducer from "./questionSetsReducer";

export default combineReducers({
  questionsSetsState: questionSetsReducer,
});
