import React from 'react';
import './ProctorMode.scss';
import ProctorModeTestSelector from './ProctorModeTestSelector';
import useQuery from '../../utils/useQuery';
import ProctorMode from './ProctorMode';

const ProctorModeLanding = () => {
  const query = useQuery();
  const testID = query.get('test');

  if (testID) {
    return <ProctorMode testID={testID} />;
  } else {
    return <ProctorModeTestSelector />;
  }
};

export default ProctorModeLanding;
