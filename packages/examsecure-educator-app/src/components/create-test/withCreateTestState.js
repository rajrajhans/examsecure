import React, { useState } from 'react';
import useForm from '../../utils/useForm';
import useAddQuestionForm from './questions-pane/add-question-modal/useAddQuestionForm';

const initialTestDetails = {
  test_name: '',
  test_duration: 0,
  test_starts_at: '',
  test_ends_at: '',
  test_description: '',
  test_type: 'open',
  test_email_report: 'no',
};

const withCreateTestState = (Component) => (props) => {
  const [
    testDetailsInput,
    handleTestDetailsInputChange,
    handleTestDateTimeChange,
  ] = useForm(initialTestDetails);

  const [questions, setQuestions] = useState([]);

  const addQuestionForm = useAddQuestionForm();

  const addQuestion = (question) => {
    question.question_id = questions.length
      ? questions.slice(-1)[0].question_id + 1
      : 1;
    setQuestions((prevState) => [...prevState, question]);
  };

  const editQuestion = (question) => {
    const { question_id } = question;
    setQuestions((prevState) =>
      prevState.map((q) => {
        if (q.question_id === question_id) {
          return question;
        } else {
          return q;
        }
      }),
    );
  };

  const deleteQuestion = (questionID) => {
    setQuestions((prevState) =>
      prevState.filter((q) => q.question_id !== questionID),
    );
  };

  const changeQuestionInputStateTo = (questionID) => {
    const q = questions.filter((q) => q.question_id === questionID)[0];
    if (q) {
      addQuestionForm.replaceQuestionInputState(q);
    }
  };

  return (
    <Component
      {...props}
      testDetailsInput={testDetailsInput}
      handleTestDetailsInputChange={handleTestDetailsInputChange}
      handleTestDateTimeChange={handleTestDateTimeChange}
      questions={questions}
      addQuestion={addQuestion}
      editQuestion={editQuestion}
      deleteQuestion={deleteQuestion}
      addQuestionForm={addQuestionForm}
      changeQuestionInputStateTo={changeQuestionInputStateTo}
    />
  );
};

export default withCreateTestState;
