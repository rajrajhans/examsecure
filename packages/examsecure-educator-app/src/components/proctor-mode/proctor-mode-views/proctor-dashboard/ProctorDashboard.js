import React, { useEffect, useState } from 'react';
import './ProctorDashboard.scss';
import TopBar from './TopBar';
import { Title } from '@examsecure/design-system';
import FlaggedImageRecord from './FlaggedImageRecord';
import DetailsModal from './DetailsModal';
import DisqualifyModal from './DisqualifyModal';
import LoadingSpinner from '../../../helpers/LoadingSpinner';

const ProctorDashboard = ({ test }) => {
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [detailsFlagRecord, setDetailsFlagRecord] = useState(undefined);
  const [isDisqualifyModalVisible, setIsDisqualifyModalVisible] = useState(
    false,
  );
  const [flaggedImages, setFlaggedImages] = useState([]);

  useEffect(() => {
    if (test) {
      setFlaggedImages(
        Object.entries(test.flagged_candidates)
          .map(([k, v]) =>
            Object.entries(v).map(([key, val]) => {
              val.candidate_name = test?.candidates[k].candidateName;
              val.id = key;
              return val;
            }),
          )
          .flat(),
      );
    }
  }, [test]);

  const toggleDetailsModal = () => {
    setIsDetailsModalVisible((prevState) => !prevState);
  };

  const toggleDisqualifyModal = () => {
    setIsDisqualifyModalVisible((prevState) => !prevState);
  };

  return (
    <>
      <div className="proc-dash-container">
        <TopBar test={test} />

        <div className="proc-dash-flagged-images">
          <Title value={'Flagged Images'} />
          <div className="proc-dash-flagged-images-text">
            Any images flagged as suspicious by the system will show up here,
            along with the relevant details. You can choose to disqualify the
            candidate, or archive the log. If you choose to disqualify the
            candidate, their test will be automatically submitted and they will
            be logged out. Click on "<strong>More Details</strong>" to view in
            depth image analysis report.
          </div>

          {!test ? (
            <div className="loading-spinner">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {flaggedImages.map((record) => (
                <FlaggedImageRecord
                  key={record.id}
                  record={record}
                  archived={false}
                  toggleDetailsModal={toggleDetailsModal}
                  toggleDisqualifyModal={toggleDisqualifyModal}
                  setDetailsFlagRecord={setDetailsFlagRecord}
                />
              ))}

              <div className="proc-dash-flagged-images">
                <Title value={'Flagged Images (Archived)'} />
                {[14, 235, 623].map((i) => (
                  <FlaggedImageRecord
                    key={i}
                    archived={true}
                    toggleDetailsModal={toggleDetailsModal}
                    toggleDisqualifyModal={toggleDisqualifyModal}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <DetailsModal
        onModalHide={toggleDetailsModal}
        show={isDetailsModalVisible}
        detailsFlagRecord={detailsFlagRecord}
        flaggedImages={flaggedImages}
      />

      <DisqualifyModal
        onModalHide={toggleDisqualifyModal}
        show={isDisqualifyModalVisible}
      />
    </>
  );
};

export default ProctorDashboard;
