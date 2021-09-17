import React from 'react';
import { Button, Title } from '@examsecure/design-system';
import './Dashboard.scss';
import { Link } from 'react-router-dom';
import SingleTestView from './SingleTestView';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../helpers/LoadingSpinner';

const Dashboard = () => {
  const uid = useSelector((state) => state.firebase.auth.uid);
  useFirebaseConnect(() => [{ path: `tests/${uid}` }]);
  const testsWrapper = useSelector((state) => state.firebase.data.tests);
  const tests = testsWrapper && testsWrapper[uid];

  return (
    <div className={'dash-wrapper'}>
      <div className="dash-top-bar">
        <Title value={'Your Tests'} />
        <Link to={'/create-new-test'}>
          <Button label={'Create New Test'} variant={'secondary'} />
        </Link>
      </div>

      {tests === null ? (
        <div className="loading-spinner">No Tests Created yet</div>
      ) : (
        <>
          {!tests ? (
            <div className="loading-spinner">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="dash-tests-container">
              {Object.entries(tests)?.map(([id, test]) => (
                <SingleTestView key={id} test={test} id={id} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
