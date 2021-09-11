import React from 'react';
import { Title } from '@examsecure/design-system';
import QuestionsPane from '../../create-test/questions-pane/QuestionsPane';

const TestQuestions = () => {
  return (
    <div>
      <Title value={'Test Questions'} />
      <QuestionsPane />
    </div>
  );
};

export default TestQuestions;
