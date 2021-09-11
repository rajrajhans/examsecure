import React from 'react';
import TopBar from './components/TopBar';
import LeftPanel from './components/LeftPanel';

const ProctorMode = ({ testID }) => {
  return (
    <>
      <TopBar />

      <div className="proc-mode-content-container">
        <LeftPanel />
        <div className="proc-mode-content">All the other content hereeee</div>
      </div>
    </>
  );
};

export default ProctorMode;
