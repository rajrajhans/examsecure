import React, { Component, useState } from 'react';
import Layout from './components/Layout';
import './styles/main.css';
import Home from './components/Home';
import SignIn from './components/SignIn';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/helpers/PrivateRoute';
import PostSubmit from './components/PostSubmit';
import Loading from './components/Loading';
import Caught from './components/Caught';
import Demo from './components/Demo';
import QuestionSetSelectorContainer from './components/containers/QuestionSetSelectorContainer';
import ExamContainer from './components/containers/ExamContainer';
import LandingContainer from './components/containers/LandingContainer';
import DemoVideos from './components/DemoVideos';
import SignUp from './components/SignUp';

class App extends Component {
  constructor(props) {
    super(props);
    this.setAuthState = this.setAuthState.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.loadForSeconds = this.loadForSeconds.bind(this);
    this.state = {
      isLoading: false,
      authState: undefined,
      currentUser: '',
      isSignedIn: false,
    };
  }

  async setAuthState(s) {
    this.setState({ authState: s });
    this.setState({ currentUser: s.username, isSignedIn: true });
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
    return (
      <Router
        style={{
          height: '100%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Layout isSignedIn={this.state.isSignedIn}>
          <Loading show={this.state.isLoading} />

          <Switch>
            <PrivateRoute
              component={LandingContainer}
              isSignedIn={this.state.isSignedIn}
              path={'/landing'}
              loadForSeconds={this.loadForSeconds}
              currentUser={this.state.currentUser}
              setAuthState={this.setAuthState}
              setLoading={this.setLoading}
            />
            <SignIn
              isSignedIn={this.state.isSignedIn}
              authState={this.state.authState}
              setAuthState={this.setAuthState}
              path={'/signin'}
              setLoading={this.setLoading}
            />
            <SignUp setLoading={this.setLoading} path={'/signup'} />
            <PrivateRoute
              isSignedIn={this.state.isSignedIn}
              component={Demo}
              currentUser={this.state.currentUser}
              path={'/demo'}
              loadForSeconds={this.loadForSeconds}
              setAuthState={this.setAuthState}
              setLoading={this.setLoading}
            />
            <DemoVideos path={'/demoVideos'} />
            <PrivateRoute
              component={ExamContainer}
              isSignedIn={this.state.isSignedIn}
              path={'/exam'}
              currentUser={this.state.currentUser}
              loadForSeconds={this.loadForSeconds}
              setLoading={this.setLoading}
            />
            <PrivateRoute
              component={QuestionSetSelectorContainer}
              isSignedIn={this.state.isSignedIn}
              path={'/selectQuestionSet'}
              currentUser={this.state.currentUser}
              loadForSeconds={this.loadForSeconds}
              authState={this.state.authState}
              setAuthState={this.setAuthState}
              setLoading={this.setLoading}
            />
            <PrivateRoute
              component={PostSubmit}
              isSignedIn={this.state.isSignedIn}
              path={'/thankyou'}
              loadForSeconds={this.loadForSeconds}
              setLoading={this.setLoading}
            />
            <Caught path={'/caught'} loadForSeconds={this.loadForSeconds} />
            <Route path={'/'}>
              <Home />
            </Route>
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
