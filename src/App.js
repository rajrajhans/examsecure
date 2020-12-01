import React, {Component, useState} from 'react';
import Layout from "./components/Layout";
import Landing from "./components/Landing";
import './styles/main.css'
import Home from "./components/Home";
import Login from "./components/Login";
import {Router, Link, Redirect} from "@reach/router"
import Timer from "./components/helpers/Timer";

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
                    <Landing path={'/landing'}/>
                    <Login isSignedIn={isSignedIn} authState={this.state.authState} setAuthState={this.setAuthState} path={'/'}/>
                    <Timer path='/timer'/>
                </Router>
            </Layout>

        )
    }
}

export default App;