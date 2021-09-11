import React, { useState } from 'react';
import TopBar from './components/TopBar';
import LeftPanel from './components/LeftPanel';
import ProctorModeContentWrapper from './components/ProctorModeContentWrapper';

const ProctorMode = ({ testID, view }) => {
  const [currentView, setCurrentView] = useState(view);

  const changeCurrentView = (newView) => {
    setCurrentView(newView);
  };

  return (
    <>
      <TopBar />
      <div className="proc-mode-content-container">
        <LeftPanel changeCurrentView={changeCurrentView} />
        <div className="proc-mode-content">
          <ProctorModeContentWrapper currentView={currentView} />
        </div>
      </div>
    </>
  );
};

export default ProctorMode;
