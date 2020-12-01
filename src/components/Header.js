import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";

import { retryWrapper } from "../utils";

import RekognitionButton from "./RekognitionButton";

import "../styles/Header.css";
import AddUserModal from "./AddUserModal";

export default ({ addUser, readyToStream, signedIn, toggleRekognition }) => {
  const [authError, setAuthError] = useState(null);
  const [userEmail, setUserEmail] = useState(undefined);

  const reload = () => window.location.reload();

  useEffect(() => {
    if (signedIn) {
      retryWrapper(() => Auth.currentAuthenticatedUser())
        .then((user) => setUserEmail(user.username))
        .catch(setAuthError);
    }
  }, [signedIn]);

  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand>
        <div className="logo">
            TY52 Test App
        </div>
      </Navbar.Brand>
      <Navbar.Toggle />
      {(userEmail || authError) && (
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {authError && (
              <>
                <span className="auth-error">
                  Authentication error: {authError}
                </span>
                <Button variant="link" className="headerLink" onClick={reload}>
                  Retry
                </Button>
              </>
            )}
            {userEmail && (
              <>
                <RekognitionButton
                  onClick={toggleRekognition}
                  enabled={readyToStream}
                />
                <AddUserModal onSave={addUser} />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
};
