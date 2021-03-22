export const ChangeRemainingTime = (props) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const database = firebase.database();
        //console.log(props)
        const stringTime = String(props.time)
        database.ref('users/'+props.username+'/'+props.testnumber+'/timeRemaining').set(stringTime).then(() => {
            console.log('TIME CHANGED')
            dispatch({type: 'CHANGE_REMAINING_TIME', props});
        }).catch((error) => {
            dispatch({type:'CHANGE_REMAINING_TIME_ERROR', error});
        })
    }
};

