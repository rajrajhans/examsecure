import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, ...rest }) => {
  const auth = useSelector((state) => state.firebase.auth);

  return (
    <Route
      {...rest}
      render={() => (auth.uid ? children : <Redirect to={'/sign-in'} />)}
    />
  );
};

export default PrivateRoute;
