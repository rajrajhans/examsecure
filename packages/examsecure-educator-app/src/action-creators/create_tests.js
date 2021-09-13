import { startLoading, stopLoading } from './loading';

export const create_test_action = (testDetails) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const database = firebase.database();

    dispatch(startLoading());

    database
      .ref('tests/')
      .push(testDetails)
      .then(() => {
        dispatch(stopLoading());
      })
      .catch((error) => {
        dispatch(stopLoading());
        console.log('ERROR while creating new test:', error);
      });
  };
};
