import React, { useState } from 'react';
import useForm from '../../utils/useForm';

const initialTestDetails = {
  test_name: '',
  test_duration: 0,
  test_starts_at: '',
  test_ends_at: '',
  test_description: '',
  test_type: 'open',
  test_email_report: 'no',
};

const question = {
  question_id: 'uuid',
  question_text: 'sample question',
  question_type: 'mcq_single',
  question_max_score: 4,
  negative_marking: false,
  negative_marks: -2,
  answer_choices: {
    choice_id_1: 'sample choice',
  },
};

const withCreateTestState = (Component) => (props) => {
  const [
    testDetailsInput,
    handleTestDetailsInputChange,
    handleTestDateTimeChange,
  ] = useForm(initialTestDetails);
  const [questions, setQuestions] = useState([]);

  const addQuestion = (question) => {
    setQuestions((prevState) => [...prevState, question]);
  };

  const deleteQuestion = (questionID) => {
    setQuestions((prevState) =>
      prevState.filter((q) => q.question_id !== questionID),
    );
  };

  return (
    <Component
      {...props}
      testDetailsInput={testDetailsInput}
      handleTestDetailsInputChange={handleTestDetailsInputChange}
      handleTestDateTimeChange={handleTestDateTimeChange}
      questions={questions}
      addQuestion={addQuestion}
      deleteQuestion={deleteQuestion}
    />
  );
};

export default withCreateTestState;
