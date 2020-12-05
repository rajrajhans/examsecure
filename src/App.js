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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { authState: undefined };
    this.setAuthState = this.setAuthState.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.state = { isLoading: false };
  }

  setAuthState(s) {
    this.setState({ authState: s });
    if (s === "signedin") return <Redirect to={"/landing"} />;
  }

  setLoading(val) {
    this.state.isLoading = val;
  }

  render() {
    const isSignedIn = this.state.authState === "signedin";

    return (
      <Layout isSignedIn={isSignedIn}>
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <Router>
            <PrivateRoute
              component={Landing}
              isSignedIn={isSignedIn}
              path={"/landing"}
              isLoading={this.state.isLoading}
              setIsLoading={this.setLoading}
            />
            <Login
              isSignedIn={isSignedIn}
              authState={this.state.authState}
              setAuthState={this.setAuthState}
              path={"/"}
              isLoading={this.state.isLoading}
              setIsLoading={this.setLoading}
            />
            <PrivateRoute
              component={Exam}
              isSignedIn={isSignedIn}
              path={"/exam"}
              isLoading={this.state.isLoading}
              setIsLoading={this.setLoading}
            />
            <PrivateRoute
              component={PostSubmit}
              isSignedIn={isSignedIn}
              path={"/thankyou"}
              isLoading={this.state.isLoading}
              setIsLoading={this.setLoading}
            />
          </Router>
        )}
      </Layout>
    );
  }
}

export default App;
