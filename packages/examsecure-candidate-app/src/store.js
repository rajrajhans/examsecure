import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f,
  ),
); //todo: after setting up env vars, call redux devtools only in dev environment and not in prod

export default store;
