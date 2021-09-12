import React from 'react';
import { Title } from '@examsecure/design-system';

const TestTakenCandidates = () => {
  return (
    <div>
      <Title value={'Tests Taken'} />
      <div className="proc-dash-flagged-images-text">
        This page shows the list of all candidates who have submitted the tests
        or have been disqualified. Click on a candidate to see their detailed
        report.
      </div>
    </div>
  );
};

export default TestTakenCandidates;
