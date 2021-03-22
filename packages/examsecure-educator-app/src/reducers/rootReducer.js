import authReducer from './authreducer'
import {combineReducers} from 'redux'
import studentReducer from './studentReducer'
import proctorReducer from './proctorReducer';
import {firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from 'react-redux-firebase'
import questionReducer from './questionReducer';
import questionSetReducer from './questionSetReducer'
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    students: studentReducer,
    proctor: proctorReducer,
    question: questionReducer,
    questionSet: questionSetReducer,
    users: usersReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;