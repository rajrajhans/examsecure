import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form, InputGroup } from 'react-bootstrap';
import { Button as ESButton } from '@examsecure/design-system';
import MCQSingleChoicesInput from './MCQSingleChoicesInput';
import MCQMultipleChoicesInput from './MCQMultipleChoicesInput';
import validateQuestionInput from './validateQuestionInput';

const AddNewQuestionModal = ({
  show,
  onModalHide,
  addQuestion,
  editQuestion,
  addQuestionForm,
  isCurrentlyEditingQuestion,
}) => {
  const {
    inputs,
    onChangeHandler,
    choiceSelectChangeHandler,
    choiceTextChangeHandler,
    resetQuestionInputState,
  } = addQuestionForm;

  const onSubmit = () => {
    if (validateQuestionInput(inputs)) {
      if (isCurrentlyEditingQuestion) {
        editQuestion(inputs);
      } else {
        addQuestion(inputs);
      }
      onModalHide();
      resetQuestionInputState();
    }
  };

  const onClose = () => {
    onModalHide();
    resetQuestionInputState();
  };

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
              <Form.Control
                as={'select'}
                value={inputs.question_type}
                name={'question_type'}
                onChange={onChangeHandler}
              >
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
              <Form.Control
                as="textarea"
                style={{ height: '150px' }}
                value={inputs.question_text}
                name={'question_text'}
                onChange={onChangeHandler}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Number of marks for the question</Form.Label>
              <Form.Control
                type="number"
                placeholder="Marks for the question"
                value={inputs.question_max_score}
                name={'question_max_score'}
                onChange={onChangeHandler}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Negative Marking</Form.Label>
              <Form.Control
                as={'select'}
                value={inputs.negative_marking}
                name={'negative_marking'}
                onChange={onChangeHandler}
              >
                <option value={'no'}>No</option>
                <option value={'yes'}>Yes</option>
              </Form.Control>
            </Form.Group>

            {inputs.negative_marking === 'yes' && (
              <Form.Group>
                <Form.Label>Negative Marks for this question</Form.Label>
                <InputGroup>
                  <InputGroup.Text>-</InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="How many marks to deduct if candidate answers this question incorrectly"
                    value={inputs.negative_marks}
                    name={'negative_marks'}
                    onChange={onChangeHandler}
                  />
                </InputGroup>
              </Form.Group>
            )}

            {inputs.question_type === 'mcq_single' && (
              <MCQSingleChoicesInput
                choiceSelectChangeHandler={choiceSelectChangeHandler}
                choiceTextChangeHandler={choiceTextChangeHandler}
                inputs={inputs}
              />
            )}
            {inputs.question_type === 'mcq_multiple' && (
              <MCQMultipleChoicesInput
                choiceSelectChangeHandler={choiceSelectChangeHandler}
                choiceTextChangeHandler={choiceTextChangeHandler}
                inputs={inputs}
              />
            )}
          </Form>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <ESButton variant="secondary" onClick={onClose} label={'Close'} />
        <ESButton
          variant="primary"
          onClick={onSubmit}
          label={
            isCurrentlyEditingQuestion ? 'Update Question' : 'Save Changes'
          }
        />
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewQuestionModal;
