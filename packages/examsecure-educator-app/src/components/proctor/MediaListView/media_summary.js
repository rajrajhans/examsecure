import React from 'react'
import { Link } from "react-router-dom";
import { compose } from 'redux';
import {connect} from 'react-redux';
import {disqualifyUser, addDisqualifiedUsers} from '../../../actions/proctor_actions';
import { firebaseConnect } from 'react-redux-firebase';

const MediaSummary = (props) => {
    const imageArray = []
    Object.keys(props.data).forEach(image => {
        imageArray.push(props.data[image])
    })
    //console.log(imageArray)
    const deleteTriggerRecord = () => {
        
    }

    const disqualifyStudent = () => {
        //console.log(props.triggeredUsers)
        props.addDisqualifiedUsers({testnumber:props.testnumber, username:props.name, images:imageArray})
        props.disqualifyUser({username:props.name, testnumber:props.testnumber})
    }
    
    return (
        <>
        <li className="media mx-5 my-3 border">
            <Link to={'/imagedetail/' + props.testnumber+ '/' + props.name}>
                <img class="mr-3" src={imageArray[0].imageURL} style={{borderRadius:0, height:50, width:70 }} alt="triggered User examsecure"/>
            </Link>
                <div class="media-body ">
                    <h5 class="mt-0 mb-1" style={{fontWeight:'bold'}}>{props.name}</h5>
                    Reason
                </div>
            <a href="#" className="btn btn-outline-success" onClick={deleteTriggerRecord}>Verify</a>
            <a href="#" className="btn btn-outline-success disqualify" onClick={disqualifyStudent}>Disqualify</a>
        </li>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        disqualifyUser: (disqualifyUsers) => dispatch(disqualifyUser(disqualifyUsers)),
        addDisqualifiedUsers: (disqualifyUsers) => dispatch(addDisqualifiedUsers(disqualifyUsers))
    }
}

const mapStateToProps = (state) => {
    const triggeredUsers = state.firebase.ordered.triggeredUsers;
    return {
        triggeredUsers: triggeredUsers
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firebaseConnect([
        'triggeredUsers'
    ])
)(MediaSummary)
