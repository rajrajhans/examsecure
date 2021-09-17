import React, { useState } from 'react';
import SignIn from '../auth/SignIn';
import { Auth } from 'aws-amplify';

const PrivateRoute = (props) => {
  const [isCurrentSession, setIsCurrentSession] = useState(false);

  let { component: Comp, ...propxs } = props;
  Auth.currentSession()
    .then((data) => {
      setIsCurrentSession(true);
    })
    .catch((e) => {
      console.log(e);
    });

  return (
    <>
      {isCurrentSession ? (
        <Comp {...propxs} />
      ) : (
        <SignIn isSignedIn={props.isSignedIn} {...propxs} />
      )}
    </>
  );
};

export default PrivateRoute;
