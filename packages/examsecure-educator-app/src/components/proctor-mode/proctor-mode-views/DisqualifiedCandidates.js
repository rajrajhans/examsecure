import React from 'react';
import { Title } from '@examsecure/design-system';

const DisqualifiedCandidates = () => {
  return (
    <div>
      <Title value={'Disqualified Candidates'} />
      <div className="proc-dash-flagged-images-text">
        This page shows the list of candidates that have been disqualified from
        the test. You can choose to reset their test and allow them to re
        attempt the test.
      </div>
    </div>
  );
};

export default DisqualifiedCandidates;
