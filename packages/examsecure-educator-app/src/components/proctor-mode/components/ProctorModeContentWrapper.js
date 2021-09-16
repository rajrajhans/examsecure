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
import TestReports from '../proctor-mode-views/test-analytics/TestReports';
import QuestionsAnalytics from '../proctor-mode-views/test-analytics/QuestionsAnalytics';
import TestOverview from '../proctor-mode-views/test-details/TestOverview';
import TestQuestions from '../proctor-mode-views/test-details/TestQuestions';
import ProctorDashboard from '../proctor-mode-views/proctor-dashboard/ProctorDashboard';
import { Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router';

const ProctorModeContentWrapper = ({ test }) => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <ProctorDashboard test={test} />
      </Route>

      <Route path={`${path}/${PROC_MODE_CURRENT_CANDIDATES}`}>
        <CurrentCandidates test={test} />
      </Route>

      <Route path={`${path}/${PROC_MODE_CANDIDATES_TEST_TAKEN}`}>
        <TestTakenCandidates test={test} />
      </Route>
      <Route path={`${path}/${PROC_MODE_CANDIDATES_TEST_INVITED}`}>
        <InvitedCandidates test={test} />
      </Route>
      <Route path={`${path}/${PROC_MODE_CANDIDATES_TEST_DISQUALIFIED}`}>
        <DisqualifiedCandidates test={test} />
      </Route>
      <Route path={`${path}/${PROC_MODE_TEST_REPORTS}`}>
        <TestReports test={test} />
      </Route>
      <Route path={`${path}/${PROC_MODE_QUESTIONS_ANALYTICS}`}>
        <QuestionsAnalytics test={test} />
      </Route>
      <Route path={`${path}/${PROC_MODE_TEST_OVERVIEW}`}>
        <TestOverview test={test} />
      </Route>
      <Route path={`${path}/${PROC_MODE_TEST_QUESTIONS}`}>
        <TestQuestions test={test} />
      </Route>
      <Route path={`${path}/${PROC_MODE_DASHBOARD}`}>
        <ProctorDashboard test={test} />
      </Route>
    </Switch>
  );
};

export default ProctorModeContentWrapper;
