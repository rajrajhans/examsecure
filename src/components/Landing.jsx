import React, { Fragment, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Col, Row } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link, navigate } from "@reach/router";
import "../styles/landing.css";
import {
  makeFullScreen,
  defineFullscreenChangeEvent,
  exitFullScreen,
} from "../utils/fullscreenAPI";

const Landing = ({ loadForSeconds }) => {
  const [isWebCamReady, setIsWebcamReady] = useState(false);
  const [isFullscreenActive, setIsFullscreenActive] = useState(false);
  const [activeSlide, setActiveSlide] = useState(1);
  const webcam = useRef(undefined);
  const currentUrl = window.location.href;

  const setupWebcam = (instance) => {
    webcam.current = instance;

    const checkIfReady = () => {
      if (
        webcam.current &&
        webcam.current.state &&
        webcam.current.state.hasUserMedia
      ) {
        setIsWebcamReady(true);
      } else {
        setTimeout(checkIfReady, 250);
      }
    };

    checkIfReady();
  };

  useEffect(() => {
    loadForSeconds();
    if (!document.isFullscreenListenerSet) {
      defineFullscreenChangeEvent(onFullscreenExit, onFullscreenEnter);
      document.isFullscreenListenerSet = true;
    }
  }, []);

  const enterFullscreen = async () => {
    await makeFullScreen("rootWrapper");
    setIsFullscreenActive(true);
  };

  const onFullscreenExit = () => {
    setActiveSlide(1);
    setIsFullscreenActive(false);
    alert("Please do not exit Full Screen Mode.");
    navigate("/start");
  };

  const onFullscreenEnter = () => {
    setIsFullscreenActive(true);
  };

  const WebcamSetupInstructions = () => (
    <Fragment>
      <Alert variant={"warning"} width={"500px"} className={"instructionsBox"}>
        <Alert.Heading className={"instrHeading"}>
          Please allow required permissions to continue
        </Alert.Heading>
        <ul className={"instructionsBoxList"}>
          <li>
            When prompted, you need to click <i>Allow</i> to use the application
            with your webcam.
          </li>
          <li>
            If you don't see the dialog, try{" "}
            <a href={currentUrl}>opening the application</a> in a new incognito
            window, or review your webcam settings on your browser.
          </li>
          <li>We recommend using the latest version of Google Chrome.</li>
        </ul>
      </Alert>

      <Button
        variant={"secondary"}
        size={"lg"}
        className={"NextButton"}
        disabled
        block
      >
        Next
      </Button>
    </Fragment>
  );

  const FullscreenSetup = () => (
    <Fragment>
      <Alert variant={"info"} width={"500px"} className={"instructionsBox"}>
        <Alert.Heading className={"instrHeading"}>
          Enter Full Screen Mode
        </Alert.Heading>
        <ul className={"instructionsBoxList"}>
          <li>
            When prompted, you need to click <i>Allow</i> to use the application
            with your webcam.
          </li>
          <li>
            If you don't see the dialog, try{" "}
            <a href={currentUrl}>opening the application</a> in a new incognito
            window, or review your webcam settings on your browser.
          </li>
          <li>We recommend using the latest version of Google Chrome.</li>
        </ul>
      </Alert>

      {isFullscreenActive ? (
        <Button
          variant={"primary"}
          size={"lg"}
          className={"NextButton"}
          block
          onClick={() => setActiveSlide(2)}
        >
          Next
        </Button>
      ) : (
        <Button
          variant={"primary"}
          size={"lg"}
          className={"NextButton"}
          block
          onClick={() => enterFullscreen()}
        >
          Enter Full Screen
        </Button>
      )}
    </Fragment>
  );

  const ExamInstructions = () => (
    <Fragment>
      <Alert variant={"info"} width={"500px"} className={"instructionsBox"}>
        <Alert.Heading className={"instrHeading"}>Instructions</Alert.Heading>
        <ul className={"instructionsBoxList"}>
          <li>Ensure your face is clearly visible in the webcam.</li>
          <li>
            Do not attempt to exit fullscreen mode. You will be logged out.
          </li>
          <li>
            Do not wear cap, scarf, goggles / sunglasses, headphones, earphones.
          </li>
          <li>Do not attempt to hide your face during the test.</li>
          <li>
            Ensure that no one else is sitting with you during the entire
            duration of the test.
          </li>
        </ul>
      </Alert>

      <Button
        variant={"primary"}
        size={"lg"}
        className={"NextButton"}
        block
        onClick={() => setActiveSlide(3)}
      >
        Next
      </Button>
    </Fragment>
  );

  const ExamStartConfirmation = () => (
    <Fragment>
      <Alert
        variant={"info"}
        width={"500px"}
        className={"instructionsBox confirmationBox"}
      >
        <Alert.Heading className={"instrHeading"}>Confirmation</Alert.Heading>
        <div className={"confirmationText"}>
          Are you sure you want to start the test?
        </div>
      </Alert>

      <Link to={"/exam"}>
        <Button variant={"primary"} size={"lg"} className={"NextButton"} block>
          Start the Test
        </Button>
      </Link>
    </Fragment>
  );

  const CurrentlyActiveSlide = () => {
    if (activeSlide === 1) return <FullscreenSetup />;
    else if (activeSlide === 2) return <ExamInstructions />;
    else if (activeSlide === 3) return <ExamStartConfirmation />;
  };

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
                facingMode: "user",
              }}
              style={{ width: "100%" }}
            />
          </Col>
          <Col xs={12} md={6}>
            {isWebCamReady ? (
              <>
                <CurrentlyActiveSlide />
              </>
            ) : (
              <WebcamSetupInstructions />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Landing;
