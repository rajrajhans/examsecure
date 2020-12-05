import React, { Component } from "react";
import Toast from "react-bootstrap/Toast";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

class Caught extends Component {
  componentDidMount() {
    this.props.loadForSeconds();
  }

  render() {
    return (
      <Card style={{ marginTop: "50px" }}>
        <Alert variant={"danger"}>
          <b>You have been signed out due to detection of malpractice.</b>
          <br />
          Please contact the administrators.
        </Alert>

        <Button href={"/"} variant={"outline-primary"}>
          Click to return to Home
        </Button>
      </Card>
    );
  }
}

export default Caught;
