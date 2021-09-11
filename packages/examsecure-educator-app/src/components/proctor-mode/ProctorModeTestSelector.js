import React from 'react';
import { Button, Title } from '@examsecure/design-system';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const ProctorModeTestSelector = () => {
  const router = useHistory();

  const handleGoToDashboard = () => {
    router.push('/proctor-mode?test=123123');
  };

  return (
    <div>
      <div className="proc-dash-wrapper">
        <div className="proc-dash-top-bar">
          <Title value={'Proctor Dashboard'} />
        </div>

        <div className="proc-test-selector-container">
          <h3>Select Test</h3>
          <div style={{ marginBottom: '1rem', color: '#868181' }}>
            Please select a test to proceed
          </div>
          <div className="proc-test-selector">
            <Form.Group>
              <Form.Control as={'select'}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((id) => (
                  <option value={'test1'} key={id}>
                    Test {id}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
          <Button
            label={'Go to Proctor Dashboard'}
            variant={'secondary'}
            onClick={handleGoToDashboard}
          />
        </div>
      </div>
    </div>
  );
};

export default ProctorModeTestSelector;
