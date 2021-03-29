import React from 'react';
import ReactDOM from 'react-dom';
import TextInput from './components/TextInput/TextInput';

// This file is for debugging components while development. Use `yarn start-cra` to start the dev server

ReactDOM.render(
  <TextInput
    label={'click here'}
    onChange={(t) => {
      console.log('changed ', t);
    }}
    onBlur={(t) => {
      console.log('blurred ', t);
    }}
    iconLeft={'User'}
  />,
  document.getElementById('root'),
);
