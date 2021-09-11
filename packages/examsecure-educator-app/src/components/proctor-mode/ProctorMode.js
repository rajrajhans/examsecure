import React from 'react';
import TopBar from './components/TopBar';
import LeftPanel from './components/LeftPanel';
import ProctorModeContentWrapper from './components/ProctorModeContentWrapper';

const ProctorMode = ({ testID }) => {
  return (
    <>
      <TopBar />
      <div className="proc-mode-content-container">
        <LeftPanel testID={testID} />
        <div className="proc-mode-content">
          <ProctorModeContentWrapper />
        </div>
      </div>
    </>
  );
};

export default ProctorMode;
