import React from 'react';
import './ProctorDashboard.scss';
import TopBar from './TopBar';
import { Title } from '@examsecure/design-system';
import FlaggedImageRecord from './FlaggedImageRecord';

const ProctorDashboard = () => {
  return (
    <>
      <div className="proc-dash-container">
        <TopBar />

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

          {[1, 2, 3, 4, 5, 6].map((i) => (
            <FlaggedImageRecord key={i} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProctorDashboard;
