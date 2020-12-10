import React, { useState } from "react";
import ExamWarningModal from "./Modal";
import Button from "react-bootstrap/Button";

function PersistantModal() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <ExamWarningModal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <ExamWarningModal.Header closeButton>
          <ExamWarningModal.Title>Modal title</ExamWarningModal.Title>
        </ExamWarningModal.Header>
        <ExamWarningModal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </ExamWarningModal.Body>
        <ExamWarningModal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </ExamWarningModal.Footer>
      </ExamWarningModal>
    </>
  );
}

export default PersistantModal;
