import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { Button as ESButton } from '@examsecure/design-system';

const PublishTestModal = ({
  show,
  onModalHide,
  testDetailsInput,
  publishTest,
  numOfQuestions,
}) => {
  const onSubmit = () => {
    publishTest();
  };

  return (
    <Modal show={show} onHide={onModalHide} size={'lg'}>
      <Modal.Header closeButton>
        <Modal.Title>Publish the test?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Please review the test details before publishing.
        <Form>
          <Form.Group>
            <Form.Label>Test Name</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={testDetailsInput.test_name}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Test Description</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={testDetailsInput.test_description}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Test Duration</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={testDetailsInput.test_duration + ' minutes'}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Test Starts on</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={testDetailsInput.test_starts_at}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Test Ends on</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={testDetailsInput.test_ends_at}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Test Type</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={testDetailsInput.test_type}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Questions Added</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={`${numOfQuestions} Questions`}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <ESButton
          variant="secondary"
          onClick={onModalHide}
          label={'Go Back to Edit'}
        />
        <ESButton variant="primary" onClick={onSubmit} label={'Publish Test'} />
      </Modal.Footer>
    </Modal>
  );
};

export default PublishTestModal;
