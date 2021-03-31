import React, { Component } from 'react';
import { Redirect } from '@reach/router';
import SignIn from '../SignIn';

class PrivateRoute extends Component {
  render() {
    let { component: Comp, ...propxs } = this.props;

    return (
      <>
        {this.props.isSignedIn ? (
          <Comp {...propxs} />
        ) : (
          <SignIn isSignedIn={this.props.isSignedIn} {...propxs} />
        )}
      </>
    );
  }
}

export default PrivateRoute;
