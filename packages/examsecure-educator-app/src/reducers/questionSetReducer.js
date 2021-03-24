
const initState = {
    questionSets: [
        {
            0: {
                qSetID: 1,
                qSetName: 'Design & Analysis of Algorithms'
            }
        },
    ]
}

const questionSetReducer = (state = initState, action) => {
    switch(action.type) {
        case 'UPLOAD_QUESTION_SET':
            console.log('Uploaded question Set', action.uploadData)
            return state;
        case 'UPLOAD_QUESTION_SET_ERROR':
            console.log('uploading question set error', action.error);
            return state;
        default:
            return state;
    }
}

export default questionSetReducer;