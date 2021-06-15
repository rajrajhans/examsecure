import React from 'react';
import { Button } from '@examsecure/design-system';

const SingleTest = ({ test }) => {
  return (
    <div className={'single-test'}>
      <div className="s-test-details">
        <div className="s-test-name">{test.name}</div>
        <div className="s-test-stats">
          <div className="s-test-stat">
            Started at {test.starts_at}, ends at {test.ends_at}
          </div>
          <div className="s-test-stat">
            {test.candidates_invited} Candidates Invited
          </div>
          <div className="s-test-stat">{test.num_of_questions} Questions</div>
          <div className="s-test-stat">
            {test.candidates_submitted} Candidates Submitted
          </div>
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
