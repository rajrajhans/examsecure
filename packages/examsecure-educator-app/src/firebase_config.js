import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBDpRAq-bM-El7_YUiyV6WVFaaNgT7ubnU',
  authDomain: 'project2-e6924.firebaseapp.com',
  projectId: 'project2-e6924',
  storageBucket: 'project2-e6924.appspot.com',
  messagingSenderId: '361613734874',
  appId: '1:361613734874:web:40d4f4f1d7cb4a04fa86e3',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timeStampsInSnapshots: true });

export default firebase;
