import React from 'react';
import './ProctorDashboard.scss';

const ProctorDashboard = () => {
  return (
    <>
      <div className="proc-dash-container">
        <div className="proc-dash-top-bar">
          <div className="proc-dash-top-bar-box">
            <div className="proc-dash-top-bar-box-num">10</div>
            <div className="proc-dash-top-bar-box-desc">
              candidates currently taking the test
            </div>
          </div>

          <div className="proc-dash-top-bar-box">
            <div className="proc-dash-top-bar-box-num">5</div>
            <div className="proc-dash-top-bar-box-desc">
              candidates submitted the test
            </div>
          </div>

          <div className="proc-dash-top-bar-box">
            <div className="proc-dash-top-bar-box-num">4</div>
            <div className="proc-dash-top-bar-box-desc">
              suspicious activities flagged so far
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProctorDashboard;
