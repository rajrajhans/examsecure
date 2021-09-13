import React from 'react';
import SingleQuestion from './SingleQuestion';
import './QuestionsPane.scss';

const QuestionsPaneTopBar = ({ numOfQuestions }) => (
  <div className="dash-qp-top-bar">
    <div className="dash-qp-top-bar-left">
      Total Questions Added: {numOfQuestions}
    </div>

    <div className="dash-qp-top-bar-right">
      <div>Total Test Score: 200</div>

      <div>Duration: 60 minutes</div>
    </div>
  </div>
);

const QuestionsPane = ({ questions, deleteQuestion }) => {
  return (
    <div>
      <QuestionsPaneTopBar numOfQuestions={questions ? questions.length : 0} />
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
