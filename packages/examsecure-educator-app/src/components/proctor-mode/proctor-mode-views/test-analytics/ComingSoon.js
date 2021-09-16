import { ReactComponent as ComingSoonIllustration } from '../../../../assets/coming_soon.svg';
import React from 'react';

const ComingSoon = () => {
  return (
    <div className="proc-dash-coming-soon">
      <div>
        <ComingSoonIllustration />
        <div>
          <b>We're working on this feature. Please check back soon!</b>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
