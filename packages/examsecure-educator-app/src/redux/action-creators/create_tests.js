import { startLoading, stopLoading } from './loading';

export const create_test_action = (testDetails, uid) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const database = firebase.database();

    dispatch(startLoading());

    const newTestKey = database.ref(`tests/${uid}`).push().key;

    const updates = {};
    updates[`tests/${uid}/${newTestKey}`] = testDetails;
    updates[`tests_list/${newTestKey}`] = {
      test_name: testDetails.test_name,
      test_duration: testDetails.test_duration,
      test_by: uid,
    };

    database
      .ref()
      .update(updates)
      .then(() => {
        dispatch(stopLoading());
      })
      .catch((error) => {
        dispatch(stopLoading());
        console.log('ERROR while creating new test:', error);
      });
  };
};
