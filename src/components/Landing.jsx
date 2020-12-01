import React, {Fragment, useEffect, useRef, useState} from "react";
import Webcam from "react-webcam";
import {Col, Row} from "react-bootstrap"
import Layout from "./Layout";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {Link} from "@reach/router";
import Timer from "./helpers/Timer";
import '../styles/landing.css'

const Landing = () => {
    const [isWebCamReady, setisWebcamReady] = useState(false);
    const webcam = useRef(undefined);
    const currentUrl = window.location.href;

    const setupWebcam = (instance) => {
        webcam.current = instance;

        const checkIfReady = () => {
            if (webcam.current && webcam.current.state && webcam.current.state.hasUserMedia) {
                setisWebcamReady(true);
            } else {
                setTimeout(checkIfReady, 250);
            }
        }

        checkIfReady();
    }

    return (
        <>
            <Container>
                <Row className={"mainRow align-middle"}>
                    <Col xs={12} md={6}>
                        <Webcam
                            ref={setupWebcam}
                            screenshotFormat={"image/jpeg"}
                            videoConstraints={{
                                width: 1280,
                                height: 640,
                                facingMode: "user"
                            }}
                            style={{width: "100%"}}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        {isWebCamReady ? (
                            <Fragment>
                                <Alert variant={"info"} width={"500px"} className={"instructionsBox"}>
                                    <Alert.Heading className={"instrHeading"}>Instructions</Alert.Heading>
                                    <ul className={"instructionsBoxList"}>
                                        <li>Ensure your face is clearly visible in the webcam.</li>
                                        <li>Do not wear cap, scarf, goggles / sunglasses, headphones, earphones.</li>
                                        <li>Do not attempt to hide your face during the test.</li>
                                        <li>Ensure that no one else is sitting with you during the entire duration of
                                            the test.
                                        </li>
                                    </ul>
                                </Alert>

                                <Link to={"/timer"}>
                                    <Button variant={"success"} size={"lg"} className={"NextButton"} block>
                                        Next
                                    </Button>
                                </Link>

                            </Fragment>
                        ) : (
                            <Fragment>
                                <Alert variant={"warning"} width={"500px"} className={"instructionsBox"}>
                                    <Alert.Heading className={"instrHeading"}>Please allow required permissions to
                                        continue</Alert.Heading>
                                    <ul className={"instructionsBoxList"}>
                                        <li>
                                            When prompted, you need to click <i>Allow</i> to use the application with
                                            your webcam.
                                        </li>
                                        <li>
                                            If you don't see the dialog, try{" "} <a href={currentUrl}>opening the
                                            application</a> in a new incognito window, or review your webcam settings on
                                            your browser.
                                        </li>
                                        <li>
                                            We recommend using the latest version of Google Chrome.
                                        </li>
                                    </ul>
                                </Alert>

                                <Button variant={"secondary"} size={"lg"} className={"NextButton"} disabled block>
                                    Next
                                </Button>

                            </Fragment>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    )

}

export default Landing;