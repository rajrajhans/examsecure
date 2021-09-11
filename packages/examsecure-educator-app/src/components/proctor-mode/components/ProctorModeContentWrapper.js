import React from 'react';
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
import CurrentCandidates from '../proctor-mode-views/CurrentCandidates';
import TestTakenCandidates from '../proctor-mode-views/TestTakenCandidates';
import InvitedCandidates from '../proctor-mode-views/InvitedCandidates';
import DisqualifiedCandidates from '../proctor-mode-views/DisqualifiedCandidates';
import TestReports from '../proctor-mode-views/TestReports';
import QuestionsAnalytics from '../proctor-mode-views/QuestionsAnalytics';
import TestOverview from '../proctor-mode-views/TestOverview';
import TestQuestions from '../proctor-mode-views/TestQuestions';
import ProctorDashboard from '../proctor-mode-views/ProctorDashboard';

const ProctorModeContentWrapper = ({ currentView }) => {
  if (currentView === PROC_MODE_CURRENT_CANDIDATES) {
    return <CurrentCandidates />;
  } else if (currentView === PROC_MODE_CANDIDATES_TEST_TAKEN) {
    return <TestTakenCandidates />;
  } else if (currentView === PROC_MODE_CANDIDATES_TEST_INVITED) {
    return <InvitedCandidates />;
  } else if (currentView === PROC_MODE_CANDIDATES_TEST_DISQUALIFIED) {
    return <DisqualifiedCandidates />;
  } else if (currentView === PROC_MODE_TEST_REPORTS) {
    return <TestReports />;
  } else if (currentView === PROC_MODE_QUESTIONS_ANALYTICS) {
    return <QuestionsAnalytics />;
  } else if (currentView === PROC_MODE_TEST_OVERVIEW) {
    return <TestOverview />;
  } else if (currentView === PROC_MODE_TEST_QUESTIONS) {
    return <TestQuestions />;
  } else if (currentView === PROC_MODE_DASHBOARD) {
    return <ProctorDashboard />;
  } else {
    return <ProctorDashboard />;
  }
};

export default ProctorModeContentWrapper;
