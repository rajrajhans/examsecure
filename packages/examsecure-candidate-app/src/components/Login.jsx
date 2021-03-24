import React, { useEffect } from "react";
import { AmplifyAuthenticator, AmplifySignIn } from "@aws-amplify/ui-react";
import { onAuthUIStateChange } from "@aws-amplify/ui-components";
import Amplify, { Auth } from "aws-amplify";
import Card from "react-bootstrap/Card";
import { pageview } from "react-ga";

const settings = window.rekognitionSettings || {};
const region = settings.region || "eu-west-1";

Amplify.configure({
  Auth: {
    identityPoolId: settings.cognitoIdentityPool,
    region,
    mandatorySignIn: true,
    userPoolId: settings.cognitoUserPoolId,
    userPoolWebClientId: settings.cognitoUserPoolClientId,
  },
  API: {
    endpoints: [
      {
        name: "apiGateway",
        endpoint: settings.apiGateway,
        region,
        custom_header: async () => {
          const session = await Auth.currentSession();
          const token = session.getIdToken().getJwtToken();
          return { Authorization: `Bearer ${token}` };
        },
      },
    ],
  },
});

const Login = ({ isSignedIn, authState, setAuthState, loadForSeconds }) => {
  useEffect(() => {
    loadForSeconds();
    pageview(window.location.pathname + window.location.search);
    return onAuthUIStateChange((s) => setAuthState(s));
  }, []);

  return (
    <>
      {isSignedIn ? (
        <>{window.history.back()}</>
      ) : (
        <div className="amplify-auth-container">
          <div style={{ minHeight: "463px" }}>
            <AmplifyAuthenticator usernameAlias="email">
              <AmplifySignIn
                slot="sign-in"
                usernameAlias="email"
                headerText="Sign In to ExamSecure"
                formFields={[
                  {
                    type: "username",
                    label: "Username",
                    placeholder: "Enter your username",
                    required: true,
                    inputProps: { autoComplete: "off" },
                  },
                  {
                    type: "password",
                    label: "Password",
                    placeholder: "Enter your password",
                    required: true,
                    inputProps: { autoComplete: "off" },
                  },
                ]}
              >
                <div slot="secondary-footer-content"></div>
              </AmplifySignIn>
            </AmplifyAuthenticator>
          </div>
          <Card style={{ maxWidth: "500px", margin: "20px auto" }}>
            <Card.Body>
              <div>
                Note: Currently, we are only allowing full access to our beta to
                selected Educators and Candidates. If you are a visitor and want
                a quick demo of the platform, please use the following
                credentials:
              </div>
              <pre>
                Username: test
                <br />
                Password: test1234
              </pre>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default Login;
