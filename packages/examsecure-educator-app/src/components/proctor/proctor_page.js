import React, { Component, useState } from 'react';
import '../../styles/proctor_page.css'
import ESNavbar from '../nav_bar';
import {connect} from 'react-redux'
import {firebaseConnect, firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import { Redirect, withRouter} from "react-router-dom";
import { Pagination, Button, Card, Accordion } from 'react-bootstrap';
import {BsFillGrid3X2GapFill, BsList} from 'react-icons/bs'
import CardSummary from './CardView/card_summary';
import MediaSummary from './MediaListView/media_summary';

const TriggeredUsersAccordion = (props) => {
    //console.log(props)
    //console.log(props.questionSets[Number(props.data.key)-1].value.qSetName)
    const triggeredUsersArray = []
    Object.keys(props.data.value).forEach(itKey => {
        triggeredUsersArray.push({testnumber:props.data.key, name:itKey, images:props.data.value[itKey]})
    })
    return(
        <Accordion>
            <Accordion.Toggle as={Card.Header} eventKey='1' className="accordion-title">
                {props.questionSets ? props.questionSets[Number(props.data.key)-1].value.qSetName : '-'} 
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='1' className="accordion-details">
                <>
                    {props.activeView === 1 ?
                    <Card.Body className="flex-css cardlist">
                        {triggeredUsersArray ?triggeredUsersArray.map(data => {
                            return(
                                <CardSummary data={data.images} key={data.name} name={data.name} testnumber={data.testnumber}/>
                            )
                        }) :<div>Not Found!</div>
                        }
                    </Card.Body> : null}
                    {props.activeView === 2 ?
                    <Card.Body className="flex-css">
                        {triggeredUsersArray ?triggeredUsersArray.map(data => {
                            return(
                                <MediaSummary data={data.images} key={data.name} name={data.name} testnumber={data.testnumber}/>
                            )
                        }) :<div>Not Found!</div>
                        }
                    </Card.Body> : null}
                </>
            </Accordion.Collapse>
        </Accordion>
    )
}
class ProctorPage extends Component {
    state = {
        activeView: 1,
    }

    render() {
        //console.log(this.props);
        const {auth, triggeredUsers, questionSets} = this.props;
        //console.log(triggeredUsers)
        if(!auth.uid) return <Redirect to='/signin'/>
        return (
            <div className="proctor mb-10">
                <ESNavbar/>
                <div className="container pagination">
                    <Button variant={this.state.activeView === 1 ? "outline-secondary":"secondary"} disabled={this.state.activeView === 1} className="viewChangeButton" onClick={() => {this.setState({activeView:1})}} > <BsFillGrid3X2GapFill/> Card View</Button>
                    <Button variant={this.state.activeView === 2 ? "outline-secondary":"secondary"} disabled={this.state.activeView === 2} className="viewChangeButton" onClick={() => {this.setState({activeView:2})}}><BsList/> List View</Button>
                </div>
                <div style={{margin:15}}>
                    {triggeredUsers && triggeredUsers.map((data) => {
                        return(<TriggeredUsersAccordion data={data} key={data.key} questionSets={questionSets} activeView={this.state.activeView}/>)
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    //console.log(state);
    const questionSets = state.firebase.ordered.questionSets;
    const triggeredUsers= state.firebase.ordered.triggeredUsers;
    const auth = state.firebase.auth;
    return {
        triggeredUsers: triggeredUsers,
        auth: auth,
        questionSets: questionSets
    }
}
export default withRouter(compose(
    connect(mapStateToProps),
    firebaseConnect([
        'triggeredUsers',
        'questionSets'
    ])
)(ProctorPage));