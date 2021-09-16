import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'tailwindcss/dist/base.css';
import { css } from 'styled-components/macro';
import './styles/bootstrapthemes.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import ReactGA from 'react-ga';
import Amplify, { Auth } from 'aws-amplify';

ReactGA.initialize('UA-186141570-1');
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

const settings = window.rekognitionSettings || {};
const region = settings.region || 'eu-west-1';

Amplify.configure({
  Auth: {
    identityPoolId: settings.cognitoIdentityPool,
    region,
    mandatorySignIn: false,
    userPoolId: settings.cognitoUserPoolId,
    userPoolWebClientId: settings.cognitoUserPoolClientId,
  },
  API: {
    endpoints: [
      {
        name: 'apiGateway',
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
