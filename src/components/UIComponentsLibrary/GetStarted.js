import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as SvgDecoratorBlob1 } from "../../static/svg-decorator-blob-9.svg";
import { ContentWithPaddingXl, Container } from "./Layouts";
import githubicon from "../../static/github.svg";
import reacticon from "../../static/react.svg";

const PrimaryBackgroundContainer = tw.div`py-16 lg:py-20 bg-blue-200 rounded-lg relative`;
const Row = tw.div`px-4 sm:px-16 mx-auto flex justify-center items-center relative z-10 flex-col lg:flex-row text-center lg:text-left`;

const ColumnContainer = tw.div`lg:w-1/2 max-w-lg`;
const TextContainer = tw(ColumnContainer)`text-2xl sm:text-4xl font-bold`;
const Subheading = tw.h6`text-primary-500 opacity-75`;
const Heading = tw.h5`text-primary-500`;

const LinksContainer = tw(
  ColumnContainer
)`flex justify-center lg:justify-end mt-6 lg:mt-0 flex-col sm:flex-row`;

const Link = tw.a`w-full sm:w-auto text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 mt-4 first:mt-0 sm:mt-0 sm:mr-8 sm:last:mr-0 rounded font-bold border border-transparent tracking-wide transition duration-300 focus:outline-none focus:shadow-outline`;
const PrimaryLink = tw(
  Link
)`shadow text-gray-100 hocus:text-gray-300 bg-primary-500 hocus:bg-primary-700`;

const SecondaryLink = tw(
  Link
)`text-primary-500 hover:text-primary-600 bg-gray-100 hover:bg-gray-200`;

const DecoratorBlobContainer = tw.div`absolute inset-0 overflow-hidden rounded-lg`;
const DecoratorBlob1 = tw(
  SvgDecoratorBlob1
)`absolute bottom-0 left-0 w-80 h-80 transform -translate-x-20 translate-y-32 text-primary-500 opacity-5`;
const DecoratorBlob2 = tw(
  SvgDecoratorBlob1
)`absolute top-0 right-0 w-80 h-80 transform  translate-x-20 -translate-y-64 text-primary-500 opacity-5`;
export default ({
  subheading = "ExamSecure is currently a Work In Progress",
  secondaryLinkText = "View Source Code",
  secondaryLinkUrl = "http://github.com/rajrajhans/examsecure",
  pushDownFooter = true,
}) => {
  return (
    <Container css={pushDownFooter && tw`mb-20 lg:mb-24`}>
      <ContentWithPaddingXl>
        <PrimaryBackgroundContainer>
          <Row>
            <TextContainer>
              {subheading && <Subheading>{subheading}</Subheading>}
              <Heading
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "27px",
                }}
              >
                <span>ExamSecure is developed using ReactJS</span>
                <img
                  src={reacticon}
                  className={"buttoniconreact"}
                  alt={"github"}
                />
              </Heading>
            </TextContainer>
            <LinksContainer>
              <SecondaryLink
                href={secondaryLinkUrl}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img src={githubicon} className={"buttonicon"} alt={"github"} />
                {secondaryLinkText}
              </SecondaryLink>
            </LinksContainer>
          </Row>
          <DecoratorBlobContainer>
            <DecoratorBlob1 />
            <DecoratorBlob2 />
          </DecoratorBlobContainer>
        </PrimaryBackgroundContainer>
      </ContentWithPaddingXl>
    </Container>
  );
};
