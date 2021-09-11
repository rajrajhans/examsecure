import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import PrivateRoute from './components/helpers/PrivateRoute';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <PrivateRoute key={index} path={route.path} exact={route.exact}>
            <Layout>
              <route.component />
            </Layout>
          </PrivateRoute>
        ))}
        <Route path={'/sign-in'}>
          <Layout>
            <SignIn />
          </Layout>
        </Route>

        <Route path={'/sign-up'}>
          <Layout>
            <SignUp />
          </Layout>
        </Route>
        <Route path={'*'}>
          <Layout>
            <NotFound />
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

const NotFound = () => (
  <div style={{ padding: '20px' }}>
    <h3>404 Not Found. Please check the path and try again</h3>
  </div>
);
