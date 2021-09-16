import React, { useState } from 'react';
import { Title } from '@examsecure/design-system';
import QuestionsPane from '../../../create-test/questions-pane/QuestionsPane';
import withTestState from './withTestState';
import AddNewQuestionModal from '../../../create-test/questions-pane/add-question-modal/AddNewQuestionModal';
import LoadingSpinner from '../../../helpers/LoadingSpinner';

const TestQuestions = ({
  testDetailsInput,
  questions,
  changeQuestionInputStateTo,
  addQuestion,
  editQuestion,
  deleteQuestion,
  addQuestionForm,
  test,
}) => {
  const [
    isAddNewQuestionModalVisible,
    setIsAddNewQuestionModalVisible,
  ] = useState(false);

  const [isCurrentlyEditingQuestion, setIsCurrentlyEditingQuestion] = useState(
    false,
  );

  const toggleAddNewQuestionModal = () => {
    setIsCurrentlyEditingQuestion(false);
    setIsAddNewQuestionModalVisible((prevState) => !prevState);
  };

  const openEditQuestionModal = () => {
    setIsCurrentlyEditingQuestion(true);
    setIsAddNewQuestionModalVisible(true);
  };

  return (
    <div>
      <Title value={'Test Questions'} />

      {!test ? (
        <div className="loading-spinner">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <QuestionsPane
            questions={questions}
            deleteQuestion={deleteQuestion}
            changeQuestionInputStateTo={changeQuestionInputStateTo}
            openEditQuestionModal={openEditQuestionModal}
            testDuration={testDetailsInput.test_duration}
          />
          <AddNewQuestionModal
            show={isAddNewQuestionModalVisible}
            onModalHide={toggleAddNewQuestionModal}
            addQuestion={addQuestion}
            editQuestion={editQuestion}
            addQuestionForm={addQuestionForm}
            isCurrentlyEditingQuestion={isCurrentlyEditingQuestion}
          />
        </>
      )}
    </div>
  );
};

export default withTestState(TestQuestions);
