import React, { Fragment, useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import gateway from "../../utils/gateway";
import Spinner from "react-bootstrap/Spinner";
import { mode } from "./modeSetter";

const AddFaceBox = ({
  setActiveSlide,
  activeSlide,
  currentUser,
  captureFrame,
}) => {
  const [isFaceAdded, setIsFaceAdded] = useState(false);

  useEffect(() => {
    if (activeSlide === 3 && isFaceAdded === false) {
      if (mode === 1) {
        let b64ImageData = captureFrame();
        gateway
          .addIndexFace(b64ImageData, currentUser)
          .then(() => setIsFaceAdded(true));
      } else {
        console.log("In Development mode, NOT sending request to Lmabda");
        setTimeout(() => setIsFaceAdded(true), 1000); // For testing purposes
      }
    }
  }, [activeSlide]);

  return (
    <Fragment>
      <Alert variant={"info"} width={"500px"} className={"instructionsBox"}>
        <Alert.Heading className={"instrHeading"}>
          Let's add your Face
        </Alert.Heading>
        <ul className={"instructionsBoxList"}>
          <li>
            Please wait, our system is detecting and saving the features of your
            face.
          </li>
          <li>
            If any face other than the one being scanned now shows up in the
            frame during the test, an impersonation warning will be triggered.
          </li>
          <li>Ensure you do not wear any face covering.</li>
        </ul>
      </Alert>

      {isFaceAdded ? (
        <Button
          variant={"primary"}
          size={"lg"}
          className={"NextButton"}
          block
          onClick={() => setActiveSlide(4)}
        >
          Next
        </Button>
      ) : (
        <Button
          variant={"secondary"}
          disabled
          size={"lg"}
          className={"NextButton"}
          block
          onClick={() => {}}
        >
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner animation={"border"} style={{ marginRight: "12px" }} />
            Adding your face ...
          </span>
        </Button>
      )}
    </Fragment>
  );
};

export default AddFaceBox;
