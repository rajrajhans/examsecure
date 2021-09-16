import React from 'react';
import { Title } from '@examsecure/design-system';
import OverviewPane from '../../../create-test/overview-pane/OverviewPane';
import withTestState from './withTestState';
import LoadingSpinner from '../../../helpers/LoadingSpinner';

const TestOverview = ({
  testDetailsInput,
  handleTestDetailsInputChange,
  handleTestDateTimeChange,
  test,
}) => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Title value={'Test Overview'} />
        {!test && (
          <div>
            <LoadingSpinner />
          </div>
        )}
      </div>
      <OverviewPane
        testDetailsInput={testDetailsInput}
        handleTestDetailsInputChange={handleTestDetailsInputChange}
        handleTestDateTimeChange={handleTestDateTimeChange}
        isProcMode={true}
      />
    </div>
  );
};

export default withTestState(TestOverview);
