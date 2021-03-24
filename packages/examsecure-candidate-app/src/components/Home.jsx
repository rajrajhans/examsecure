import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro";
import AnimationRevealPage from "./UIComponentsLibrary/AnimationRevealPage";
import Hero from "./UIComponentsLibrary/Hero";
import Features from "./UIComponentsLibrary/Features";
import FAQ from "./UIComponentsLibrary/FAQ";
import GetStarted from "./UIComponentsLibrary/GetStarted";
import StepsFeature from "./UIComponentsLibrary/StepsFeature";
import FeaturesTwoColSection from "./UIComponentsLibrary/FeaturesTwoColSection"; //eslint-disable-line
import browserLockdownImg from "../static/browser_lockdown.svg";
import headposepng from "../static/headposeestimation.png";
import aiIllus from "../static/ai_illustration.png";
import FeaturesTwoColSection2 from "./UIComponentsLibrary/FeaturesTwoColSection2";
import FeaturesTwoColSection3 from "./UIComponentsLibrary/FeaturesTwoColSection3";
import { mode } from "./helpers/modeSetter";

const HighlightedText = tw.span`text-primary-500`;

export default () => {
  return (
    <div style={{ margin: "0 20px" }}>
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
          heading={"A.I. Powered Proctoring"}
          subheading={
            "Keeps an eye on the candidate using real time image analysis"
          }
          imageSrc={aiIllus}
        />
        <FeaturesTwoColSection2
          textOnLeft={false}
          heading={"Head Pose Estimation"}
          subheading={"Detects loss of attention from the screen"}
          imageSrc={headposepng}
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
