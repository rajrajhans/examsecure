import React, {Component, useState} from 'react';
import Layout from "./components/Layout";
import Landing from "./components/Landing";
import './styles/main.css'
import Home from "./components/Home";
import Login from "./components/Login";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {authState: undefined}
        this.setAuthState = this.setAuthState.bind(this);
    }

    setAuthState(s) {
        this.setState({authState: s});
    }

    render() {
        const isSignedIn = this.state.authState === "signedin";

        return (
            <>
                {isSignedIn ? ("Hello") :
                    (<Login authState={this.state.authState} setAuthState={this.setAuthState}/>)}
            </>
        )
    }
}

export default App;