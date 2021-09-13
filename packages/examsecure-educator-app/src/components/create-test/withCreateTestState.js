import React from 'react';
import useForm from '../../utils/useForm';

const initialTestDetails = {
  test_name: '',
  test_duration: 0,
  test_starts_at: '',
  test_ends_at: '',
};

const withCreateTestState = (Component) => (props) => {
  const [testDetailsInput, handleTestDetailsInputChange] = useForm(
    initialTestDetails,
  );

  console.log(testDetailsInput);

  return (
    <Component
      {...props}
      testDetailsInput={testDetailsInput}
      handleTestDetailsInputChange={handleTestDetailsInputChange}
    />
  );
};

export default withCreateTestState;
