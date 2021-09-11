import Dashboard from '../components/dashboard/Dashboard';
import CreateTest from '../components/create-test/CreateTest';

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
];

export default routes;
