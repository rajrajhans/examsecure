import React from 'react';
import { Button } from '@examsecure/design-system';

// todo: show more details modal when user clicks on the image as well

const FlaggedImageRecord = () => {
  return (
    <div className="proc-dash-flagged-image-record">
      <div className="proc-dash-flagged-image-src">
        <img
          src={
            'https://imgsv.imaging.nikon.com/lineup/dslr/df/img/sample/img_01.jpg'
          }
          alt={'flagged image'}
        />
      </div>
      <div className="proc-dash-flagged-image-details">
        <div>
          <strong>Candidate Name: </strong>
          <span>John Doe</span>
        </div>
        <div>
          <strong>Reason for Flag: </strong>
          <span>Mobile phone detected in candidate's camera frame</span>
        </div>
        <div>
          <strong>Flag Timestamp: </strong>
          <span>11/09/2021, 09:25 AM</span>
        </div>
        <div className="proc-dash-flagged-image-details-btn">
          <Button label={'More Details'} variant={'secondary'} />
        </div>
      </div>
      <div className="proc-dash-flagged-image-actions">
        <Button label={'Disqualify'} variant={'secondary'} />
        <Button label={'Archive'} variant={'secondary'} />
      </div>
    </div>
  );
};

export default FlaggedImageRecord;
