import React from 'react';
import { Form } from 'react-bootstrap';

const MCQSingleChoicesInput = ({
  choiceSelectChangeHandler,
  choiceTextChangeHandler,
  inputs,
}) => {
  return (
    <Form.Group className="qp-add-new-question-choices-container">
      <Form.Label>Add Answer Choices</Form.Label>

      {inputs.choices.map(({ id, choice_text }) => (
        <Form.Check key={id}>
          <Form.Check.Input
            type={'radio'}
            name={'mcq_single_choice_option'}
            id={id}
            onChange={choiceSelectChangeHandler}
          />

          <Form.Check.Label>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder={`Option ${id}`}
                id={id}
                onChange={choiceTextChangeHandler}
                value={choice_text}
              />
            </Form.Group>
          </Form.Check.Label>
        </Form.Check>
      ))}

      <Form.Text muted>
        Please choose the correct answer among the options
      </Form.Text>
    </Form.Group>
  );
};

export default MCQSingleChoicesInput;
