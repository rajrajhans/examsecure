import React from 'react';
import './LeftPanel.scss';
import {
  PROC_MODE_CANDIDATES_TEST_DISQUALIFIED,
  PROC_MODE_CANDIDATES_TEST_INVITED,
  PROC_MODE_CANDIDATES_TEST_TAKEN,
  PROC_MODE_CURRENT_CANDIDATES,
  PROC_MODE_DASHBOARD,
  PROC_MODE_QUESTIONS_ANALYTICS,
  PROC_MODE_TEST_OVERVIEW,
  PROC_MODE_TEST_QUESTIONS,
  PROC_MODE_TEST_REPORTS,
} from './constants';

const ProctorModeLeftPanel = ({ currentView, changeCurrentView }) => {
  return (
    <div className="proc-mode-left-panel">
      <div
        className={`proc-mode-left-panel-item ${
          currentView === PROC_MODE_DASHBOARD
            ? 'proc-mode-left-panel-item-active'
            : ''
        }`}
        onClick={() => {
          changeCurrentView(PROC_MODE_DASHBOARD);
        }}
      >
        Proctor Mode
      </div>

      <div className="proc-mode-left-panel-title">Candidates</div>

      <div
        className={`proc-mode-left-panel-item ${
          currentView === PROC_MODE_CURRENT_CANDIDATES
            ? 'proc-mode-left-panel-item-active'
            : ''
        }`}
        onClick={() => {
          changeCurrentView(PROC_MODE_CURRENT_CANDIDATES);
        }}
      >
        Currently Taking (10)
      </div>

      <div
        className={`proc-mode-left-panel-item ${
          currentView === PROC_MODE_CANDIDATES_TEST_TAKEN
            ? 'proc-mode-left-panel-item-active'
            : ''
        }`}
        onClick={() => {
          changeCurrentView(PROC_MODE_CANDIDATES_TEST_TAKEN);
        }}
      >
        Test Taken (5)
      </div>

      <div
        className={`proc-mode-left-panel-item ${
          currentView === PROC_MODE_CANDIDATES_TEST_INVITED
            ? 'proc-mode-left-panel-item-active'
            : ''
        }`}
        onClick={() => {
          changeCurrentView(PROC_MODE_CANDIDATES_TEST_INVITED);
        }}
      >
        Invited (5)
      </div>

      <div
        className={`proc-mode-left-panel-item ${
          currentView === PROC_MODE_CANDIDATES_TEST_DISQUALIFIED
            ? 'proc-mode-left-panel-item-active'
            : ''
        }`}
        onClick={() => {
          changeCurrentView(PROC_MODE_CANDIDATES_TEST_DISQUALIFIED);
        }}
      >
        Disqualified (5)
      </div>

      <div className="proc-mode-left-panel-title">Analytics</div>

      <div
        className={`proc-mode-left-panel-item ${
          currentView === PROC_MODE_TEST_REPORTS
            ? 'proc-mode-left-panel-item-active'
            : ''
        }`}
        onClick={() => {
          changeCurrentView(PROC_MODE_TEST_REPORTS);
        }}
      >
        Test Reports
      </div>

      <div
        className={`proc-mode-left-panel-item ${
          currentView === PROC_MODE_QUESTIONS_ANALYTICS
            ? 'proc-mode-left-panel-item-active'
            : ''
        }`}
        onClick={() => {
          changeCurrentView(PROC_MODE_QUESTIONS_ANALYTICS);
        }}
      >
        Questions Analytics
      </div>

      <div className="proc-mode-left-panel-title">Test Details</div>

      <div
        className={`proc-mode-left-panel-item ${
          currentView === PROC_MODE_TEST_OVERVIEW
            ? 'proc-mode-left-panel-item-active'
            : ''
        }`}
        onClick={() => {
          changeCurrentView(PROC_MODE_TEST_OVERVIEW);
        }}
      >
        Test Overview
      </div>

      <div
        className={`proc-mode-left-panel-item ${
          currentView === PROC_MODE_TEST_QUESTIONS
            ? 'proc-mode-left-panel-item-active'
            : ''
        }`}
        onClick={() => {
          changeCurrentView(PROC_MODE_TEST_QUESTIONS);
        }}
      >
        Questions
      </div>
    </div>
  );
};

export default ProctorModeLeftPanel;
