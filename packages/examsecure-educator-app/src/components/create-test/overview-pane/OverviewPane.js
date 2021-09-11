import React from 'react';
import useForm from '../../../utils/useForm';
import { Form, InputGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DateTime from 'react-datetime';
import Button from 'react-bootstrap/Button';
import InviteCandidateEmails from './InviteCandidateEmails';

// todo: if test is set to be invite only, then show option for adding candidate emails

const OverviewPane = () => {
  const [inputs, handleChange] = useForm();

  return (
    <Container fluid className={'dash-op-container'}>
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Test Name</Form.Label>
              <Form.Control type="text" placeholder="My Sample Test" />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Test Duration</Form.Label>
              <InputGroup>
                <Form.Control type="number" placeholder="60" min="0" />
                <InputGroup.Text>mins</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Starts On</Form.Label>
              <DateTime />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Ends On</Form.Label>
              <DateTime />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Test Description</Form.Label>
              <Form.Control as="textarea" style={{ height: '40px' }} />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Test Type</Form.Label>
              <Form.Control as={'select'}>
                <option value={'open'}>Open to All</option>
                <option value={'invite'}>Invite Only</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Email Test Report to candidates?</Form.Label>
              <Form.Control as={'select'} required>
                <option value={'no'}>No</option>
                <option value={'yes'}>Yes</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col>
          <InviteCandidateEmails />
        </Col>
        <Col />
      </Row>
    </Container>
  );
};

export default OverviewPane;
