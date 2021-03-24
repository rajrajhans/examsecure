const fn = require("./headPoseAnalysisUtils");

function testHeadPoseToEyeGaze() {
  expect(fn.headPoseToEyeGaze(28, -19, 39)).toStrictEqual([28, -11.82, 15.93]);
}

function testHeadPoseInterpretationNormal() {
  // For Normal
  expect(fn.getHeadPoseInterpretation(10, 3, 5)).toStrictEqual("Normal");
}

function testHeadPoseInterpretationRight() {
  // For Right
  expect(
    fn.getHeadPoseInterpretation(
      16.14304542541504,
      5.684819221496582,
      -42.38713073730469
    )
  ).toStrictEqual("Person is facing Right.");
}

function testHeadPoseInterpretationLeft() {
  // For Left
  expect(
    fn.getHeadPoseInterpretation(
      16.14304542541504,
      5.684819221496582,
      42.38713073730469
    )
  ).toStrictEqual("Person is facing Left.");
}

function testHeadPoseInterpretationUp() {
  // For Up
  expect(
    fn.getHeadPoseInterpretation(
      16.14304542541504,
      52.684819221496582,
      -4.38713073730469
    )
  ).toStrictEqual("Person is facing  Up");
}

function testHeadPoseInterpretationLeftUp() {
  // For Left & Up
  expect(fn.getHeadPoseInterpretation(22, 12, 9)).toStrictEqual(
    "Person is facing Left &  Up"
  );
}

function testHeadPoseInterpretationRightUp() {
  // For Right & Up
  expect(
    fn.getHeadPoseInterpretation(
      16.14304542541504,
      15.684819221496582,
      -40.38713073730469
    )
  ).toStrictEqual("Person is facing Right &  Up");
}

test("Checks Head Pose to Eye Gaze conversion", testHeadPoseToEyeGaze);
test(
  "Checks Head Pose Interpretation - Normal",
  testHeadPoseInterpretationNormal
);
test(
  "Checks Head Pose Interpretation - Right",
  testHeadPoseInterpretationRight
);
test("Checks Head Pose Interpretation - Left", testHeadPoseInterpretationLeft);
test("Checks Head Pose Interpretation - Up", testHeadPoseInterpretationUp);
test(
  "Checks Head Pose Interpretation - Left, Up",
  testHeadPoseInterpretationLeftUp
);
test(
  "Checks Head Pose Interpretation - Right, Up",
  testHeadPoseInterpretationRightUp
);
