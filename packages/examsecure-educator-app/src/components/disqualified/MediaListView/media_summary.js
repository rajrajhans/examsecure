import React from 'react'
import { Link } from "react-router-dom";

const MediaSummary = (props) => {
    const imageArray = []
    Object.keys(props.data).forEach(image => {
        imageArray.push(props.data[image])
    })

    const deleteTriggerRecord = () => {

    }

    const disqualifyStudent = () => {

    }

    //console.log(imageArray)
    return (
        <>
        <li className="media mx-5 my-3 border">
            <img class="mr-3" src={imageArray[0].imageURL} style={{borderRadius:0, height:50, width:70 }} alt="disqualified User examsecure"/>
            <div class="media-body ">
                <h5 class="mt-0 mb-1" style={{fontWeight:'bold'}}>{props.name}</h5>
                Reason
            </div>
            {/* <a href="#" className="btn btn-outline-success" onClick={deleteTriggerRecord}>Verify</a>
            <a href="#" className="btn btn-outline-success disqualify" onClick={disqualifyStudent}>Disqualify</a> */}
        </li>
        </>
    )
}

export default MediaSummary
