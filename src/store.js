import { applyMiddleware, createStore } from "redux";
import rootReducer from "./components/reducers";
import thunk from "redux-thunk";

const initialState = {};

const middleware = [thunk];

const store = createStore(rootReducer, initialState); //todo: after setting up env vars, call redux devtools only in dev environment and not in prod

export default store;
