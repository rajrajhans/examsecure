import React from 'react';
import TopBar from './components/TopBar';
import LeftPanel from './components/LeftPanel';
import ProctorModeContentWrapper from './components/ProctorModeContentWrapper';
import { useSelector } from 'react-redux';
import { useFirebaseConnect } from 'react-redux-firebase';

const ProctorMode = ({ testID }) => {
  const uid = useSelector((state) => state.firebase.auth.uid);
  useFirebaseConnect(() => [{ path: `tests/${uid}/${testID}` }]);
  const test = useSelector(
    (state) => state.firebase.data.tests?.[uid]?.[testID],
  );

  return (
    <>
      <TopBar test={test} />
      <div className="proc-mode-content-container">
        <LeftPanel testID={testID} />
        <div className="proc-mode-content">
          <ProctorModeContentWrapper test={test} />
        </div>
      </div>
    </>
  );
};

export default ProctorMode;
