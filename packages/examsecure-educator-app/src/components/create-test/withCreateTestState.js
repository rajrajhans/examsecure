import React from 'react';
import useForm from '../../utils/useForm';

const initialTestDetails = {
  test_name: '',
  test_duration: 0,
  test_starts_at: '',
  test_ends_at: '',
};

const withCreateTestState = (Component) => (props) => {
  const [
    testDetailsInput,
    handleTestDetailsInputChange,
    handleTestDateTimeChange,
  ] = useForm(initialTestDetails);

  console.log(testDetailsInput);

  return (
    <Component
      {...props}
      testDetailsInput={testDetailsInput}
      handleTestDetailsInputChange={handleTestDetailsInputChange}
      handleTestDateTimeChange={handleTestDateTimeChange}
    />
  );
};

export default withCreateTestState;
