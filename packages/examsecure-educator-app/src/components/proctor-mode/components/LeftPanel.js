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
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

const ProctorModeLeftPanel = ({ testID }) => {
  const { url } = useRouteMatch();

  const generateLink = (path) => `${url}/${path}?test=${testID}`;

  return (
    <div className="proc-mode-left-panel">
      <Link to={generateLink(PROC_MODE_DASHBOARD)}>
        <div className={`proc-mode-left-panel-item`}>Proctor Mode</div>
      </Link>

      <div className="proc-mode-left-panel-title">Candidates</div>

      <Link to={generateLink(PROC_MODE_CURRENT_CANDIDATES)}>
        <div className={`proc-mode-left-panel-item`}>Currently Taking (10)</div>
      </Link>

      <Link to={generateLink(PROC_MODE_CANDIDATES_TEST_TAKEN)}>
        <div className={`proc-mode-left-panel-item`}>Test Taken (5)</div>
      </Link>

      <Link to={generateLink(PROC_MODE_CANDIDATES_TEST_INVITED)}>
        <div className={`proc-mode-left-panel-item`}>Invited (5)</div>
      </Link>

      <Link to={generateLink(PROC_MODE_CANDIDATES_TEST_DISQUALIFIED)}>
        <div className={`proc-mode-left-panel-item`}>Disqualified (5)</div>
      </Link>

      <div className="proc-mode-left-panel-title">Analytics</div>

      <Link to={generateLink(PROC_MODE_TEST_REPORTS)}>
        <div className={`proc-mode-left-panel-item`}>Test Reports</div>
      </Link>

      <Link to={generateLink(PROC_MODE_QUESTIONS_ANALYTICS)}>
        <div className={`proc-mode-left-panel-item`}>Questions Analytics</div>
      </Link>

      <div className="proc-mode-left-panel-title">Test Details</div>

      <Link to={generateLink(PROC_MODE_TEST_OVERVIEW)}>
        <div className={`proc-mode-left-panel-item`}>Test Overview</div>
      </Link>

      <Link to={generateLink(PROC_MODE_TEST_QUESTIONS)}>
        <div className={`proc-mode-left-panel-item`}>Questions</div>
      </Link>
    </div>
  );
};

export default ProctorModeLeftPanel;
