import auth from './auth';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { loading } from './loading';

const root = combineReducers({
  auth: auth,
  firebase: firebaseReducer,
  loading: loading,
});

export default root;
