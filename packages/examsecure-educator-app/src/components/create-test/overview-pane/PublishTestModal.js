import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { Button as ESButton } from '@examsecure/design-system';
import { useDispatch } from 'react-redux';
import { create_test_action } from '../../../redux/action-creators/create_tests';
import { useHistory } from 'react-router-dom';

const PublishTestModal = ({ show, onModalHide, testDetailsInput }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = () => {
    if (validateTestDetails(testDetailsInput)) {
      dispatch(create_test_action(testDetailsInput));
      history.push('/');
    }
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
            <Form.Control type="text" readOnly value={'30 Questions'} />
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

const validateTestDetails = (testDetailsInput) => {
  let isTestDetailsOK = true;
  let errorMessage = '';

  Object.entries(testDetailsInput).map(([k, v]) => {
    if (k === 'test_duration' && v <= 0) {
      errorMessage += ' Enter a valid test duration. \n';
      isTestDetailsOK = false;
    }

    if (v === '') {
      errorMessage += ` Please fill the ${k} field! \n`;
      isTestDetailsOK = false;
    }
  });

  if (errorMessage) {
    alert(errorMessage);
  }

  return isTestDetailsOK;
};
