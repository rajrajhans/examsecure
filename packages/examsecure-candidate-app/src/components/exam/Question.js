import React from 'react';

const Question = ({
  questionID,
  question,
  opts,
  handleAnswerChange,
  isRadioChecked,
}) => {
  return (
    <>
      <div className="card questionCard">
        <div className="card-body">
          <div className="card-title">
            <strong>{question}</strong>
          </div>

          {opts.map((opt) => (
            <div className="form-check mcqOption" key={opt.id}>
              <input
                className="form-check-input"
                type="radio"
                name={questionID}
                id={`${questionID}-${opt.id}`}
                value={opt.id}
                onChange={handleAnswerChange}
                checked={isRadioChecked(questionID, opt.id) ? 'checked' : null}
              />
              <label
                htmlFor={`${questionID}-${opt.id}`}
                className="form-check-label"
              >
                {opt.choice_text}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Question;
