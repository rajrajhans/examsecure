import React from 'react';
import { Button } from '@examsecure/design-system';

const SingleTestView = ({ test }) => {
  return (
    <div className="dash-single-test-view">
      <div className="dash-single-test-view-left">
        <div className="dash-single-test-view-left-test-name">
          {test.test_name}
        </div>
        <div className="dash-single-test-view-left-test-details">
          <div className="dash-single-test-view-left-test-details-row">
            <div>Started at {test.test_starts_at}</div>
            <div>Ends at {test.test_ends_at}</div>
          </div>
          <div className="dash-single-test-view-left-test-details-row">
            <div>20 Candidates Submitted</div>
            <div>20 Questions, {test.test_duration} minutes</div>
          </div>
        </div>
      </div>
      <div className="dash-single-test-view-right">
        <Button variant={'secondary'} label={'More Details'} />
        <Button variant={'secondary'} label={'Proctor Mode'} />
      </div>
    </div>
  );
};

export default SingleTestView;
