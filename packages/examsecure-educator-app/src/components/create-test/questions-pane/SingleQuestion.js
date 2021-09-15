import React from 'react';
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/trash.svg';

const SingleQuestion = ({
  question,
  i,
  deleteQuestion,
  handleQuestionEdit,
}) => {
  const handleDelete = () => {
    deleteQuestion(question.question_id);
  };

  const handleEditClick = () => {
    handleQuestionEdit(question.question_id);
  };

  return (
    <div className="dash-qp-sq">
      <div className="dash-qp-sq-left">{i + 1}</div>

      <div className="dash-qp-sq-center">
        <div className="dash-qp-sq-center-questionText">
          {question.question_text}
        </div>
        <div className="dash-qp-sq-center-bottom-bar">
          <div>Maximum Score: {question.question_max_score}</div>
          <div>
            Negative Marking:{' '}
            {question.negative_marking === 'yes'
              ? '-' + question.negative_marks
              : 'No'}
          </div>
          <div>
            Question Type:{' '}
            {question.question_type === 'mcq_single' &&
              'MCQ with a Single Correct Answer'}
            {question.question_type === 'mcq_multiple' &&
              'MCQ with Multiple Correct Answers'}
            {question.question_type === 'subjective' && 'Subjective Answer'}
          </div>
        </div>
      </div>

      <div className="dash-qp-sq-right">
        <div className="dash-qp-sq-right-icon">
          <EditIcon title="Edit Question" onClick={handleEditClick} />
        </div>
        <div className="dash-qp-sq-right-icon">
          <DeleteIcon title="Delete Question" onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default SingleQuestion;
