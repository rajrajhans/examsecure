import React from 'react';
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/trash.svg';

const SingleQuestion = ({ question }) => {
  return (
    <div className="dash-qp-sq">
      <div className="dash-qp-sq-left">01</div>

      <div className="dash-qp-sq-center">
        <div className="dash-qp-sq-center-questionText">
          {question.questionText}
        </div>
        <div className="dash-qp-sq-center-bottom-bar">
          <div>Maximum Score: {question.maxScore}</div>
          <div>Negative Marking: {question.negativeMarks}</div>
        </div>
      </div>

      <div className="dash-qp-sq-right">
        <div className="dash-qp-sq-right-icon">
          <EditIcon title="Edit Question" />
        </div>
        <div className="dash-qp-sq-right-icon">
          <DeleteIcon title="Delete Question" />
        </div>
      </div>
    </div>
  );
};

export default SingleQuestion;
