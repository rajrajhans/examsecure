import React, {useState} from 'react'
import {Accordion, Card, Col, Container, Modal, Row, Table, Button, Form} from 'react-bootstrap'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { ChangeRemainingTime } from '../../actions/users_actions'

const AddTime = (props) => {
    const [time, setTime] = useState(0)
    const increaseTime = (e) => {
        props.ChangeRemainingTime({username:props.username, testnumber:props.testnumber, time:(Number(time*60)+Number(props.data.timeRemaining))})
    }
    const reduceTime = (e) => {
        props.ChangeRemainingTime({username:props.username, testnumber:props.testnumber, time:(-Number(time*60)+Number(props.data.timeRemaining))})
    }
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton style={{backgroundColor:'grey'}}>
                <Modal.Title id="contained-modal-title-vcenter" style={{color:'white', fontWeight:'bold'}}>
                    Change Remaining Time
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <>
                    <div style={{fontSize:22}}>
                        <span style={{fontWeight:'bold'}}>Username: </span>
                        <span> {props.username}</span>
                    </div>
                    <div style={{margin:10}}>
                        <div>
                            <span style={{fontWeight:'bold'}}>Time Remaining: </span>
                            <span> {(props.data.timeRemaining/60).toFixed(2)} minutes</span>
                        </div>
                        <div>
                            <span style={{fontWeight:'bold'}}>Enter time: </span>
                            <Form>
                                <Form.Control style={{margin:3}} type='number' min='0' value={time} onChange={(e)=>{setTime(e.target.value)}}/> 
                                <span style={{fontStyle:'italic'}}>(in minutes)</span>
                            </Form>
                        </div>
                        <div>
                            <Button variant='secondary' className="modal-button" onClick={increaseTime}>Add Time</Button>
                            <Button variant='secondary' className="modal-button" onClick={reduceTime}>Remove Time</Button>
                        </div>
                    </div>
                </>
            </Modal.Body>
        </Modal>
    )
}

const Answers = ({questions, noOfQuestions, qSetNum, userAnswers, testnumber}) => {
    // console.log(questions)
    // console.log(noOfQuestions)
    // console.log(qSetNum)
    // console.log(userAnswers)
    // console.log(testnumber)
    let answers = []
    for(let i=0; i<noOfQuestions; i++){
        answers.push(
        <div className="response">
            {userAnswers && questions && userAnswers['q'+(i+1)] && questions[testnumber] && questions[testnumber][i]? 
             //<div className="wrong-response">a</div>
             (questions[testnumber][i].answer === userAnswers['q'+(i+1)]) ? <p className="correct-response">{String(userAnswers['q'+(i+1)])[2]}</p> : <p className="wrong-response">{String(userAnswers['q'+(i+1)])[2]}</p>
             : '-'}
        </div>)
    }
    return answers
}

const TestAccordion = (props) => {
    //console.log(props)
    const {testnumber, questions, questionSets, username} = props;
    //console.log(testno)
    //console.log(questions[testno-1])
    const testno = (testnumber) ? Number(testnumber) : null;
    const noOfQuestions = (questions && testnumber !== 'undefined') ? Object.keys(questions[testno]).length : null
    //console.log(testnumber+' : '+noOfQuestions)
    const [showModal, setshowModal] = useState(false)
    return(
        <div className="container ">
            <Container>
            <Accordion>
                <Accordion.Toggle as={Card.Header} eventKey={props.id} className="accordion-title">
                    {questionSets && questionSets[testno-1].qSetName}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={props.id} className="accordion-details">
                    <div className="container mt-2">
                        <Row>
                            <Col>
                                <h5 className="mt-3">Options Selected:</h5>
                                <div className="container flex-css userAnswers"><Answers noOfQuestions={noOfQuestions} questions={questions} qSetNum={testno} userAnswers={props.data.userAnswers} testnumber={testnumber}/> </div>
                            </Col>
                            <Col>
                                <Table striped bordered hover className="mt-4">
                                    <thead>
                                        <tr><th colSpan={2}>Other Details:</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th style={{backgroundColor:'white'}}>Login Count:</th>
                                            <td>{props.data.loginCount}</td>
                                        </tr>
                                        <tr>
                                            <th style={{backgroundColor:'white'}}>Remaining Time:</th>
                                            <td>{(props.data.timeRemaining/60).toFixed(2)} minutes</td>
                                        </tr>
                                        <tr>
                                            <th style={{backgroundColor:'white'}}>Exam Ended:</th>
                                            <td>{props.data.endedAt? 'Yes': 'No'}</td>
                                        </tr>
                                        <tr>
                                            <th style={{backgroundColor:'white'}}>Disqualified:</th>
                                            <td>{props.data.isDisqualified?
                                                <span style={{color:'red', fontWeight:'bold'}}>Yes</span>
                                                : <span>No</span>
                                            }</td>
                                        </tr>
                                        <tr>
                                            <th style={{backgroundColor:'white'}}>Add Time</th>
                                            <td>
                                                <button style={{padding:1, margin:2, height:25, width:25}} onClick={()=>{setshowModal(true)}}>-</button>
                                                <button style={{padding:1, margin:2,height:25, width:25}} onClick={()=>{setshowModal(true)}}>+</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        
                    </div>
                </Accordion.Collapse>
            </Accordion>
            </Container>
            <AddTime show={showModal} onHide={() => setshowModal(false)} data={props.data} username={username} testnumber={testnumber} ChangeRemainingTime={props.ChangeRemainingTime} />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        ChangeRemainingTime: (ChangeTime) => dispatch(ChangeRemainingTime(ChangeTime)),
    }
}

const mapStateToProps = (state) => {
    const questionSets = state.firebase.data.questionSets;
    const questions = state.firebase.data.questions;
    //console.log(state)
    return {
        questions: questions,
        questionSets: questionSets
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firebaseConnect([
        'questions',
        'questionSets'
    ])
)(TestAccordion)