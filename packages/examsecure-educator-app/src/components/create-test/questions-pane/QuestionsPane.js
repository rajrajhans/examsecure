import React from 'react';
import SingleQuestion from './SingleQuestion';
import './QuestionsPane.scss';

const QuestionsPaneTopBar = ({ questions, testDuration }) => {
  const totalScore = questions?.reduce(
    (acc, val) => acc + val.question_max_score,
    0,
  );

  return (
    <div className="dash-qp-top-bar">
      <div className="dash-qp-top-bar-left">
        Total Questions Added: {questions?.length}
      </div>

      <div className="dash-qp-top-bar-right">
        <div>Total Test Score: {totalScore}</div>

        <div>
          Duration: {testDuration ? `${testDuration} minutes` : 'Not set'}
        </div>
      </div>
    </div>
  );
};

const QuestionsPane = ({
  questions,
  deleteQuestion,
  changeQuestionInputStateTo,
  openEditQuestionModal,
  testDuration,
}) => {
  const handleQuestionEdit = (question_id) => {
    openEditQuestionModal();
    changeQuestionInputStateTo(question_id);
  };
  return (
    <div>
      <QuestionsPaneTopBar questions={questions} testDuration={testDuration} />
      <div className="dash-qp-questions">
        {questions && (
          <>
            {questions.length ? (
              <>
                {questions.map((question, i) => (
                  <SingleQuestion
                    question={question}
                    key={question.question_id}
                    i={i}
                    deleteQuestion={deleteQuestion}
                    handleQuestionEdit={handleQuestionEdit}
                  />
                ))}
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>No Questions added yet.</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionsPane;
