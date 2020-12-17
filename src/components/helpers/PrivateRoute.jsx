import React, { Component } from "react";
import { Redirect } from "@reach/router";
import Login from "../Login";

class PrivateRoute extends Component {
  render() {
    let { component: Comp, ...propxs } = this.props;

    return (
      <>
        {this.props.isSignedIn ? (
          <Comp {...propxs} />
        ) : (
          <Login isSignedIn={this.props.isSignedIn} {...propxs} />
        )}
      </>
    );
  }
}

export default PrivateRoute;
