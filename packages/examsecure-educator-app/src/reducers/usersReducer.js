const initState={
    users:[
        {time:0},
    ],
}
const usersReducer = (state = initState, action) => {
    switch(action.type) {
        case 'CHANGE_REMAINING_TIME':
            console.log('Time updated')
            return state;
        case 'CHANGE_REMAINING_TIME_ERROR':
            console.log('Time update failed')
            return state;
        default: 
            return state;
    }
}

export default usersReducer;