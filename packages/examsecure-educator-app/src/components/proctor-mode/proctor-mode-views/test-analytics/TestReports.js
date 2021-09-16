import React from 'react';
import { Title } from '@examsecure/design-system';
import ComingSoon from './ComingSoon';

const TestReports = () => {
  return (
    <div>
      <div>
        <Title value={'Test Analytics'} />
        <div className="proc-dash-flagged-images-text">
          This is an overview of the test based on candidate performance, time
          taken to complete the test, etc.
        </div>
        <ComingSoon />
      </div>
    </div>
  );
};

export default TestReports;
