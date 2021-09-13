import { startLoading, stopLoading } from './loading';

export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(startLoading());
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.pwd)
      .then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
        dispatch(stopLoading());
      })
      .catch((error) => {
        dispatch({ type: 'LOGIN_ERROR', error });
        dispatch(stopLoading());
      });
  };
};

export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(startLoading());
    const firebase = getFirebase();
    const database = firebase.database();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.pwd)
      .then((resp) => {
        return database.ref('educators/' + resp.user.uid).set({
          name: newUser.name,
        });
      })
      .then(() => {
        dispatch(stopLoading());
        dispatch({ type: 'SIGN_UP_SUCCESS' });
      })
      .catch((error) => {
        dispatch(stopLoading());
        dispatch({ type: 'SIGN_UP_FAILED', error });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' });
      });
  };
};
