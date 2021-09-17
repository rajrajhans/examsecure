import React, { Fragment, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Col, Row } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link, useHistory } from 'react-router-dom';
import '../../styles/landing.css';
import {
  defineFullscreenChangeEvent,
  makeFullScreen,
} from '../../utils/fullscreenAPI';
import AddFaceBox from '../helpers/AddFaceBox';
import { mode } from '../helpers/modeSetter';
import isDeviceMobile from '../../utils/checkMobileDeviceAPI';
import { pageview } from 'react-ga';

const Landing = ({ loadForSeconds, currentUser, questionSetMetadata }) => {
  const [isWebCamReady, setIsWebcamReady] = useState(false);
  const [isFullscreenActive, setIsFullscreenActive] = useState(false);
  const [activeSlide, setActiveSlide] = useState(1);
  const webcam = useRef(undefined);
  const history = useHistory();
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

  const captureFrame = () => {
    if (webcam.current) {
      const image = webcam.current.getScreenshot();
      if (image) {
        return image.split(',')[1];
      }
    }
  };

  useEffect(() => {
    if (isDeviceMobile()) {
      alert(
        'Please log in from a PC for the best experience. Using a mobile phone may lead to unexpected behaviour.',
      );
      history.push('/');
    }
    loadForSeconds();
    pageview(window.location.pathname + window.location.search);
    if (!document.isFullscreenListenerSet) {
      defineFullscreenChangeEvent(onFullscreenExit, onFullscreenEnter);
      document.isFullscreenListenerSet = true;
    }
  }, []);

  const enterFullscreen = async () => {
    await makeFullScreen('rootWrapper');
    if (!window.onblur) window.onblur = onFocusLost;
    setIsFullscreenActive(true);
  };

  const onFullscreenExit = () => {
    if (mode === 1) {
      setActiveSlide(1);
      setIsFullscreenActive(false);
      alert(
        'Please do not exit Full Screen Mode or click anywhere else. You will be logged out!',
      );
      window.location.href = '/';
    }
  };

  const onFocusLost = () => {
    setActiveSlide(1);
    setIsFullscreenActive(false);
    document.exitFullscreen().catch(() => console.log('not in fullscreen'));
  };

  const onFullscreenEnter = () => {
    setIsFullscreenActive(true);
  };

  const WebcamSetupInstructions = () => (
    <Fragment>
      <Alert variant={'warning'} width={'500px'} className={'instructionsBox'}>
        <Alert.Heading className={'instrHeading'}>
          Please allow required permissions to continue
        </Alert.Heading>
        <ul className={'instructionsBoxList'}>
          <li>
            When prompted, you need to click <i>Allow</i> to use the application
            with your webcam.
          </li>
          <li>
            If you don't see the dialog, try{' '}
            <a href={currentUrl}>opening the application</a> in a new incognito
            window, or review your webcam settings on your browser.
          </li>
          <li>
            We recommend using the latest version of <b>Google Chrome</b> for a
            hassle-free experience.
          </li>
        </ul>
      </Alert>

      <Button
        variant={'secondary'}
        size={'lg'}
        className={'NextButton'}
        disabled
        block
      >
        Next
      </Button>
    </Fragment>
  );

  const FullscreenSetup = () => (
    <Fragment>
      <Alert variant={'info'} width={'500px'} className={'instructionsBox'}>
        <Alert.Heading className={'instrHeading'}>
          Full Screen Mode Instructions
        </Alert.Heading>
        <ul className={'instructionsBoxList'}>
          <li>Click the button below to enter Full Screen Mode</li>
          <li>
            Do not attempt to exit Full Screen Mode during the exam. You will be
            logged out!
          </li>
          <li>
            Ensure all <b>popups have been disabled</b> before proceeding.
          </li>
          <li>
            If you keep getting redirected to this screen, ensure you are
            allowing camera permissions to ExamSecure. We recommend using Google
            Chrome.
          </li>
        </ul>
      </Alert>

      {isFullscreenActive ? (
        <Button
          variant={'primary'}
          size={'lg'}
          className={'NextButton'}
          block
          onClick={() => setActiveSlide(2)}
        >
          Next
        </Button>
      ) : (
        <Button
          variant={'outline-primary'}
          size={'lg'}
          className={'NextButton'}
          block
          onClick={() =>
            enterFullscreen().catch(() =>
              console.log("Couldn't enter full screen"),
            )
          }
        >
          Enter Full Screen
        </Button>
      )}
    </Fragment>
  );

  const ExamInstructions = () => (
    <Fragment>
      <Alert variant={'info'} width={'500px'} className={'instructionsBox'}>
        <Alert.Heading className={'instrHeading'}>
          Exam Instructions
        </Alert.Heading>
        <ul className={'instructionsBoxList'}>
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
        variant={'primary'}
        size={'lg'}
        className={'NextButton'}
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
        variant={'info'}
        width={'500px'}
        className={'instructionsBox confirmationBox'}
      >
        <Alert.Heading className={'instrHeading'}>Confirmation</Alert.Heading>
        {questionSetMetadata ? (
          <div className={'confirmationText'}>
            <div>
              Selected Exam: <b>{questionSetMetadata.test_name}</b>
            </div>
            <div>
              Duration of the Exam:{' '}
              <b>{questionSetMetadata.test_duration} minutes</b>
            </div>
          </div>
        ) : null}
        <div>Are you sure you want to start the test?</div>
      </Alert>

      <Link to={'/exam'}>
        <Button variant={'primary'} size={'lg'} className={'NextButton'} block>
          Start the Test
        </Button>
      </Link>
    </Fragment>
  );

  const CurrentlyActiveSlide = () => {
    if (activeSlide === 1) return <FullscreenSetup />;
    else if (activeSlide === 2) return <ExamInstructions />;
    else if (activeSlide === 3)
      return (
        <AddFaceBox
          setActiveSlide={setActiveSlide}
          activeSlide={activeSlide}
          currentUser={currentUser}
          captureFrame={captureFrame}
        />
      );
    else if (activeSlide === 4) return <ExamStartConfirmation />;
  };

  return (
    <>
      <Container>
        <Row className={'mainRow align-middle'}>
          <Col xs={12} md={6}>
            <Webcam
              ref={setupWebcam}
              screenshotFormat={'image/jpeg'}
              videoConstraints={{
                width: 1280,
                height: 640,
                facingMode: 'user',
              }}
              style={{ width: '100%' }}
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
