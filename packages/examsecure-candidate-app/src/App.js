import React, { Component } from 'react';
import Layout from './components/layout/Layout';
import './styles/main.css';
import Home from './components/Home';
import SignIn from './components/auth/SignIn';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/helpers/PrivateRoute';
import PostSubmit from './components/post-exam/PostSubmit';
import Loading from './components/layout/Loading';
import Caught from './components/post-exam/Caught';
import Demo from './components/demo/Demo';
import QuestionSetSelectorContainer from './components/test-selector/TestSelectorContainer';
import ExamContainer from './components/exam/ExamContainer';
import LandingContainer from './components/landing/LandingContainer';
import DemoVideos from './components/demo/DemoVideos';
import SignUp from './components/auth/SignUp';
import { Auth } from 'aws-amplify';

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
      currentUserEmail: '',
      isSignedIn: false,
    };
  }

  async setAuthState(s) {
    this.setState({ authState: s });
    this.setState({ isSignedIn: true });
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then((data) => {
        this.setState({
          currentUser: data.attributes.name,
          currentUserEmail: data.attributes.email,
        });
      })
      .catch((e) => {
        console.log(e);
      });
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
              email={this.state.currentUserEmail}
              loadForSeconds={this.loadForSeconds}
              setLoading={this.setLoading}
              authState={this.state.authState}
              setAuthState={this.setAuthState}
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
              authState={this.state.authState}
              setAuthState={this.setAuthState}
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
