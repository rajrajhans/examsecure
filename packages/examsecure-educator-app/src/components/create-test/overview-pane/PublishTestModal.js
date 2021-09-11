import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { Button as ESButton } from '@examsecure/design-system';

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
        <Modal.Title>Publish the test?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Test Name</Form.Label>
            <Form.Control type="text" readOnly value={'asdasd'} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Test Description</Form.Label>
            <Form.Control type="text" readOnly value={'Test Description'} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Test Duration</Form.Label>
            <Form.Control type="text" readOnly value={'30 Questions'} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Test Duration</Form.Label>
            <Form.Control type="text" readOnly value={'30 Minutes'} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <ESButton variant="secondary" onClick={onModalHide} label={'Go Back'} />
        <ESButton
          variant="primary"
          onClick={onModalHide}
          label={'Publish Test'}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default PublishTestModal;
