import React from 'react';
import { Button, Title } from '@examsecure/design-system';
import '../styles/Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className={'dash-wrapper'}>
      <div className="dash-top-bar">
        <Title value={'Your Tests'} />
        <Link to={'/create-new-test'}>
          <Button label={'Create New Test'} variant={'secondary'} />
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
