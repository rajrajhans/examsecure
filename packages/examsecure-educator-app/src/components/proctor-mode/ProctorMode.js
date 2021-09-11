import React, { useState } from 'react';
import TopBar from './components/TopBar';
import LeftPanel from './components/LeftPanel';
import ProctorModeContentWrapper from './components/ProctorModeContentWrapper';
import { useHistory } from 'react-router-dom';

const ProctorMode = ({ testID, view }) => {
  const [currentView, setCurrentView] = useState(view);
  const history = useHistory();

  const changeCurrentView = (newView) => {
    history.push({
      pathname: '/proctor-mode',
      search: `?test=${testID}&view=${newView}`,
    });
    setCurrentView(newView);
  };

  return (
    <>
      <TopBar />
      <div className="proc-mode-content-container">
        <LeftPanel
          currentView={currentView}
          changeCurrentView={changeCurrentView}
        />
        <div className="proc-mode-content">
          <ProctorModeContentWrapper currentView={currentView} />
        </div>
      </div>
    </>
  );
};

export default ProctorMode;
