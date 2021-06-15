import React from 'react';
import ESNavbar from '../nav_bar';
import { Button } from '@examsecure/design-system';
import tests from '../../sampleData/tests';
import SingleTest from './SingleTest';
import '../../styles/Tests.css';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const Tests = () => {
  return (
    <>
      <ESNavbar />
      <Container className="tests-view-container">
        <div className="tests-header">
          <div className="your-tests-cntnr">
            <h2>Your Tests</h2>
          </div>

          <div className="create-new-test-container">
            <Link to={'/add-questions'}>
              <Button label={'Create New Test'} variant={'secondary'} />
            </Link>
          </div>
        </div>

        <div className="tests">
          {tests.map((test) => (
            <SingleTest test={test} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Tests;
