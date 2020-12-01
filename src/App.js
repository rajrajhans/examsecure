import React, {Component, useState} from 'react';
import Layout from "./components/Layout";
import Landing from "./components/Landing";
import './styles/main.css'
import Home from "./components/Home";
import Login from "./components/Login";
import {Router, Link, Redirect} from "@reach/router"
import PrivateRoute from "./components/helpers/PrivateRoute";
import Exam from "./components/Exam";
import PostSubmit from "./components/PostSubmit";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {authState: undefined}
        this.setAuthState = this.setAuthState.bind(this);
    }

    setAuthState(s) {
        this.setState({authState: s});
        if(s === "signedin")
            return <Redirect to={"/landing"}/>
    }

    render() {
        const isSignedIn = this.state.authState === "signedin";

        return (
            <Layout isSignedIn={isSignedIn}>
                <Router>
                    <PrivateRoute component={Landing} isSignedIn={isSignedIn} path={'/landing'}/>
                    <Login isSignedIn={isSignedIn} authState={this.state.authState} setAuthState={this.setAuthState} path={'/'}/>
                    <PrivateRoute component={Exam} isSignedIn={isSignedIn} path={'/exam'}/>
                    <PrivateRoute component={PostSubmit} isSignedIn={isSignedIn} path={'/thankyou'}/>
                </Router>
            </Layout>

        )
    }
}

export default App;