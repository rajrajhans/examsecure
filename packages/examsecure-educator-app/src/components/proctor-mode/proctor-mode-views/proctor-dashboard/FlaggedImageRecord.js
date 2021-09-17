import React from 'react';
import { Button } from '@examsecure/design-system';

// todo: show more details modal when user clicks on the image as well

const FlaggedImageRecord = ({
  archived,
  toggleDetailsModal,
  toggleDisqualifyModal,
  record,
  setDetailsFlagRecord,
}) => {
  const handleModalClick = () => {
    toggleDetailsModal();
    setDetailsFlagRecord(record.id);
  };
  return (
    <div className="proc-dash-flagged-image-record">
      <div className="proc-dash-flagged-image-src">
        <img src={record?.imageURL} alt={'flagged image'} />
      </div>
      <div className="proc-dash-flagged-image-details">
        <div>
          <strong>Candidate Name: </strong>
          <span>{record?.candidate_name}</span>
        </div>
        <div>
          <strong>Reason for Flag: </strong>
          <span>{record?.reason}</span>
        </div>

        <div className="proc-dash-flagged-image-details-btn">
          <Button
            label={'More Details'}
            variant={'secondary'}
            onClick={handleModalClick}
          />
        </div>
      </div>

      <div className="proc-dash-flagged-image-actions">
        {!archived && (
          <>
            <Button
              label={'Disqualify'}
              variant={'secondary'}
              onClick={toggleDisqualifyModal}
            />
            <Button label={'Archive'} variant={'secondary'} />
          </>
        )}
      </div>
    </div>
  );
};

export default FlaggedImageRecord;
