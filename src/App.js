import React, { Component, useState } from "react";
import Layout from "./components/Layout";
import Landing from "./components/Landing";
import "./styles/main.css";
import Home from "./components/Home";
import Login from "./components/Login";
import { Router, Link, Redirect } from "@reach/router";
import PrivateRoute from "./components/helpers/PrivateRoute";
import Exam from "./components/Exam";
import PostSubmit from "./components/PostSubmit";
import Loading from "./components/Loading";
import Caught from "./components/Caught";
import { Auth } from "@aws-amplify/auth";
import Demo from "./components/Demo";

class App extends Component {
  constructor(props) {
    super(props);
    this.setAuthState = this.setAuthState.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.loadForSeconds = this.loadForSeconds.bind(this);
    this.state = { isLoading: false, authState: undefined, currentUser: "" };
  }

  async setAuthState(s) {
    this.setState({ authState: s });
    if (s === "signedin") {
      let user = await Auth.currentAuthenticatedUser();
      this.setState({ currentUser: user.username });
      return <Redirect to={"/landing"} />;
    }
  }

  setLoading(val) {
    this.setState({ isLoading: val });
  }

  loadForSeconds() {
    this.setLoading(true);
    setTimeout(() => {
      this.setLoading(false);
    }, 1500);
  }

  render() {
    const isSignedIn = this.state.authState === "signedin";

    return (
      <Layout isSignedIn={isSignedIn}>
        <Loading show={this.state.isLoading} />
        <Router>
          <PrivateRoute
            component={Landing}
            isSignedIn={isSignedIn}
            path={"/landing"}
            loadForSeconds={this.loadForSeconds}
            currentUser={this.state.currentUser}
          />
          <Login
            isSignedIn={isSignedIn}
            authState={this.state.authState}
            setAuthState={this.setAuthState}
            path={"/start"}
            loadForSeconds={this.loadForSeconds}
          />
          <Home path={"/"} />
          <Demo path={"/demo"} />
          <PrivateRoute
            component={Exam}
            isSignedIn={isSignedIn}
            path={"/exam"}
            loadForSeconds={this.loadForSeconds}
          />
          <PrivateRoute
            component={PostSubmit}
            isSignedIn={isSignedIn}
            path={"/thankyou"}
            loadForSeconds={this.loadForSeconds}
          />
          <Caught path={"/caught"} loadForSeconds={this.loadForSeconds} />
        </Router>
      </Layout>
    );
  }
}

export default App;
