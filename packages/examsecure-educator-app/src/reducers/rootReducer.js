import authReducer from './authreducer';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { loadingReducer } from './loadingReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  loading: loadingReducer,
});

export default rootReducer;
