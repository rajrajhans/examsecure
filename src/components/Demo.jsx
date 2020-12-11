import React, { useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import Webcam from "react-webcam";
import gateway from "../utils/gateway";
import signOut from "../utils/signOut";
import { navigate } from "@reach/router";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

const Demo = () => {
  const [isWebCamReady, setIsWebcamReady] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [testRes, setTestRes] = useState(null);
  const webcam = useRef(undefined);

  const handleFailTestResults = (a, b) => console.log(a);

  const getSnapshot = async () => {
    if (webcam.current) {
      const image = webcam.current.getScreenshot();

      if (image) {
        const b64EncodedImg = image.split(",")[1];

        let res = await gateway.processImage(b64EncodedImg);
        if (res) {
          console.log(res);
          setTestRes(res);

          // If "Objects of Interest" test fails
          if (res[0]["Success"] === false) {
            handleFailTestResults(
              "Warning: Phone",
              "There seem to be multiple people in your camera frame."
            );
          }

          // If "Person Detection" test fails TODO: Change this alert to custom modal
          if (res[1]["Success"] === false && res[3]["Details"] > 1) {
            handleFailTestResults(
              "Warning: Multiple Persons",
              "There seem to be multiple people in your camera frame."
            );
          }

          // If "Person Recognition" test fails TODO: Change this alert to custom modal
          if (res[2]["Success"] === false && res[3]["Success"] === true) {
            handleFailTestResults(
              "Impersonation Warning!",
              "Person in the camera frame is not recognised. Ensure your face is clearly visible!"
            );
          }

          // If "Face Detection" test fails TODO: Change this alert to custom modal
          if (res[3]["Success"] === false && res[3]["Details"] === 0) {
            handleFailTestResults(
              "Warning: Face Not Detected!",
              "Your face was not detected in the webcam. Ensure your face is clearly visible!"
            );
          }
        }
      } else {
        console.log("Waiting for camera to start responding");
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
    let numOfCaptures = Number(localStorage.getItem("examsecure_democaptures"));
    localStorage.setItem("examsecure_democaptures", String(numOfCaptures + 1));

    if (numOfCaptures < 5) {
      setIsFetching(true);
      setTestRes(null);
      getSnapshot().then(() => setIsFetching(false));
    } else {
      alert("Sorry, you have exceeded the limit of trials.");
    }
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
            <div
              className={"container"}
              style={{
                margin: "20px auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isWebCamReady ? (
                <>
                  {isFetching ? (
                    <Button
                      disabled
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Spinner
                        animation={"border"}
                        size={"sm"}
                        style={{ marginRight: "8px" }}
                      />
                      Processing
                    </Button>
                  ) : (
                    <Button onClick={handleAnalyze}>
                      Capture Frame and Analyze
                    </Button>
                  )}
                </>
              ) : (
                "Waiting for Webcam ..."
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
                        <td>{testRes ? testRes[3]["Details"] : "-"}</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Was Person Recognised</td>
                        <td>
                          {testRes ? (
                            <>
                              {testRes[2]["Success"]
                                ? `Yes. Identity: ${testRes[2]["Details"]}`
                                : "No"}
                            </>
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Multiple Persons Warning</td>
                        <td>
                          {testRes ? (
                            <>
                              {testRes[3]["Details"] > 1
                                ? "Multiple Persons Detected!"
                                : "No"}
                            </>
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>No Face in Frame Warning</td>
                        <td>
                          {testRes ? (
                            <>
                              {testRes[3]["Details"] === 0
                                ? "Cannot detect any face!"
                                : "No"}
                            </>
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>Violating object in sight Warning</td>
                        <td>
                          {testRes ? (
                            <>
                              {testRes[0]["Success"] === false
                                ? `Yes. ${testRes[0]["Details"]}`
                                : "No"}
                            </>
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </>
              ) : (
                <>
                  {isWebCamReady ? (
                    <Alert variant={"info"}>
                      Click on the button to capture and analyze your camera
                      frame image
                    </Alert>
                  ) : (
                    <>
                      <Alert
                        variant={"warning"}
                        width={"500px"}
                        className={"instructionsBox"}
                      >
                        <Alert.Heading className={"instrHeading"}>
                          Please allow required permissions to continue
                        </Alert.Heading>
                        <ul className={"instructionsBoxList"}>
                          <li>
                            When prompted, you need to click <i>Allow</i> to use
                            the application with your webcam.
                          </li>
                          <li>
                            If you don't see the dialog, try{" "}
                            <a href={window.location}>
                              opening the application
                            </a>{" "}
                            in a new incognito window, or review your webcam
                            settings on your browser.
                          </li>
                          <li>
                            We recommend using the latest version of{" "}
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
