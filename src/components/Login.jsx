import React, {useEffect} from 'react';
import {AmplifyAuthenticator, AmplifySignIn} from "@aws-amplify/ui-react";
import {onAuthUIStateChange} from "@aws-amplify/ui-components";
import Amplify, {Auth} from "aws-amplify";
import Layout from "./Layout";

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
                    return {Authorization: `Bearer ${token}`};
                },
            },
        ],
    },
});

const Login = ({authState, setAuthState}) => {

    useEffect(() => {
        return onAuthUIStateChange((s) => setAuthState(s));
    }, []);

    return (
        <Layout>
            <div className="amplify-auth-container">
                <AmplifyAuthenticator usernameAlias="email">
                    <AmplifySignIn
                        slot="sign-in"
                        usernameAlias="email"
                        headerText="Sign In to ExamSecure"
                        formFields={[
                            {
                                type: "email",
                                label: "Username",
                                placeholder: "Enter your username",
                                required: true,
                                inputProps: {autoComplete: "off"},
                            },
                            {
                                type: "password",
                                label: "Password",
                                placeholder: "Enter your password",
                                required: true,
                                inputProps: {autoComplete: "off"},
                            },
                        ]}
                    >
                        <div slot="secondary-footer-content"></div>
                    </AmplifySignIn>
                </AmplifyAuthenticator>
            </div>
        </Layout>
    );
};

export default Login;
