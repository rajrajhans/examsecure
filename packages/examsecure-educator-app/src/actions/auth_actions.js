export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.pwd
        ).then( () => {
            dispatch({type: 'LOGIN_SUCCESS'});
        }).catch((error) => {
            dispatch({type: 'LOGIN_ERROR', error});
        });
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const database = firebase.database();
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.pwd
        ).then((resp) => {
            return database.ref('educators/'+resp.user.uid).set({
                name: newUser.name,
            })
        }).then(() => {
            dispatch({type: 'SIGN_UP_SUCCESS'});
        }).catch((error) => {
            dispatch({type: 'SIGN_UP_FAILED'});
        })
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({type: 'SIGNOUT_SUCCESS'})
        })
    }
}