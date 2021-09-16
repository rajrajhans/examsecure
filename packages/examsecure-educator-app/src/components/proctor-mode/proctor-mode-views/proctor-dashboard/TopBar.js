import React from 'react';
import LoadingSpinner from '../../../helpers/LoadingSpinner';

const Box = ({ num, text, isLoading }) => (
  <div className="proc-dash-top-bar-box">
    <div className="proc-dash-top-bar-box-num">
      {isLoading ? (
        <div className="proc-dash-top-bar-loading">
          <LoadingSpinner />
        </div>
      ) : (
        <>{num}</>
      )}
    </div>
    <div className="proc-dash-top-bar-box-desc">{text}</div>
  </div>
);

const TopBar = ({ test }) => {
  return (
    <div className="proc-dash-top-bar">
      <Box
        isLoading={!test}
        num={10}
        text={'candidates currently taking the test'}
      />
      <Box
        isLoading={!test}
        num={5}
        text={'candidates have submitted the test'}
      />
      <Box
        isLoading={!test}
        num={4}
        text={'suspicious activities flagged so far'}
      />
    </div>
  );
};

export default TopBar;
