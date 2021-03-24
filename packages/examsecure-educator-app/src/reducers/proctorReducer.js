import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';

const initState = {
    flaggedData: [
        {id:1, image:image1, name: "Student 1", examName: "Quiz 1"},
        {id:2, image:image2, name: "Student 2", examName: "Quiz 1"},
        {id:3, image:image3, name: "Student 3", examName: "Quiz 1"}
    ]
}

const proctorReducer = (state = initState, action) => {
    switch(action.type) {
        case 'UPLOAD_FLAGGEDIMAGE':
            console.log('Uploaded Data', action.uploadData)
            return state;
        case 'UPLOAD_FLAGGEDIMAGE_ERROR':
            console.log('uploading error', action.error);
            return state;
        case 'DISQUALIFY_STUDENT':
            console.log('Uploaded Data', action.props)
            return state;
        case 'DISQUALIFY_STUDENT_ERROR':
            console.log('uploading error', action.error);
            return state;
        case 'DISQUALIFIED_ADDED':
            console.log('Uploaded Data', action.props)
            return state;
        case 'DISQUALIFIED_ADDED_ERROR':
            console.log('uploading error', action.error);
            return state;
        case 'WRONG_TRIGGER_ADDED':
            console.log('Uploaded Data', action.props)
            return state;
        case 'WRONG_TRIGGER_ADDED_ERROR':
            console.log('uploading error', action.error);
            return state;
        case 'DELETE_RECORD':
            console.log('Record Deleted', action.props)
            return state;
        case 'DELETE_RECORD_ERROR':
            console.log('Record deletion error', action.error);
            return state;
        default:
            return state;
    }
}

export default proctorReducer;