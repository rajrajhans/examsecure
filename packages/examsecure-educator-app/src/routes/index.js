import Dashboard from '../components/dashboard/Dashboard';
import CreateTest from '../components/create-test/CreateTest';
import ProctorModeWrapper from '../components/proctor-mode/ProctorModeWrapper';

const routes = [
  {
    path: '/',
    component: Dashboard,
    title: 'Dashboard',
    exact: true,
  },
  {
    path: '/create-new-test',
    component: CreateTest,
    title: 'Create New Test',
    exact: false,
  },
  {
    path: '/proctor-mode',
    component: ProctorModeWrapper,
    title: 'Proctor Mode',
    exact: false,
  },
];

export default routes;
