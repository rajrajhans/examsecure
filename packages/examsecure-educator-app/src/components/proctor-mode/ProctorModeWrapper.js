import React from 'react';
import './ProctorMode.scss';
import ProctorModeTestSelector from './ProctorModeTestSelector';
import useQuery from '../../utils/useQuery';
import ProctorMode from './ProctorMode';

const ProctorModeWrapper = () => {
  const query = useQuery();
  const testID = query.get('test');
  const view = query.get('view');

  if (testID) {
    return <ProctorMode testID={testID} view={view} />;
  } else {
    return <ProctorModeTestSelector />;
  }
};

export default ProctorModeWrapper;
