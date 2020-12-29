import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "./Headings.js";
import { SectionDescription } from "./Typography.js";
import { Container, ContentWithPaddingXl } from "./Layouts.js";
import { ReactComponent as ChevronDownIcon } from "feather-icons/dist/icons/chevron-down.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "../../static/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../../static/svg-decorator-blob-8.svg";

const Subheading = tw(SubheadingBase)`mb-4 text-center`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center`;

const Column = tw.div`flex flex-col items-center`;
const HeaderContent = tw.div``;

const FAQSContainer = tw.dl`mt-12 max-w-4xl relative`;
const FAQ = tw.div`cursor-pointer select-none mt-5 px-8 sm:px-10 py-5 sm:py-4 rounded-lg text-gray-800 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 transition duration-300`;
const Question = tw.dt`flex justify-between items-center`;
const QuestionText = tw.span`text-lg lg:text-xl font-semibold`;
const QuestionToggleIcon = motion.custom(styled.span`
  ${tw`ml-2 transition duration-300`}
  svg {
    ${tw`w-6 h-6`}
  }
`);
const Answer = motion.custom(
  tw.dd`pointer-events-none text-sm sm:text-base leading-relaxed`
);

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none absolute right-0 top-0 h-56 w-56 opacity-15 transform translate-x-2/3 -translate-y-12 text-teal-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none absolute left-0 bottom-0 h-64 w-64 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

export default ({
  faqs = [
    {
      question: "What is a proctored exam?",
      answer:
        "A proctored exam refers to a digital assessment using AI-powered monitoring software to invigilate the test-taker. It involves using video feed from test-taker's camera to avoid any objectionable instances. A proctored exam allows students to take their exams remotely, including their homes, provided it is a complacent environment.",
    },
    {
      question: "What are the advantages of online proctoring?",
      answer: (
        <>
          During the Covid pandemic, Online Examinations have become a
          necessity. However, there is always a question on the integrity of
          exam conducted online, since it is relatively easy for the candidates
          to cheat. This is where Online Proctoring comes into picture.
          Automated Online Proctoring makes it possible to ensure the integrity
          of the exams without any need for constant human intervention. It
          makes sure that the authenticity of exam remains valid by preventing
          candidates from using unfair means.
        </>
      ),
    },
    {
      question: "How does ExamSecure work?",
      answer:
        "ExamSecure uses Amazon Rekognition service to analyze images in real time and detect any objectionable content in the candidate's camera frames to spot malpractice. ExamSecure also uses Head Pose Estimation to determine whether the candidate is staring away from the screen for long periods of time and triggers a warning if so. Furthermore, during an exam, ExamSecure completely locks down the candidate's browser, triggering a warning if the candidate tries to switch tabs/windows or exit full screen mode. Copying of text is also disabled in the exam environment.",
    },
    {
      question: "What is Head Pose Estimation?",
      answer:
        "Head Pose Estimation involves predicting the pose of a human head in an image in terms of the three Euler Anglers - Yaw, Pitch and Roll. These three values are used to describe the rotation of an object in 3D space. Using Rekognition, ExamSecure is able to determine in which direction the human head is facing using these values. To see this in action, check out our free image analysis demo page.",
    },
    {
      question: "Is ExamSecure scalable for my needs?",
      answer:
        "ExamSecure uses AWS Services like Serverless Lambda Functions and API Gateway for processing, Cognito for Authentication, Rekognition for Image Analysis, CloudFront and S3 for hosting, which makes it easily scalable to any amount of load.",
    },
    {
      question: "How can I use ExamSecure for my needs?",
      answer:
        "Currently, ExamSecure is a Work In Progress and is used for a specific usecase. The code, however, is open source, so you are free to customize and deploy it for your specific needs.",
    },
  ],
}) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

  const toggleQuestion = (questionIndex) => {
    if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
    else setActiveQuestionIndex(questionIndex);
  };

  return (
    <Container>
      <ContentWithPaddingXl>
        <Column>
          <HeaderContent>
            <Heading>FAQs</Heading>
            <Description>Frequently Asked Questions</Description>
          </HeaderContent>
          <FAQSContainer>
            {faqs.map((faq, index) => (
              <FAQ
                key={index}
                onClick={() => {
                  toggleQuestion(index);
                }}
                className="group"
              >
                <Question>
                  <QuestionText>{faq.question}</QuestionText>
                  <QuestionToggleIcon
                    variants={{
                      collapsed: { rotate: 0 },
                      open: { rotate: -180 },
                    }}
                    initial="collapsed"
                    animate={
                      activeQuestionIndex === index ? "open" : "collapsed"
                    }
                    transition={{
                      duration: 0.02,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    <ChevronDownIcon />
                  </QuestionToggleIcon>
                </Question>
                <Answer
                  variants={{
                    open: { opacity: 1, height: "auto", marginTop: "16px" },
                    collapsed: { opacity: 0, height: 0, marginTop: "0px" },
                  }}
                  initial="collapsed"
                  animate={activeQuestionIndex === index ? "open" : "collapsed"}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  {faq.answer}
                </Answer>
              </FAQ>
            ))}
          </FAQSContainer>
        </Column>
      </ContentWithPaddingXl>
      <DecoratorBlob1 style={{ zIndex: "1" }} />
      <DecoratorBlob2 style={{ zIndex: "1" }} />
    </Container>
  );
};
