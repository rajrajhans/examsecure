import React from 'react';
import { ReactComponent as CopyIcon } from '../../../assets/icons/copy.svg';
import './TopBar.scss';

const ProctorModeTopBar = () => {
  return (
    <div className="proc-mode-top-bar">
      <div className="proc-mode-top-bar-test-name">Compiler Design Test</div>
      <div className="proc-mode-top-bar-test-details">
        <div>Ongoing</div>
        <div>|</div>
        <div className="copy-link">
          <CopyIcon /> Test Link
        </div>
        <div>|</div>
        <div>Started at 11/09/21 06:09 AM</div>
        <div>|</div>
        <div>Ends at 11/09/21 04:20 PM</div>
      </div>
    </div>
  );
};

export default ProctorModeTopBar;
