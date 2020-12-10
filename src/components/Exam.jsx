import React, { useEffect, useRef, useState } from "react";
import Timer from "./helpers/Timer";
import questions from "../static/questions.json";
import Button from "react-bootstrap/Button";
import { Link, navigate } from "@reach/router";
import "../styles/exam.css";
import Webcam from "react-webcam";
import gateway from "../utils/gateway";
import signOut from "../utils/signOut";

const Exam = ({ loadForSeconds }) => {
  const [isWebCamReady, setisWebcamReady] = useState(false);

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

  const getSnapshot = () => {
    if (webcam.current) {
      const image = webcam.current.getScreenshot();

      if (image) {
        const b64EncodedImg = image.split(",")[1];

        let mode = 1; // "mode" is to control whether to send frames to rekognition or not. for testing purposes

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
              if (res[1]["Success"] === false) {
                alert("Warning: Multiple People detected in your frame!");
              }

              // If "Person Recognition" test fails TODO: Change this alert to custom modal
              if (res[2]["Success"] === false) {
                alert(
                  "Impersonation Warning: Person in the frame is not recognised!"
                );
              }

              // If "Face Detection" test fails TODO: Change this alert to custom modal
              if (res[3]["Success"] === false) {
                alert(
                  "Face Not Detected Warning: Face was not detected. Ensure your face is clearly visible!"
                );
              }
            }

            if (isStreaming.current) setTimeout(getSnapshot, 300);
          });
        } else {
          console.log("snapshot captured!", Math.random()); // Testing purposes
          if (isStreaming.current) setTimeout(getSnapshot, 300); // Testing purposes
        }
      } else {
        console.log("Waiting for camera to start responding");
        setTimeout(getSnapshot, 500);
      }
    }
  };

  useEffect(() => {
    return function cleanup() {
      isStreaming.current = false;
    };
  }, []);

  return (
    <>
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
          {getSnapshot()}
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
