import Dashboard from '../components/dashboard/Dashboard';
import CreateTest from '../components/create-test/CreateTest';
import ProctorMode from '../components/proctor-mode/ProctorMode';

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
    component: ProctorMode,
    title: 'Proctor Mode',
  },
];

export default routes;
