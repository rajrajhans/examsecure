import React, {useState} from 'react'
import { Carousel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Link } from "react-router-dom";
import { compose } from 'redux';
import {disqualifyUser, addDisqualifiedUsers} from '../../../actions/proctor_actions';


function ControlledCarousel({imageArray, props }) {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
      console.log(selectedIndex,e);
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
                    alt="disqualified-user-examsecure"
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
        
    }

    const disqualifyStudent = () => {
        //console.log(props.disqualifiedUsers)
        props.addDisqualifiedUsers({testnumber:props.testnumber, username:props.name, images:imageArray})
        props.disqualifyUser({username:props.name, testnumber:props.testnumber})
    }
    //console.log(imageArray)
    return (
        <div className="card text-center">
            <div className="overflow">
                {/* <img src={imageArray[0].imageURL}  alt= 'disqualified User examsecure' className="card-img-top"/> */}
                <ControlledCarousel imageArray={imageArray} props={props}/>
            </div>
            <div className="card-body text-dark">
                <h3 className="card-title">{props.name}</h3>
                {/* <p className="card-text text-secondary">
                Reason
                </p> */}
                {/* <a href="#" className="btn btn-outline-success" onClick={deleteTriggerRecord}>Verify</a>
                <a href="#" className="btn btn-outline-success disqualify" onClick={disqualifyStudent}>Disqualify</a> */}
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        disqualifyUser: (disqualifyUsers) => dispatch(disqualifyUser(disqualifyUsers)),
        addDisqualifiedUsers: (disqualifyUsers) => dispatch(addDisqualifiedUsers(disqualifyUsers))
    }
}

const mapStateToProps = (state) => {
    const disqualifiedUsers = state.firebase.ordered.disqualifiedUsers;
    return {
        disqualifiedUsers: disqualifiedUsers
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firebaseConnect([
        'disqualifiedUsers'
    ])
)(CardSummary);
