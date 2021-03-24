export const uploadQuestionSet = (uploadingQuestionSet) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        const firebase = getFirebase();
        const database = firebase.database();
        var data = {
            qSetID: String(Number(uploadingQuestionSet.qSetID)+1),
            qSetName: uploadingQuestionSet.qSetName,
            duration: uploadingQuestionSet.duration
        }
        console.log(uploadingQuestionSet)
        database.ref('questionSets/'+uploadingQuestionSet.qSetID).set(data).then(() => {
            console.log('UPLOADED QUESTION')
            dispatch({type: 'UPLOAD_QUESTION_SET', uploadingQuestionSet});
        }).catch((error) => {
            dispatch({type:'UPLOAD_QUESTION_SET_ERROR', error});
        });
        
    }
};