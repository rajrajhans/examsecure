export const uploadQuestions = (uploadQuestion) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        const firestore = getFirestore();
        const firebase = getFirebase();
        const database = firebase.database();
        var data = {
            id: 'q'+String(Number(uploadQuestion.qID)+1),
            opts: {
                0: {
                    optID: 'q'+String(Number(uploadQuestion.qID)+1)+1,
                    optText: uploadQuestion.option1
                },
                1: {
                    optID: 'q'+String(Number(uploadQuestion.qID)+1)+2,
                    optText: uploadQuestion.option2
                },
                2: {
                    optID: 'q'+String(Number(uploadQuestion.qID)+1)+3,
                    optText: uploadQuestion.option3
                },
                3: {
                    optID: 'q'+String(Number(uploadQuestion.qID)+1)+4,
                    optText: uploadQuestion.option4
                },
            },
            question: uploadQuestion.question,
            answer: 'q'+String(Number(uploadQuestion.qID)+1)+uploadQuestion.answer
        }
        database.ref('questions/'+uploadQuestion.testname+'/'+uploadQuestion.qID).set(data).then(() => {
            console.log('UPLOADED QUESTION')
            dispatch({type: 'UPLOAD_QUESTION', uploadQuestion});
        }).catch((error) => {
            dispatch({type:'UPLOAD_QUESTION_ERROR', error});
        });

        // firestore.collection(uploadQuestion.testname).add({
        //     question: uploadQuestion.question,
        //     option1: uploadQuestion.option1,
        //     option2: uploadQuestion.option2,
        //     option3: uploadQuestion.option3,
        //     option4: uploadQuestion.option4,
        //     answer: uploadQuestion.answer
        // }).then(() => {
        //     console.log('UPLOADED QUESTION')
        //     dispatch({type: 'UPLOAD_QUESTION', uploadQuestion});
        // }).catch((error) => {
        //     dispatch({type:'UPLOAD_QUESTION_ERROR', error});
        // })
        
    }
};