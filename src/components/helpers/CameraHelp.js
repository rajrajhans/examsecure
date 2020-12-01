import React from "react";
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

export default props => {
    const currentUrl = window.location.href;
        return (
            <Container>
                <Card.Body>
                    <Row>
                        <Col md={12}>
                            <br/>
                            <Alert variant={"info"}>
                                <Alert.Heading>
                                    Please allow required permissions to continue
                                </Alert.Heading>

                                <hr/>
                                <br/>
                                <p>
                                    When prompted, you need to click <i>Allow</i> to use the application with your
                                    webcam.
                                </p>
                                <br/>
                                <p>
                                    If you don't see the dialog, try{" "}
                                    <a href={currentUrl}>opening the application</a> in a new incognito
                                    window, or review your webcam settings on your browser.
                                </p>
                            </Alert>
                        </Col>
                    </Row>
                </Card.Body>
            </Container>
        );
};
