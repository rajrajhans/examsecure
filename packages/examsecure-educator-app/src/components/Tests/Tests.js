import React from 'react';
import ESNavbar from '../nav_bar';
import { Button } from '@examsecure/design-system';
import tests from '../../sampleData/tests';
import SingleTest from './SingleTest';

const Tests = () => {
  return (
    <>
      <ESNavbar />
      <div className="tests-view-container">
        <div className="tests-header">
          <div className="your-tests-cntnr">Your Tests</div>

          <div className="create-new-test-container">
            <Button label={'Create New Test'} variant={'secondary'} />
          </div>
        </div>

        <div className="tests">
          {tests.map((test) => (
            <SingleTest test={test} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Tests;
