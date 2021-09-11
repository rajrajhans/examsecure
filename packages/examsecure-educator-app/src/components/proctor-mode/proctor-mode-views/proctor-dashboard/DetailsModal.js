import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button as ESButton } from '@examsecure/design-system';
import './ModalStyles.scss';

const DetailsModal = ({ show, onModalHide }) => {
  return (
    <Modal show={show} onHide={onModalHide} size={'lg'} className="proc-modal">
      <Modal.Header closeButton>
        <Modal.Title>Flagged Image Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>TODO!</Modal.Body>

      <Modal.Footer>
        <ESButton variant="secondary" onClick={onModalHide} label={'Back'} />
      </Modal.Footer>
    </Modal>
  );
};

export default DetailsModal;
