import React, { useState } from 'react';
import { Button, Title } from '@examsecure/design-system';
import OverviewPane from './OverviewPane';
import QuestionsPane from './QuestionsPane';

const CreateTest = () => {
  const [currentView, setCurrentView] = useState(); // 0 for overview, 1 for questions view

  const changeView = (i) => {
    setCurrentView(i);
  };

  return (
    <div className={'dash-wrapper'}>
      <Title value={'Create New Test'} />

      <div className="dash-ct-bar">
        <div className="dash-ct-bar-left">
          <div className="dash-ct-bar-btn">
            <button
              onClick={() => {
                changeView(0);
              }}
              className={currentView === 0 ? 'dash-ct-bar-btn-active' : null}
            >
              Overview
            </button>
          </div>
          <div className="dash-ct-bar-btn">
            <button
              onClick={() => {
                changeView(1);
              }}
              className={currentView === 1 ? 'dash-ct-bar-btn-active' : null}
            >
              Questions
            </button>
          </div>
        </div>
        <Button label={'Publish'} variant={'secondary'} />
      </div>

      <div className="dash-ct-content">
        {currentView === 0 ? (
          <>
            <OverviewPane />
          </>
        ) : (
          <>
            <QuestionsPane />
          </>
        )}
      </div>
    </div>
  );
};

export default CreateTest;
