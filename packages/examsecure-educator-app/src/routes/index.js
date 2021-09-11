import Dashboard from '../components/dashboard/Dashboard';
import CreateTest from '../components/create-test/CreateTest';
import ProctorModeLanding from '../components/proctor-mode/ProctorModeLanding';

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
    component: ProctorModeLanding,
    title: 'Proctor Mode',
  },
];

export default routes;
