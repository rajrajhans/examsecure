import React from 'react';
import './ProctorMode.scss';
import ProctorModeSelectTest from './ProctorModeSelectTest';
import useQuery from '../../utils/useQuery';
import TestProctorMode from './TestProctorMode';

const ProctorMode = () => {
  const query = useQuery();
  const testID = query.get('test');

  if (testID) {
    return <TestProctorMode testID={testID} />;
  } else {
    return <ProctorModeSelectTest />;
  }
};

export default ProctorMode;
