import React, {useState} from 'react'
import { Carousel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Link } from "react-router-dom";
import { compose } from 'redux';
import {disqualifyUser, verifyUser, addDisqualifiedUsers, wrongTriggers} from '../../../actions/proctor_actions';


function ControlledCarousel({imageArray, props }) {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
      //console.log(selectedIndex,e);
      setIndex(selectedIndex);
    };
    //console.log(imageArray)
    return (
      <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
        {imageArray && imageArray.map(data => {
            //console.log(data);
            return(
                <Carousel.Item>
                <img
                    className="d-block w-100 carousel"
                    src={data.imageURL}
                    alt="triggered-user-examsecure"
                />
                <Carousel.Caption>
                    <div className="carousel-caption">
                        <p>{data.reason}</p>
                    </div>
                </Carousel.Caption>
                </Carousel.Item>
            )
        })}
      </Carousel>
    );
  }
  
//render(<ControlledCarousel />);

const CardSummary = (props) => {
    //console.log(props)
    const imageArray = []
    Object.keys(props.data).forEach(image => {
        imageArray.push(props.data[image])
    })
    const deleteTriggerRecord = () => {
        props.wrongTriggers({testnumber:props.testnumber, username:props.name, images:imageArray})
        props.verifyUser({username:props.name, testnumber:props.testnumber})
    }

    const disqualifyStudent = () => {
        //console.log(props.triggeredUsers)
        props.addDisqualifiedUsers({testnumber:props.testnumber, username:props.name, images:imageArray})
        props.disqualifyUser({username:props.name, testnumber:props.testnumber})
    }
    //console.log(imageArray)
    return (
        <div className="card text-center">
            <Link to={'/imagedetail/' + props.testnumber+ '/' + props.name}>
            <div className="overflow">
                {/* <img src={imageArray[0].imageURL}  alt= 'triggered User examsecure' className="card-img-top"/> */}
                <ControlledCarousel imageArray={imageArray} props={props}/>
            </div>
            </Link>
            <div className="card-body text-dark">
                <h3 className="card-title">{props.name}</h3>
                {/* <p className="card-text text-secondary">
                Reason
                </p> */}
                <a href="#" className="btn btn-outline-success" onClick={deleteTriggerRecord}>Verify</a>
                <a href="#" className="btn btn-outline-success disqualify" onClick={disqualifyStudent}>Disqualify</a>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        disqualifyUser: (disqualifyUsers) => dispatch(disqualifyUser(disqualifyUsers)),
        verifyUser: (verifyUsers) => dispatch(verifyUser(verifyUsers)),
        addDisqualifiedUsers: (disqualifyUsers) => dispatch(addDisqualifiedUsers(disqualifyUsers)),
        wrongTriggers: (wrongTrigger) => dispatch(wrongTriggers(wrongTrigger)),
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
)(CardSummary);
