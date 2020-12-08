import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro";
import AnimationRevealPage from "./UIComponentsLibrary/AnimationRevealPage";
import Hero from "./UIComponentsLibrary/Hero";
import Features from "./UIComponentsLibrary/Features";
import FAQ from "./UIComponentsLibrary/FAQ";
import GetStarted from "./UIComponentsLibrary/GetStarted";
import StepsFeature from "./UIComponentsLibrary/StepsFeature"; //eslint-disable-line

const HighlightedText = tw.span`text-primary-500`;

export default () => {
  return (
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
      <FAQ
        heading={
          <>
            Any <HighlightedText>Questions ?</HighlightedText>
          </>
        }
      />
      <GetStarted />
    </AnimationRevealPage>
  );
};
