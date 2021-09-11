import React from 'react';
import Modal from 'react-bootstrap/Modal';

const PublishTestModal = ({ show, onModalHide }) => {
  return (
    <Modal
      show={show}
      onHide={onModalHide}
      backdrop="static"
      keyboard={false}
      size={'lg'}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add New Question</Modal.Title>
      </Modal.Header>

      <Modal.Body>publish test</Modal.Body>
    </Modal>
  );
};

export default PublishTestModal;
