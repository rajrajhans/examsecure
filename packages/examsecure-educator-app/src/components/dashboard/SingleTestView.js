import React from 'react';
import { Button } from '@examsecure/design-system';

const SingleTestView = () => {
  return (
    <div className="dash-single-test-view">
      <div className="dash-single-test-view-left">
        <div className="dash-single-test-view-left-test-name">
          Compiler Design test
        </div>
        <div className="dash-single-test-view-left-test-details">
          <div className="dash-single-test-view-left-test-details-row">
            <div>Started at 11/09/21 06:09 AM</div>
            <div>Ends at 11/09/21 04:20 PM</div>
          </div>
          <div className="dash-single-test-view-left-test-details-row">
            <div>20 Candidates Submitted</div>
            <div>20 Questions, 60 minutes</div>
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
