import React from 'react';
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/trash.svg';

const SingleQuestion = ({ question, i, deleteQuestion }) => {
  return (
    <div className="dash-qp-sq">
      <div className="dash-qp-sq-left">{i}</div>

      <div className="dash-qp-sq-center">
        <div className="dash-qp-sq-center-questionText">
          {question.question_text}
        </div>
        <div className="dash-qp-sq-center-bottom-bar">
          <div>Maximum Score: {question.question_max_score}</div>
          <div>
            Negative Marking:{' '}
            {question.negative_marking ? question.negative_marks : 'No'}
          </div>
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
