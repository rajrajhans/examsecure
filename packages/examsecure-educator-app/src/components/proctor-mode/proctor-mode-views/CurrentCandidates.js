import React from 'react';
import { Title } from '@examsecure/design-system';

const CurrentCandidates = () => {
  return (
    <div>
      <Title value={'Candidates Currently Taking the Test'} />
      <div className="proc-dash-flagged-images-text">
        This page shows the list of all candidates who are currently taking the
        test. You can extend time for a particular candidate or all the
        candidates. Reports will be available in the “Tests Taken” tab after a
        candidate submits their test.
      </div>
    </div>
  );
};

export default CurrentCandidates;
