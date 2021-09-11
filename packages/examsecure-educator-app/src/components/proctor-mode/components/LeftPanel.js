import React from 'react';
import './LeftPanel.scss';

const ProctorModeLeftPanel = () => {
  return (
    <div className="proc-mode-left-panel">
      <div className="proc-mode-left-panel-item">Proctor Mode</div>

      <div className="proc-mode-left-panel-title">Candidates</div>

      <div className="proc-mode-left-panel-item">Currently Taking (10)</div>

      <div className="proc-mode-left-panel-item">Test Taken (5)</div>

      <div className="proc-mode-left-panel-item">Invited (5)</div>

      <div className="proc-mode-left-panel-item">Disqualified (5)</div>

      <div className="proc-mode-left-panel-title">Analytics</div>

      <div className="proc-mode-left-panel-item">Test Reports</div>

      <div className="proc-mode-left-panel-item">Questions Analytics</div>

      <div className="proc-mode-left-panel-title">Test Details</div>

      <div className="proc-mode-left-panel-item">Test Overview</div>

      <div className="proc-mode-left-panel-item">Questions</div>
    </div>
  );
};

export default ProctorModeLeftPanel;
