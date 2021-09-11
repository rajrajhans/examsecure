import React from 'react';
import { Title } from '@examsecure/design-system';

const InvitedCandidates = () => {
  return (
    <div>
      <Title value={'Invited Candidates'} />
      <div className="proc-dash-flagged-images-text">
        This page shows the list of all candidates invited to take the test.
        Click on Add to invite more candidates.
      </div>
    </div>
  );
};

export default InvitedCandidates;
