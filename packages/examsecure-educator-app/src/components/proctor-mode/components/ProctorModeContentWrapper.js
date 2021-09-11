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
import { Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router';

const ProctorModeContentWrapper = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <ProctorDashboard />
      </Route>

      <Route path={`${path}/${PROC_MODE_CURRENT_CANDIDATES}`}>
        <CurrentCandidates />
      </Route>

      <Route path={`${path}/${PROC_MODE_CANDIDATES_TEST_TAKEN}`}>
        <TestTakenCandidates />
      </Route>
      <Route path={`${path}/${PROC_MODE_CANDIDATES_TEST_INVITED}`}>
        <InvitedCandidates />
      </Route>
      <Route path={`${path}/${PROC_MODE_CANDIDATES_TEST_DISQUALIFIED}`}>
        <DisqualifiedCandidates />
      </Route>
      <Route path={`${path}/${PROC_MODE_TEST_REPORTS}`}>
        <TestReports />
      </Route>
      <Route path={`${path}/${PROC_MODE_QUESTIONS_ANALYTICS}`}>
        <QuestionsAnalytics />
      </Route>
      <Route path={`${path}/${PROC_MODE_TEST_OVERVIEW}`}>
        <TestOverview />
      </Route>
      <Route path={`${path}/${PROC_MODE_TEST_QUESTIONS}`}>
        <TestQuestions />
      </Route>
      <Route path={`${path}/${PROC_MODE_DASHBOARD}`}>
        <ProctorDashboard />
      </Route>
    </Switch>
  );
};

export default ProctorModeContentWrapper;
