import React, { Component } from "react";
import Toast from "react-bootstrap/Toast";
import Card from "react-bootstrap/Card";

class PostSubmit extends Component {
  componentDidMount() {
    this.props.loadForSeconds();
  }

  render() {
    return (
      <Card style={{ marginTop: "50px" }}>
        <Card.Title style={{ marginTop: "10px" }}>
          <strong className="mr-auto">Thank You!</strong>
        </Card.Title>

        <Card.Body>Thank for taking a test on ExamSecure!</Card.Body>
      </Card>
    );
  }
}

export default PostSubmit;
