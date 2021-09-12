import React from 'react';
import { Title } from '@examsecure/design-system';
import OverviewPane from '../../create-test/overview-pane/OverviewPane';

const TestOverview = () => {
  return (
    <div>
      <Title value={'Test Overview'} />
      <OverviewPane />
    </div>
  );
};

export default TestOverview;
