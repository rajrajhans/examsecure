import React, { Component } from 'react';
import image from '../assets/mainpageimage.png'
import '../styles/sign_in_page.css'
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { signIn } from "../actions/auth_actions";

class SignIn extends Component {
    state = {
        email: "",
        password: ""
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        this.props.signIn(this.state)
    }
    render() {
        const {authError, auth} = this.props 
        if(auth.uid) return <Redirect to='/'/>
        return (
            <section className="Form my-4 mx-5">
                <div className="container">
                    <div className="row no-gutters">
                        <div className="col-lg-5">
                            <img src={image} className='img-fluid' alt='l1'/>
                        </div>
                        <div className="col-lg-7 px-5 pt-5">
                            <h1 className="font-weight-bold py-3">ExamSecure</h1>
                            <h4>Admin Sign In</h4>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-row">
                                    <div className="col-lg-7">
                                        <input type="email" placeholder="Email-Address" onChange={this.handleChange} id="email" className="form-control my-3 p-4"/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-lg-7">
                                        <input type="password" id="password" placeholder="**********" onChange={this.handleChange} className="form-control my-3 p-4"/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-lg-7">
                                        <button className="btn1 mt-3 mb-3">
                                            Sign In
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-4 error">
                                    {authError ? <p>{authError}</p> : null}
                                </div>
                                <p>Student?  <a href='https://examsecure.rajrajhans.com/start'>Click Here</a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)