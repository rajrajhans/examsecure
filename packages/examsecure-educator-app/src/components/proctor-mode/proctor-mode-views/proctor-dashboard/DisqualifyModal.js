import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button as ESButton } from '@examsecure/design-system';
import './ModalStyles.scss';

const DetailsModal = ({ show, onModalHide }) => {
  return (
    <Modal show={show} onHide={onModalHide} className="proc-modal">
      <Modal.Header closeButton>
        <Modal.Title>Disqualify the candidate?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Once disqualified, the candidate's test will be automatically submitted
        and they will be logged out of the platform!
      </Modal.Body>

      <Modal.Footer>
        <ESButton
          variant="primary"
          onClick={onModalHide}
          label={'Disqualify'}
        />
        <ESButton variant="secondary" onClick={onModalHide} label={'Back'} />
      </Modal.Footer>
    </Modal>
  );
};

export default DetailsModal;
