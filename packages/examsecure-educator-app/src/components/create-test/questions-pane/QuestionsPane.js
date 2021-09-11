import React from 'react';
import SingleQuestion from './SingleQuestion';
import './QuestionsPane.scss';

const DEMO_QUESTION = {
  questionText:
    'This is a question. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
  maxScore: 50,
  negativeMarks: 0,
};

const QuestionsPaneTopBar = () => (
  <div className="dash-qp-top-bar">
    <div className="dash-qp-top-bar-left">Total Questions Added: 3</div>

    <div className="dash-qp-top-bar-right">
      <div>Total Test Score: 200</div>

      <div>Duration: 60 minutes</div>
    </div>
  </div>
);

const QuestionsPane = () => {
  return (
    <div>
      <QuestionsPaneTopBar />
      <div className="dash-qp-questions">
        {[1, 2, 3, 4, 5, 6].map((question) => (
          <SingleQuestion question={DEMO_QUESTION} key={question} />
        ))}
      </div>
    </div>
  );
};

export default QuestionsPane;
