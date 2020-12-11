import React, { useEffect, useRef, useState } from "react";
import Timer from "./helpers/Timer";
import questions from "../static/questions.json";
import Button from "react-bootstrap/Button";
import { Link, navigate } from "@reach/router";
import "../styles/exam.css";
import Webcam from "react-webcam";
import gateway from "../utils/gateway";
import signOut from "../utils/signOut";
import ExamWarningModal from "./helpers/ExamWarningModal";

const Exam = ({ loadForSeconds }) => {
  const [isWebCamReady, setisWebcamReady] = useState(false);
  const [warning, setWarning] = useState({
    title: "",
    text: "",
    isWarningModalActive: false,
  });

  useEffect(() => {
    loadForSeconds();
    document.oncontextmenu = () => false; // Disables Right Click
  }, []);

  const duration = 1000;

  const webcam = useRef(undefined);
  const isStreaming = useRef(true);
  const currentUrl = window.location.href;

  const timeUp = () => {
    isStreaming.current = false;
    navigate("/thankyou");
  };

  const setupWebcam = (instance) => {
    webcam.current = instance;

    const checkIfReady = () => {
      if (
        webcam.current &&
        webcam.current.state &&
        webcam.current.state.hasUserMedia
      ) {
        setisWebcamReady(true);
      } else {
        setTimeout(checkIfReady, 250);
      }
    };

    checkIfReady();
  };

  const handleWarningInvokation = (title, text) => {
    setWarning({
      ...warning,
      title: title,
      text: text,
      isWarningModalActive: true,
    });
  };

  const setIsWarningModalActive = (val) => {
    setWarning({ ...warning, isWarningModalActive: val });
  };

  // Putting a delay for capturing the first image since first image captured just after renderwas leading to false positives
  const getSnapshotInitial = () => {
    setTimeout(getSnapshot, 5000);
  };

  const getSnapshot = () => {
    if (webcam.current && isStreaming.current) {
      const image = webcam.current.getScreenshot();

      if (image) {
        const b64EncodedImg = image.split(",")[1];

        let mode = 0; // "mode" is to control whether to send frames to rekognition or not. for testing purposes

        if (mode === 1) {
          gateway.processImage(b64EncodedImg).then((res) => {
            if (res) {
              console.log(res);

              // If "Objects of Interest" test fails
              if (res[0]["Success"] === false) {
                alert(
                  `Alert! ${res[0]["Details"]} Detected! You will be Logged Out.`
                );
                signOut();
                navigate("/caught");
              }

              // If "Person Detection" test fails TODO: Change this alert to custom modal
              if (res[1]["Success"] === false && res[3]["Details"] > 1) {
                handleWarningInvokation(
                  "Warning: Multiple Persons",
                  "There seem to be multiple people in your camera frame."
                );
              }

              // If "Person Recognition" test fails TODO: Change this alert to custom modal
              if (res[2]["Success"] === false && res[3]["Success"] === true) {
                handleWarningInvokation(
                  "Impersonation Warning!",
                  "Person in the camera frame is not recognised. Ensure your face is clearly visible!"
                );
              }

              // If "Face Detection" test fails TODO: Change this alert to custom modal
              if (res[3]["Success"] === false && res[3]["Details"] === 0) {
                handleWarningInvokation(
                  "Warning: Face Not Detected!",
                  "Your face was not detected in the webcam. Ensure your face is clearly visible!"
                );
              }
            }

            if (isStreaming.current) setTimeout(getSnapshot, 15000);
          });
        } else {
          console.log("snapshot captured!", Math.random()); // Testing purposes
          if (isStreaming.current) setTimeout(getSnapshot, 3000); // Testing purposes
        }
      } else {
        console.log("Waiting for camera to start responding");
        setTimeout(getSnapshot, 500);
      }
    }
  };

  useEffect(() => {
    handleWarningInvokation(
      "Warning: Face Not Detected!",
      "Your face was not detected in the webcam. Ensure your face is clearly visible!"
    );
    return function cleanup() {
      isStreaming.current = false;
    };
  }, []);

  return (
    <>
      <ExamWarningModal
        show={warning.isWarningModalActive}
        setShow={setIsWarningModalActive}
        title={warning.title}
        text={warning.text}
      />
      <Webcam
        ref={setupWebcam}
        screenshotFormat={"image/jpeg"}
        videoConstraints={{
          width: 1280,
          height: 640,
          facingMode: "user",
        }}
        className={"examCamera"}
      />

      {isWebCamReady ? (
        <>
          {getSnapshotInitial()}
          <Timer duration={duration} callBackFn={timeUp} />
          <div className={"examQuestions"}>
            {questions.map((q) => (
              <Question
                id={q.id}
                question={q.question}
                opt1={q.opt1}
                opt2={q.opt2}
                opt3={q.opt3}
                opt4={q.opt4}
              />
            ))}

            <div style={{ marginBottom: "20px", textAlign: "center" }}>
              <Link to={"/thankyou"}>
                <Button
                  variant={"success"}
                  size={"lg"}
                  style={{ marginTop: "20px" }}
                >
                  Submit
                </Button>
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

const Question = ({ id, question, opt1, opt2, opt3, opt4 }) => {
  const opts = [opt1, opt2, opt3, opt4];
  return (
    <>
      <div className="card questionCard" id={id}>
        <div className="card-body">
          <div className="card-title">
            <strong>{question}</strong>
          </div>

          {opts.map((opt) => (
            <div className="form-check" key={String(id) + opt.trim(" ")}>
              <input
                className="form-check-input"
                type="radio"
                name={String(id) + opt.trim(" ")}
                id={String(id) + opt.trim(" ")}
                value={opt}
              />
              <label
                className="form-check-label"
                htmlFor={String(id) + opt.trim(" ")}
              >
                {opt}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Exam;
