export const uploadFlaggedImages = (uploadData) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        const firestore = getFirestore();
        const firebase = getFirebase();
        const storage = firebase.storage()
        const storageRef = storage.ref();
        const fileRef = storageRef.child(uploadData.selectedFile.name)
        await fileRef.put(uploadData.selectedFile)
        firestore.collection('flaggedData').add({
            name: uploadData.name,
            image: await fileRef.getDownloadURL()
        }).then(() => {
            console.log('UPLOADEDD')
            dispatch({type: 'UPLOAD_FLAGGEDIMAGE', uploadData});
        }).catch((error) => {
            dispatch({type:'UPLOAD_FLAGGEDIMAGE_ERROR', error});
        })
        
    }
};

export const disqualifyUser = (props) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const database = firebase.database();
        //console.log(props);
        database.ref('users/'+props.username+'/'+props.testnumber+'/isDisqualified').set(true).then(() => {
            console.log('Student Disqualified', props);
            dispatch({type:'DISQUALIFY_STUDENT', props});
        }).then(() => {
            database.ref('triggeredUsers/'+props.testnumber+'/'+props.username).remove().then(() => {
                dispatch({type:'DELETE_RECORD',props});
            }).catch((error) => {
                dispatch({type:'DELETE_RECORD_ERROR',error})
            })
        }).catch((error) => {
            dispatch({type:'DISQUALIFY_STUDENT_ERROR',error});
        })
    }
}

export const verifyUser = (props) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const database = firebase.database();
        //console.log(props);
        database.ref('triggeredUsers/'+props.testnumber+'/'+props.username).remove().then(() => {
            dispatch({type:'DELETE_RECORD',props});
        }).catch((error) => {
            dispatch({type:'DELETE_RECORD_ERROR',error})
        })
    }
}

export const addDisqualifiedUsers = (props) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const database = firebase.database();
        //console.log(props);
        database.ref('disqualifiedUsers/'+props.testnumber+'/'+props.username).set(props.images).then(() => {
            dispatch({type: 'DISQUALIFIED_ADDED', props});
        }).catch((error) => {
            dispatch({type: 'DISQUALIFIED_ADDED_ERROR', error});
        })
    }
}

export const wrongTriggers = (props) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const database = firebase.database();
        //console.log(props);
        database.ref('wrongTriggers/'+props.testnumber+'/'+props.username).set(props.images).then(() => {
            dispatch({type: 'WRONG_TRIGGER_ADDED', props});
        }).catch((error) => {
            dispatch({type: 'WRONG_TRIGGER_ADDED_ERROR', error});
        })
    }
}