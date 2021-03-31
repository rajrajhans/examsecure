import React, { Component, Fragment } from 'react';
import ESNavbar from './Navbar';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

class Layout extends Component {
  isConfigurationOk = window.rekognitionSettings;

  render() {
    if (this.isConfigurationOk) {
      return (
        <Fragment>
          <ESNavbar isSignedIn={this.props.isSignedIn} />
          <div
            style={{
              minHeight: '100%',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {this.props.children}
          </div>
        </Fragment>
      );
    } else {
      return (
        <Alert variant={'danger'}>
          The deployment folder is missing / has invalid settings.js file. The
          settings.js file should contain your AWS Configuration Details.
          <br />
          Please refer to the configuration section of README for more details
          about configuring AWS for ExamSecure. <br />
          <br />
          <b>
            This should not be visible in production. Please contact the
            developers.
          </b>
        </Alert>
      );
    }
  }
}

export default Layout;
