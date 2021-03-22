import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import { SectionHeading, Subheading as SubheadingBase } from "./Headings.js";
import { SectionDescription } from "./Typography.js";

import { ReactComponent as SvgDecoratorBlob3 } from "../../static/svg-decorator-blob-3.svg";

import headIcon from "../../static/headIcon.png";
import personIcon from "../../static/personDetection.png";
import aiIcon from "../../static/aiIcon.png";
import shieldIcon from "../../static/shieldIcon.png";
import bandwidthIcon from "../../static/bandwidthIcon.png";
import forkIcon from "../../static/forkIcon.png";

const Container = tw.div`relative`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-lg mx-auto py-20 md:py-24`}
`;
const Subheading = tw(SubheadingBase)`mb-4`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center`;

const VerticalSpacer = tw.div`mt-10 w-full`;

const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/3 max-w-sm`}
`;

const Card = styled.div`
  ${tw`flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left h-full mx-4 px-2 py-8`}
  .imageContainer {
    ${tw`border text-center rounded-full p-5 flex-shrink-0`}
  }

  .textContainer {
    ${tw`sm:ml-4 mt-4 sm:mt-2`}
  }

  .title {
    ${tw`mt-4 tracking-wide font-bold text-2xl leading-none`}
  }

  .description {
    ${tw`mt-1 sm:mt-4 font-medium text-secondary-100 leading-loose`}
  }
`;

const DecoratorBlob = styled(SvgDecoratorBlob3)`
  ${tw`pointer-events-none absolute right-0 bottom-0 w-64 opacity-25 transform translate-x-32 translate-y-48 `}
`;

export default ({
  cards = null,
  heading = "Features",
  description = "ExamSecure's wide array of features help deter candidates from cheating and resorting to any malpractice and protects the integrity of examinations. ",
}) => {
  const defaultCards = [
    {
      imageSrc: aiIcon,
      title: "Face Detection & Analysis",
    },
    { imageSrc: personIcon, title: "Impersonation Detection" },
    { imageSrc: headIcon, title: "Head Pose Estimation" },
    { imageSrc: shieldIcon, title: "Complete Browser Lockdown" },
    { imageSrc: bandwidthIcon, title: "Low Bandwidth Requirement" },
    { imageSrc: forkIcon, title: "Open Source and Customizable" },
  ];

  if (!cards) cards = defaultCards;

  return (
    <Container>
      <ThreeColumnContainer className={"FeaturesContainer"}>
        <Heading>{heading}</Heading>
        {description && <Description>{description}</Description>}
        <VerticalSpacer />
        {cards.map((card, i) => (
          <Column key={i}>
            <Card className={"homeFeatureCard"}>
              <span className="imageContainer">
                <img
                  style={{ width: "2.1rem", height: "2.1rem" }}
                  src={card.imageSrc || shieldIcon}
                  alt=""
                />
              </span>
              <span className="textContainer">
                <span className="title">{card.title || "Fully Secure"}</span>
              </span>
            </Card>
          </Column>
        ))}
      </ThreeColumnContainer>
      <DecoratorBlob />
    </Container>
  );
};
