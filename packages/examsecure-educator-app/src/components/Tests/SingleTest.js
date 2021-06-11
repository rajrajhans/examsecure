import React from 'react';
import { Button } from '@examsecure/design-system';

const SingleTest = ({ test }) => {
  return (
    <div className={'single-test'}>
      <div className="s-test-details">
        <div className="s-test-name">{test.name}</div>
        <div className="s-test-stats">
          <div className="s-test-stat">
            Started at 06:09 AM, ends at 04:20 PM
          </div>
          <div className="s-test-stat">50 Candidates Invited</div>
          <div className="s-test-stat">20 Questions</div>
          <div className="s-test-stat">20 Candidates Submitted</div>
        </div>
      </div>

      <div className="s-test-btns">
        <div className="s-test-btn-1">
          <Button variant={'secondary'} label={'More Details'} />
        </div>
        <div className="s-test-btn-2">
          <Button variant={'secondary'} label={'Proctor Mode'} />
        </div>
      </div>
    </div>
  );
};

export default SingleTest;
