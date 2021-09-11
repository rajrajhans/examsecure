import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form, InputGroup } from 'react-bootstrap';

const AddNewQuestionModal = ({ show, onModalHide }) => {
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

      <Modal.Body>
        <div className="qp-add-new-question-container">
          <Form>
            <Form.Group>
              <Form.Label>Question Type</Form.Label>
              <Form.Control as={'select'}>
                <option value={'mcq_single'}>
                  Multiple Choice (Single Answer)
                </option>
                <option value={'mcq_multiple'}>
                  Multiple Choice (Multiple Answers)
                </option>
                <option value={'subjective'}>Subjective</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Question Text</Form.Label>
              <Form.Control as="textarea" style={{ height: '150px' }} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Number of marks for the question</Form.Label>
              <Form.Control
                type="number"
                placeholder="Marks for the question"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Negative Marking</Form.Label>
              <Form.Control as={'select'}>
                <option value={'no'}>No</option>
                <option value={'yes'}>Yes</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Negative Marks for this question</Form.Label>
              <InputGroup>
                <InputGroup.Text>-</InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="How many marks to deduct if candidate answers this question incorrectly"
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="qp-add-new-question-choices-container">
              <Form.Label>Answer Choices</Form.Label>
              {[1, 2, 3, 4].map((x) => (
                <Form.Check key={x}>
                  <Form.Check.Input
                    type={'radio'}
                    name={'mcq-answer-choice'}
                    id={'mcq-answer-choice-1'}
                  />
                  <Form.Check.Label>
                    <Form.Group>
                      <Form.Control type="text" placeholder="Option #1" />
                    </Form.Group>
                  </Form.Check.Label>
                </Form.Check>
              ))}
              <Form.Text muted>
                Please choose the correct answer among the options
              </Form.Text>
            </Form.Group>

            <Form.Group className="qp-add-new-question-choices-container">
              <Form.Label>Answer Choices</Form.Label>
              {[1, 2, 3, 4].map((x) => (
                <Form.Check key={x}>
                  <Form.Check.Input
                    type={'checkbox'}
                    name={'mcq-answers-choice'}
                    id={'mcq-answers-choice-1'}
                  />
                  <Form.Check.Label>
                    <Form.Group>
                      <Form.Control type="text" placeholder="Option #1" />
                    </Form.Group>
                  </Form.Check.Label>
                </Form.Check>
              ))}

              <Form.Text muted>
                Please choose the correct answers among the options
              </Form.Text>
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onModalHide}>
          Close
        </Button>
        <Button variant="primary" onClick={onModalHide}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewQuestionModal;
