import React from 'react';
import useForm from '../../utils/useForm';

const withCreateTestState = (Component) => (props) => {
  const [testDetailsInput, handleTestDetailsInputChange] = useForm();

  return <Component {...props} />;
};

export default withCreateTestState;
