import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <div style={{ backgroundColor: 'white' }}>
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} exact render={(props) => <route.component {...props} />} />
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
