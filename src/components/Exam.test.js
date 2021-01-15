import React from "react";
import renderer from "react-test-renderer";
import Exam from "./Exam";

describe("Loading Component", () => {
  const props = {
    questionsData: {
      questionSetID: 1,
      questions: [
        {
          answer: "q12",
          id: "q1",
          opts: [
            {
              optID: "q11",
              optText: "Struck by an errant crossbow shot",
            },
            {
              optID: "q12",
              optText: "Poisoned at his own wedding feast",
            },
            {
              optID: "q13",
              optText: "Thrown from the walls of the Red Keep",
            },
            {
              optID: "q14",
              optText: "Stabbed by a horde of small children",
            },
            {
              optID: "q15",
              optText: "Shaggydog",
            },
          ],
          question: "How did Joffrey die?",
        },
        {
          answer: "q21",
          id: "q2",
          opts: [
            {
              optID: "q21",
              optText: "Loras Tyrell",
            },
            {
              optID: "q22",
              optText: "Joffrey Baratheon",
            },
            {
              optID: "q23",
              optText: "Tyrion Lannister",
            },
            {
              optID: "q24",
              optText: "Ramsay Bolton",
            },
          ],
          question:
            "Which of the following was Sansa never married or engaged to?",
        },
      ],
    },
    loadForSeconds: () => {
      console.log("loadForSeconds called");
    },
    currentUser: "rajrajhans",
  };

  it("renders correctly", () => {
    const tree = renderer.create(<Exam {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
