
const initState = {
    question: [
        {id:1, question:'What?', option1:'W', option2:'H', option3:'A', option4:'T', answer:'W'},
    ]
}

const questionReducer = (state = initState, action) => {
    switch(action.type) {
        case 'UPLOAD_QUESTION':
            console.log('Uploaded question', action.uploadData)
            return state;
        case 'UPLOAD_QUESTION_ERROR':
            console.log('uploading question error', action.error);
            return state;
        default:
            return state;
    }
}
export default questionReducer;