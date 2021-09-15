import React from 'react';
import SingleQuestion from './SingleQuestion';
import './QuestionsPane.scss';

const QuestionsPaneTopBar = ({ questions }) => {
  const totalScore = questions.reduce(
    (acc, val) => acc + val.question_max_score,
    0,
  );

  return (
    <div className="dash-qp-top-bar">
      <div className="dash-qp-top-bar-left">
        Total Questions Added: {questions.length}
      </div>

      <div className="dash-qp-top-bar-right">
        <div>Total Test Score: {totalScore}</div>

        <div>Duration: 60 minutes</div>
      </div>
    </div>
  );
};

const QuestionsPane = ({ questions, deleteQuestion }) => {
  return (
    <div>
      <QuestionsPaneTopBar questions={questions} />
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
