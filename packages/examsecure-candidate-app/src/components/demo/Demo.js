import React, { useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import Webcam from 'react-webcam';
import gateway from '../../utils/gateway';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import { getHeadPoseInterpretation } from '../../utils/headPoseAnalysisUtils';
import { pageview } from 'react-ga';

const Demo = ({ currentUser }) => {
  const [isWebCamReady, setIsWebcamReady] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [testRes, setTestRes] = useState(null);
  const webcam = useRef(undefined);

  useEffect(() => {
    pageview(window.location.pathname + window.location.search);
  }, []);

  const handleFailTestResults = (a, b) => console.log(a);

  const getSnapshot = async () => {
    if (webcam.current) {
      const image = webcam.current.getScreenshot();

      if (image) {
        const b64EncodedImg = image.split(',')[1];

        let res = await gateway.processDemoImage(b64EncodedImg, currentUser);
        if (res) {
          console.log(res);
          setTestRes(res);

          // If "Objects of Interest" test fails
          if (res[0]['Success'] === false) {
            handleFailTestResults(
              'Warning: Phone',
              'There seem to be multiple people in your camera frame.',
            );
          }

          // If "Person Detection" test fails TODO: Change this alert to custom modal
          if (res[1]['Success'] === false && res[3]['Details'] > 1) {
            handleFailTestResults(
              'Warning: Multiple Persons',
              'There seem to be multiple people in your camera frame.',
            );
          }

          // If "Person Recognition" test fails TODO: Change this alert to custom modal
          if (res[2]['Success'] === false && res[3]['Success'] === true) {
            handleFailTestResults(
              'Impersonation Warning!',
              'Person in the camera frame is not recognised. Ensure your face is clearly visible!',
            );
          }

          // If "Face Detection" test fails TODO: Change this alert to custom modal
          if (res[3]['Success'] === false && res[3]['Details'] === 0) {
            handleFailTestResults(
              'Warning: Face Not Detected!',
              'Your face was not detected in the webcam. Ensure your face is clearly visible!',
            );
          }
        }
      } else {
        console.log('Waiting for camera to start responding');
        setTimeout(getSnapshot, 500);
      }
    }
  };

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

  const handleAnalyze = () => {
    let numOfCaptures = Number(localStorage.getItem('examsecure_democaptures'));
    localStorage.setItem('examsecure_democaptures', String(numOfCaptures + 1));

    if (numOfCaptures < 5) {
      setIsFetching(true);
      setTestRes(null);
      getSnapshot().then(() => setIsFetching(false));
    } else {
      alert('Sorry, you have exceeded the limit of trials.');
    }
  };

  return (
    <>
      <Container>
        <h2>ExamSecure Image Analysis Demo</h2>

        <div>
          <p>
            ExamSecure is able to detect many attributes from the camera image
            capture using the power of AWS Rekognition. Here, you can see a demo
            of the results that can be derived from a camera frame capture.
            During an actual examination, ExamSecure will take such a capture at
            every short random interval and perform the same real-time analysis
            on it to detect any possible malpractice.
            <br />
            <br />
          </p>
        </div>

        <Row>
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
            <div
              className={'container'}
              style={{
                margin: '20px auto 30px auto',
              }}
            >
              {isWebCamReady ? (
                <>
                  {isFetching ? (
                    <div
                      style={{
                        margin: '20px auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Button
                        disabled
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <Spinner
                          animation={'border'}
                          size={'sm'}
                          style={{ marginRight: '8px' }}
                        />
                        Processing
                      </Button>
                    </div>
                  ) : (
                    <>
                      {testRes ? (
                        <div>
                          <h3>Head Pose Analysis</h3>
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Analysis Parameter</th>
                                <th>Analysis Result</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>Roll</td>
                                <td>
                                  {testRes[3]['MoreDetails'][0]
                                    ? testRes[3]['MoreDetails'][0]['Pose'].Roll
                                    : 'No Face Detected'}
                                </td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>Pitch</td>
                                <td>
                                  {testRes[3]['MoreDetails'][0]
                                    ? testRes[3]['MoreDetails'][0]['Pose'].Pitch
                                    : 'No Face Detected'}
                                </td>
                              </tr>
                              <tr>
                                <td>3</td>
                                <td>Yaw</td>
                                <td>
                                  {testRes[3]['MoreDetails'][0]
                                    ? testRes[3]['MoreDetails'][0]['Pose'].Yaw
                                    : 'No Face Detected'}
                                </td>
                              </tr>
                              <tr>
                                <td>4</td>
                                <td>Interpretation</td>
                                <td>
                                  {testRes[3]['MoreDetails'][0] ? (
                                    <b>
                                      {getHeadPoseInterpretation(
                                        testRes[3]['MoreDetails'][0]['Pose']
                                          .Roll,
                                        testRes[3]['MoreDetails'][0]['Pose']
                                          .Pitch,
                                        testRes[3]['MoreDetails'][0]['Pose']
                                          .Yaw,
                                      )}
                                    </b>
                                  ) : (
                                    'No Face Detected'
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      ) : null}
                      <div
                        style={{
                          margin: '20px auto',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Button onClick={handleAnalyze}>
                          Capture Frame and Analyze
                        </Button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                'Waiting for Webcam ...'
              )}
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="demoTestResults">
              {testRes ? (
                <>
                  <h3>Results of Image Analysis</h3>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Analysis Description</th>
                        <th>Analysis Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Number of Faces Detected</td>
                        <td>{testRes ? testRes[3]['Details'] : '-'}</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Was Person Recognised</td>
                        <td>
                          {testRes ? (
                            <>
                              {testRes[2]['Success']
                                ? `Yes. Identity: ${testRes[2]['Details']}`
                                : 'No'}
                            </>
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Multiple Persons Warning</td>
                        <td>
                          {testRes ? (
                            <>
                              {testRes[3]['Details'] > 1 ? (
                                <b>Multiple Persons Detected!</b>
                              ) : (
                                'No'
                              )}
                            </>
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>No Face in Frame Warning</td>
                        <td>
                          {testRes ? (
                            <>
                              {testRes[3]['Details'] === 0 ? (
                                <b>Cannot detect any face!</b>
                              ) : (
                                'No'
                              )}
                            </>
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>Violating object in sight Warning</td>
                        <td>
                          {testRes ? (
                            <>
                              {testRes[0]['Success'] === false
                                ? `Yes. ${testRes[0]['Details']}`
                                : 'No'}
                            </>
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={'3'}>
                          <i>
                            Predicted attributes of the most prominent face
                            detected -
                          </i>
                        </td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>Predicted Age Range</td>
                        <td>
                          {testRes[3]['MoreDetails'][0] ? (
                            <>
                              {testRes[3]['MoreDetails'][0]['AgeRange'].Low} -{' '}
                              {testRes[3]['MoreDetails'][0]['AgeRange'].High}
                            </>
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>7</td>
                        <td>Predicted Gender</td>
                        <td>
                          {testRes[3]['MoreDetails'][0] ? (
                            <>{testRes[3]['MoreDetails'][0]['Gender'].Value}</>
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>9</td>
                        <td>Eyewear</td>
                        <td>
                          {testRes[3]['MoreDetails'][0] ? (
                            <>
                              {testRes[3]['MoreDetails'][0]['Eyeglasses']
                                .Value ||
                              testRes[3]['MoreDetails'][0]['Sunglasses'].Value
                                ? 'Yes'
                                : 'No'}
                            </>
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>10</td>
                        <td>Facial Expression - Smile</td>
                        <td>
                          {testRes[3]['MoreDetails'][0] ? (
                            <>
                              {testRes[3]['MoreDetails'][0]['Smile'].Value
                                ? 'Yes'
                                : 'No'}
                            </>
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>11</td>
                        <td>Facial Expression - Eyes Open?</td>
                        <td>
                          {testRes[3]['MoreDetails'][0] ? (
                            <>
                              {testRes[3]['MoreDetails'][0]['EyesOpen'].Value
                                ? 'Yes'
                                : 'No'}
                            </>
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td>12</td>
                        <td>Facial Expression - Mouth Open?</td>
                        <td>
                          {testRes[3]['MoreDetails'][0] ? (
                            <>
                              {testRes[3]['MoreDetails'][0]['MouthOpen'].Value
                                ? 'Yes'
                                : 'No'}
                            </>
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td>13</td>
                        <td>Predicted Prominent Emotion</td>
                        <td>
                          {testRes[3]['MoreDetails'][0] ? (
                            <>
                              {
                                testRes[3]['MoreDetails'][0]['Emotions'][0][
                                  'Type'
                                ]
                              }{' '}
                              -{' '}
                              {Math.floor(
                                testRes[3]['MoreDetails'][0]['Emotions'][0][
                                  'Confidence'
                                ],
                              )}
                              %
                            </>
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </>
              ) : (
                <>
                  {isWebCamReady ? (
                    <Alert variant={'info'}>
                      Click on the button to capture and analyze your camera
                      frame image
                    </Alert>
                  ) : (
                    <>
                      <Alert
                        variant={'warning'}
                        width={'500px'}
                        className={'instructionsBox'}
                      >
                        <Alert.Heading className={'instrHeading'}>
                          Please allow required permissions to continue
                        </Alert.Heading>
                        <ul className={'instructionsBoxList'}>
                          <li>
                            When prompted, you need to click <i>Allow</i> to use
                            the application with your webcam.
                          </li>
                          <li>
                            If you don't see the dialog, try{' '}
                            <a href={window.location}>
                              opening the application
                            </a>{' '}
                            in a new incognito window, or review your webcam
                            settings on your browser.
                          </li>
                          <li>
                            We recommend using the latest version of{' '}
                            <b>Google Chrome</b> for a hassle-free experience.
                          </li>
                        </ul>
                      </Alert>
                    </>
                  )}
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Demo;
