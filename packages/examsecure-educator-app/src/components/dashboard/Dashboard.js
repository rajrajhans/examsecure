import React from 'react';
import { Button, Title } from '@examsecure/design-system';
import './Dashboard.scss';
import { Link } from 'react-router-dom';
import SingleTestView from './SingleTestView';

const Dashboard = () => {
  return (
    <div className={'dash-wrapper'}>
      <div className="dash-top-bar">
        <Title value={'Your Tests'} />
        <Link to={'/create-new-test'}>
          <Button label={'Create New Test'} variant={'secondary'} />
        </Link>
      </div>

      <div className="dash-tests-container">
        {[1, 2, 3, 4].map((test) => (
          <SingleTestView />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
