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
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.png';

const ProctorModeLeftPanel = ({ testID }) => {
  const { url } = useRouteMatch();
  const { pathname } = useLocation();

  const generateLink = (path) => `${url}/${path}?test=${testID}`;
  const generateClassName = (path) =>
    `proc-mode-left-panel-item ${
      pathname.endsWith(path) ? 'proc-mode-left-panel-item-active' : ''
    }`;

  return (
    <>
      <div className="proc-mode-left-panel-logo">
        <img alt={'examsecure'} src={logo} width={40} />
      </div>
      <div className="proc-mode-left-panel">
        <Link to={generateLink(PROC_MODE_DASHBOARD)}>
          <div className={generateClassName(PROC_MODE_DASHBOARD)}>
            Proctor Mode
          </div>
        </Link>

        <div className="proc-mode-left-panel-title">Candidates</div>

        <Link to={generateLink(PROC_MODE_CURRENT_CANDIDATES)}>
          <div className={generateClassName(PROC_MODE_CURRENT_CANDIDATES)}>
            Currently Taking
          </div>
        </Link>

        <Link to={generateLink(PROC_MODE_CANDIDATES_TEST_TAKEN)}>
          <div className={generateClassName(PROC_MODE_CANDIDATES_TEST_TAKEN)}>
            Test Taken
          </div>
        </Link>

        <Link to={generateLink(PROC_MODE_CANDIDATES_TEST_INVITED)}>
          <div className={generateClassName(PROC_MODE_CANDIDATES_TEST_INVITED)}>
            Invited
          </div>
        </Link>

        <Link to={generateLink(PROC_MODE_CANDIDATES_TEST_DISQUALIFIED)}>
          <div
            className={generateClassName(
              PROC_MODE_CANDIDATES_TEST_DISQUALIFIED,
            )}
          >
            Disqualified
          </div>
        </Link>

        <div className="proc-mode-left-panel-title">Analytics</div>

        <Link to={generateLink(PROC_MODE_TEST_REPORTS)}>
          <div className={generateClassName(PROC_MODE_TEST_REPORTS)}>
            Test Analytics
          </div>
        </Link>

        <Link to={generateLink(PROC_MODE_QUESTIONS_ANALYTICS)}>
          <div className={generateClassName(PROC_MODE_QUESTIONS_ANALYTICS)}>
            Questions Analytics
          </div>
        </Link>

        <div className="proc-mode-left-panel-title">Test Details</div>

        <Link to={generateLink(PROC_MODE_TEST_OVERVIEW)}>
          <div className={generateClassName(PROC_MODE_TEST_OVERVIEW)}>
            Test Overview
          </div>
        </Link>

        <Link to={generateLink(PROC_MODE_TEST_QUESTIONS)}>
          <div className={generateClassName(PROC_MODE_TEST_QUESTIONS)}>
            Questions
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProctorModeLeftPanel;
