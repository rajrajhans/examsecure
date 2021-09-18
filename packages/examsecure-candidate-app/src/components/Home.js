import React from 'react';
import tw from 'twin.macro';
import { css } from 'styled-components/macro';
import AnimationRevealPage from './ui-components-library/AnimationRevealPage';
import Hero from './ui-components-library/Hero';
import Features from './ui-components-library/Features';
import FAQ from './ui-components-library/FAQ';
import GetStarted from './ui-components-library/GetStarted';
import StepsFeature from './ui-components-library/StepsFeature';
import FeaturesTwoColSection from './ui-components-library/FeaturesTwoColSection'; //eslint-disable-line
import browserLockdownImg from '../static/browser_lockdown.svg';
import headposepng from '../static/headposeestimation.png';
import aiIllus from '../static/ai_illustration.png';
import educator_interface from '../static/educator_screenshot.png';
import FeaturesTwoColSection2 from './ui-components-library/FeaturesTwoColSection2';
import FeaturesTwoColSection3 from './ui-components-library/FeaturesTwoColSection3';
import { mode } from './helpers/modeSetter';
import FeaturesTwoColSection4 from './ui-components-library/FeaturesTwoColSection4';

const HighlightedText = tw.span`text-primary-500`;

export default () => {
  return (
    <div style={{ margin: '0 20px' }}>
      <AnimationRevealPage>
        <Hero />
        <Features
          heading={
            <>
              <HighlightedText>Features</HighlightedText>
            </>
          }
        />
        <StepsFeature />
        <FeaturesTwoColSection
          textOnLeft={false}
          imageSrc={browserLockdownImg}
        />
        <FeaturesTwoColSection3
          textOnLeft={true}
          heading={'A.I. Powered Proctoring'}
          subheading={
            'Keeps an eye on the candidate using real time image analysis'
          }
          imageSrc={aiIllus}
        />
        <FeaturesTwoColSection2
          textOnLeft={false}
          heading={'Head Pose Estimation'}
          subheading={'Detects loss of attention from the screen'}
          imageSrc={headposepng}
        />
        <FeaturesTwoColSection4
          textOnLeft={true}
          heading={'Feature Rich Educator Interface'}
          subheading={'Realtime Exam Monitoring'}
          imageSrc={educator_interface}
        />
        <FAQ
          heading={
            <>
              Any <HighlightedText>Questions ?</HighlightedText>
            </>
          }
        />
        {mode === 1 ? <GetStarted /> : null}
      </AnimationRevealPage>
    </div>
  );
};
