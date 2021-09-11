import React from 'react';
import { Title } from '@examsecure/design-system';

const QuestionsAnalytics = () => {
  return (
    <div>
      <div>
        <Title value={'Questions Analytics'} />
        <div className="proc-dash-flagged-images-text">
          This is a question wise analysis as per how many candidates have
          attempted each question, and how many of them answered it correctly.
        </div>
      </div>
    </div>
  );
};

export default QuestionsAnalytics;
