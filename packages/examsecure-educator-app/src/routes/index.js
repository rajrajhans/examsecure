import Dashboard from '../components/dashboard/Dashboard';
import CreateTest from '../components/create-test/CreateTest';
import ProctorModeWrapper from '../components/proctor-mode/ProctorModeWrapper';

const routes = [
  {
    path: '/',
    component: Dashboard,
    title: 'Dashboard',
  },
  {
    path: '/create-new-test',
    component: CreateTest,
    title: 'Create New Test',
  },
  {
    path: '/proctor-mode',
    component: ProctorModeWrapper,
    title: 'Proctor Mode',
  },
];

export default routes;
