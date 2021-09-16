import React from 'react';
import { ReactComponent as CopyIcon } from '../../../assets/icons/copy.svg';
import './TopBar.scss';
import moment from 'moment';
import { DATE_TIME_FORMAT } from '../../../utils/constants';

const TestTimeDisplay = ({ datetime, type }) => {
  if (!datetime) {
    return null;
  }

  const test_datetime = moment(datetime, DATE_TIME_FORMAT);
  const isNowBeforeTestDate = moment().isBefore(test_datetime);
  let text = '';

  if (type === 'start') {
    text = isNowBeforeTestDate ? 'Will start at ' : 'Started at';
  } else {
    text = isNowBeforeTestDate ? 'Will end at ' : 'Ended at';
  }

  return <>{`${text} ${datetime}`}</>;
};

const ProctorModeTopBar = ({ test }) => {
  return (
    <div className="proc-mode-top-bar">
      <div className="proc-mode-top-bar-test-name" title={test?.test_name}>
        {test ? (
          <>{`${
            test.test_name.length <= 15
              ? test.test_name
              : test.test_name
                  .substring(0, 54)
                  .split(' ')
                  .slice(0, -1)
                  .join(' ') + '...'
          }`}</>
        ) : (
          'Loading...'
        )}
      </div>
      <div className="proc-mode-top-bar-test-details">
        <div>Ongoing</div>
        <div>|</div>
        <div className="copy-link">
          <CopyIcon /> Test Link
        </div>
        <div>|</div>
        <div>
          <TestTimeDisplay datetime={test?.test_starts_at} type={'start'} />
        </div>
        <div>|</div>
        <div>
          <TestTimeDisplay datetime={test?.test_ends_at} type={'end'} />
        </div>
      </div>
    </div>
  );
};

export default ProctorModeTopBar;
