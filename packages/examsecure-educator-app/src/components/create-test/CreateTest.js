import React, { useState } from 'react';
import { Button, Title } from '@examsecure/design-system';
import OverviewPane from './overview-pane/OverviewPane';
import QuestionsPane from './questions-pane/QuestionsPane';
import AddNewQuestionModal from './questions-pane/add-question-modal/AddNewQuestionModal';
import PublishTestModal from './overview-pane/PublishTestModal';
import withCreateTestState from './withCreateTestState';

const CreateTest = ({
  testDetailsInput,
  handleTestDetailsInputChange,
  handleTestDateTimeChange,
  questions,
  addQuestion,
  editQuestion,
  deleteQuestion,
  addQuestionForm,
  changeQuestionInputStateTo,
  publishTest,
}) => {
  const [currentView, setCurrentView] = useState(0); // 0 for overview, 1 for questions view

  const [
    isAddNewQuestionModalVisible,
    setIsAddNewQuestionModalVisible,
  ] = useState(false);

  const [isCurrentlyEditingQuestion, setIsCurrentlyEditingQuestion] = useState(
    false,
  );

  const [isPublishTestModalVisible, setIsPublishTestModalVisible] = useState(
    false,
  );

  const changeView = (i) => {
    setCurrentView(i);
  };

  const toggleAddNewQuestionModal = () => {
    setIsCurrentlyEditingQuestion(false);
    setIsAddNewQuestionModalVisible((prevState) => !prevState);
  };

  const openEditQuestionModal = () => {
    setIsCurrentlyEditingQuestion(true);
    setIsAddNewQuestionModalVisible(true);
  };

  const togglePublishTestModal = () => {
    setIsPublishTestModalVisible((prevState) => !prevState);
  };

  return (
    <div className={'dash-wrapper'}>
      <Title value={'Create New Test'} />

      <div className="dash-ct-bar">
        <div className="dash-ct-bar-left">
          <div className="dash-ct-bar-btn">
            <button
              onClick={() => {
                changeView(0);
              }}
              className={currentView === 0 ? 'dash-ct-bar-btn-active' : null}
            >
              Overview
            </button>
          </div>
          <div className="dash-ct-bar-btn">
            <button
              onClick={() => {
                changeView(1);
              }}
              className={currentView === 1 ? 'dash-ct-bar-btn-active' : null}
            >
              Questions
            </button>
          </div>
        </div>
        {currentView === 0 ? (
          <>
            <Button
              label={'Publish'}
              variant={'secondary'}
              onClick={togglePublishTestModal}
            />
          </>
        ) : (
          <>
            <Button
              label={'Add a Question'}
              variant={'secondary'}
              onClick={toggleAddNewQuestionModal}
            />
          </>
        )}
      </div>

      <div className="dash-ct-content">
        {currentView === 0 ? (
          <>
            <OverviewPane
              testDetailsInput={testDetailsInput}
              handleTestDetailsInputChange={handleTestDetailsInputChange}
              handleTestDateTimeChange={handleTestDateTimeChange}
            />
            <PublishTestModal
              show={isPublishTestModalVisible}
              onModalHide={togglePublishTestModal}
              testDetailsInput={testDetailsInput}
              publishTest={publishTest}
              numOfQuestions={questions.length}
            />
          </>
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
    </div>
  );
};

export default withCreateTestState(CreateTest);
