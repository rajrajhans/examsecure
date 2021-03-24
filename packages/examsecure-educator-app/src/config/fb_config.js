import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'
var firebaseConfig = {
    apiKey: "AIzaSyBDpRAq-bM-El7_YUiyV6WVFaaNgT7ubnU",
    authDomain: "project2-e6924.firebaseapp.com",
    projectId: "project2-e6924",
    storageBucket: "project2-e6924.appspot.com",
    messagingSenderId: "361613734874",
    appId: "1:361613734874:web:40d4f4f1d7cb4a04fa86e3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ timeStampsInSnapshots: true});

  export default firebase;

// import firebase from 'firebase/app'
// import 'firebase/firestore'
// import 'firebase/auth'
// import 'firebase/storage'
// var config = {
//     apiKey: process.env.FIREBASE_CONFIG_APIKEY,
//     authDomain: process.env.AUTH_DOMAIN,
//     projectId: process.env.PROJECT_ID,
//     storageBucket: process.env.STORAGE_BUCKET,
//     messagingSenderId: process.env.MESSAGING_SENDER_ID,
//     appId: process.env.APP_ID
//   };
//   // Initialize Firebase
//   firebase.initializeApp(config);
//   firebase.firestore().settings({ timeStampsInSnapshots: true});
//   //export const storage = firebase.storage();

//   export default firebase;