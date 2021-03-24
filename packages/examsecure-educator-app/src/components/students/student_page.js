import React, { Component } from 'react';
import '../../styles/student_page.css'
import ESNavbar from '../nav_bar';
import {connect} from 'react-redux'
import {firestoreConnect, firebaseConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import { Redirect} from "react-router-dom";
import { Accordion, Card, Form } from 'react-bootstrap';
import TestAccordion from './test_accordion'

const TestDetails = ({data}) => {
    let details = []
    for(let i of Object.keys(data.value)) {
        //console.log(i)
        //console.log(data.value[i])
        i !== 'undefined' ? details.push(<TestAccordion data={data.value[i]} id={data.key+i} testnumber={i} username={data.key}/>) : console.log('Undefined Test '+data.key)
    }
    return details
}

const UserAccordion = (props) => {
    //console.log(props)
    return(
        <Accordion>
            <Accordion.Toggle as={Card.Header} eventKey={props.data.key} className="accordion-title">
                {props.data.key}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={props.data.key} className="accordion-details">
                <Card.Body>
                    <TestDetails data={props.data}/>
                </Card.Body>
            </Accordion.Collapse>
        </Accordion>
    )
}
class StudentPage extends Component {
    onSubmit = (e) => {
        
    }

    render() {
        const {users, auth} = this.props;
        //console.log(users)
        if(!auth.uid) return <Redirect to='/signin'/>

        return(
            <>
            <ESNavbar/>
            <div className="container mx-auto border mt-5 mb-10">
                <h1 className="mb-3">Student Details Page</h1>
                {users && users.map(data => {
                    return(<UserAccordion key={data.key} data={data}/>)
                })}
            </div>

            </>
        )
    }
}

const mapStateToProps = (state) => {
    //console.log(state);
    return {
        users: state.firebase.ordered.users,
        auth: state.firebase.auth
    }
}
export default compose(
    connect(mapStateToProps),
    firebaseConnect([
        'users'
    ])
)(StudentPage);