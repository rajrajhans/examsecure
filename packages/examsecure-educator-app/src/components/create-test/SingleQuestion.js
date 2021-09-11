import React from 'react';

const SingleQuestion = ({ question }) => {
  return (
    <div className={'dash-qp-sq'}>
      <div className="dash-qp-sq-left">01</div>
      <div className="dash-qp-sq-center">
        <div className="dash-qp-sq-center-questionText">
          {question.questionText}
        </div>
        <div className="dash-qp-sq-center-bottom-bar">
          <div>Maximum Score: {question.maxScore}</div>
          <div>Negative Marking: {question.negativeMarks}</div>
        </div>
        <div className="dash-qp-sq-right">
          <div>Edit</div>
          <div>Del</div>
        </div>
      </div>
    </div>
  );
};

export default SingleQuestion;
