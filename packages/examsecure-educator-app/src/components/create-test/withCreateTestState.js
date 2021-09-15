import React, { useState } from 'react';
import useForm from '../../utils/useForm';
import useAddQuestionForm from './questions-pane/add-question-modal/useAddQuestionForm';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { create_test_action } from '../../redux/action-creators/create_tests';

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
  const uid = useSelector((state) => state.firebase.auth.uid);
  const dispatch = useDispatch();
  const history = useHistory();

  const publishTest = () => {
    testDetailsInput.questions = questions;
    if (validateTestDetails(testDetailsInput, questions.length)) {
      dispatch(create_test_action(testDetailsInput, uid));
      history.push('/');
    }
  };

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
      publishTest={publishTest}
    />
  );
};

export default withCreateTestState;

const validateTestDetails = (testDetailsInput, numOfQuestions) => {
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

  if (numOfQuestions <= 1) {
    errorMessage += ` Please add at least one question to publish this test \n`;
    isTestDetailsOK = false;
  }

  if (errorMessage) {
    alert(errorMessage);
  }

  return isTestDetailsOK;
};
