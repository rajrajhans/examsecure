import React, { useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect, firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import ESNavbar from "../nav_bar";
import { Link } from "react-router-dom";
import { Button, Carousel, Col, Container, Row, Table } from "react-bootstrap";
import { getHeadPoseInterpretation } from "./utility_functions";
import {
  disqualifyUser,
  verifyUser,
  addDisqualifiedUsers,
  wrongTriggers,
} from "../../actions/proctor_actions";

const ImageDetail = (props) => {
  //const id = props.match.params.id;
  //console.log(props);
  const testnumber = props.match.params.testnumber;
  const username = props.match.params.id;
  const { data, auth } = props;
  //console.log(data)
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    //console.log(selectedIndex,e);
    setIndex(selectedIndex);
  };
  const imageArray = [];
  if (!data) return <Redirect to="/proctorpage" />;
  Object.keys(data).forEach((image) => {
    imageArray.push(data[image]);
  });

  const deleteTriggerRecord = () => {
    props.wrongTriggers({
      testnumber: testnumber,
      username: username,
      images: imageArray,
    });
    props.verifyUser({ username: props.name, testnumber: testnumber });
    return <Redirect to="/proctorpage" />;
  };

  const disqualifyStudent = () => {
    //console.log(props.triggeredUsers)
    props.addDisqualifiedUsers({
      testnumber: testnumber,
      username: username,
      images: imageArray,
    });
    props.disqualifyUser({ username: username, testnumber: testnumber });
    return <Redirect to="/proctorpage" />;
  };

  const nextIcon = (
    <span
      aria-hidden="true"
      className="carousel-control-next-icon"
      style={{ backgroundColor: "grey" }}
    ></span>
  );
  const prevIcon = (
    <span
      aria-hidden="true"
      className="carousel-control-prev-icon"
      style={{ backgroundColor: "grey" }}
    ></span>
  );
  const ControlledCarousel = () => {
    return (
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={null}
        nextIcon={nextIcon}
        prevIcon={prevIcon}
        style={{ color: "black" }}
      >
        {imageArray &&
          imageArray.map((data) => {
            //console.log(data);
            return (
              <Carousel.Item>
                <div className="" style={{ padding: 20, margin: 20 }}>
                  <img
                    className="d-block carousel img-fluid"
                    src={data.imageURL}
                    style={{
                      borderRadius: 30,
                      padding: 10,
                      width: 500,
                      height: 300,
                    }}
                    alt="triggered-user-examsecure"
                  />
                </div>
                {/* <Carousel.Caption>
                          <div className="carousel-caption">
                              <p>{data.reason}</p>
                          </div>
                      </Carousel.Caption> */}
              </Carousel.Item>
            );
          })}
      </Carousel>
    );
  };
  const testRes = imageArray[index].testRes;
  //console.log(testRes)
  //console.log(props.history.goBack)
  if (!auth.uid) return <Redirect to="/signin" />;
  if (data) {
    return (
      <>
        <div>
          <ESNavbar />

          <Container>
            <h2 style={{ fontWeight: "bold" }}> Image Analysis </h2>
            <div>
              <p>
                ExamSecure is able to detect many attributes from the camera
                image capture using the power of AWS Rekognition. This image was
                flagged by AWS Rekognition. In detail analysis for the same is
                given below. The proctor is requested to verify the student
                activity or else disqualify from the exam.
                <br />
                <br />
              </p>
            </div>
            <Row>
              <Col xs={12} md={6}>
                <ControlledCarousel />
                {testRes[3].Success ? (
                  <div
                    className={"container"}
                    style={{
                      margin: "20px auto 30px auto",
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: "bold", marginRight: 5 }}>
                        Reason:
                      </span>
                      <span>{imageArray[index].reason}</span>
                      <h3>Head Pose Analysis</h3>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Analysis Parameter</th>
                            <th>Analysis Result</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Roll</td>
                            <td>
                              {testRes
                                ? testRes[3].MoreDetails[0].Pose
                                  ? testRes[3].MoreDetails[0].Pose.Roll
                                  : "No Face Detected"
                                : "No Image Detected"}
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Pitch</td>
                            <td>
                              {testRes
                                ? testRes[3].MoreDetails[0].Pose
                                  ? testRes[3].MoreDetails[0].Pose.Pitch
                                  : "No Face Detected"
                                : "No Image Detected"}
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Yaw</td>
                            <td>
                              {testRes
                                ? testRes[3].MoreDetails[0].Pose
                                  ? testRes[3].MoreDetails[0].Pose.Yaw
                                  : "No Face Detected"
                                : "No Image Detected"}
                            </td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Interpretation</td>
                            <td>
                              {testRes ? (
                                testRes[3].MoreDetails[0] ? (
                                  <b>
                                    {getHeadPoseInterpretation(
                                      testRes[3].MoreDetails[0].Pose.Roll,
                                      testRes[3].MoreDetails[0].Pose.Pitch,
                                      testRes[3].MoreDetails[0].Pose.Yaw
                                    )}
                                  </b>
                                ) : (
                                  "No Face Detected"
                                )
                              ) : (
                                "No Image Detected"
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                ) : null}
              </Col>
              <Col xs={12} md={6}>
                <div className="demoTestResults">
                  <h3 style={{ padding: 5 }}>Results of Image Analysis</h3>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Analysis Description</th>
                        <th>Analysis Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Number of Faces Detected</td>
                        <td>{testRes ? testRes[3].Details : "-"}</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Was Person Recognised</td>
                        <td>
                          {testRes ? (
                            <>
                              {testRes[2].Success
                                ? `Yes. Identity: ${testRes[2].Details}`
                                : "No"}
                            </>
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Multiple Persons Warning</td>
                        <td>
                          {testRes ? (
                            <>
                              {testRes[3].Details > 1 ? (
                                <b>Multiple Persons Detected!</b>
                              ) : (
                                "No"
                              )}
                            </>
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>No Face in Frame Warning</td>
                        <td>
                          {testRes ? (
                            <>
                              {testRes[3].Details === 0 ? (
                                <b>Cannot detect any face!</b>
                              ) : (
                                "No"
                              )}
                            </>
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>Violating object in sight Warning</td>
                        <td>
                          {testRes ? (
                            <>
                              {testRes[0].Success === false
                                ? `Yes. ${testRes[0].Details}`
                                : "No"}
                            </>
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={"3"}>
                          <i>
                            Predicted attributes of the most prominent face
                            detected -
                          </i>
                        </td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>Predicted Age Range</td>
                        <td>
                          {testRes[3].Success ? (
                            testRes[3].MoreDetails[0] ? (
                              <>
                                {testRes[3].MoreDetails[0].AgeRange.Low} -{" "}
                                {testRes[3].MoreDetails[0].AgeRange.High}
                              </>
                            ) : (
                              "-"
                            )
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>7</td>
                        <td>Predicted Gender</td>
                        <td>
                          {testRes[3].Success ? (
                            testRes[3].MoreDetails[0] ? (
                              <>{testRes[3].MoreDetails[0].Gender.Value}</>
                            ) : (
                              "-"
                            )
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>9</td>
                        <td>Eyewear</td>
                        <td>
                          {testRes[3].Success ? (
                            testRes[3].MoreDetails[0] ? (
                              <>
                                {testRes[3].MoreDetails[0].Eyeglasses.Value ||
                                testRes[3].MoreDetails[0].Sunglasses.Value
                                  ? "Yes"
                                  : "No"}
                              </>
                            ) : (
                              "-"
                            )
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>10</td>
                        <td>Facial Expression - Smile</td>
                        <td>
                          {testRes[3].Success ? (
                            testRes[3].MoreDetails[0] ? (
                              <>
                                {testRes[3].MoreDetails[0].Smile.Value
                                  ? "Yes"
                                  : "No"}
                              </>
                            ) : (
                              "-"
                            )
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>11</td>
                        <td>Facial Expression - Eyes Open?</td>
                        <td>
                          {testRes[3].Success ? (
                            testRes[3].MoreDetails[0] ? (
                              <>
                                {testRes[3].MoreDetails[0].EyesOpen.Value
                                  ? "Yes"
                                  : "No"}
                              </>
                            ) : (
                              "-"
                            )
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td>12</td>
                        <td>Facial Expression - Mouth Open?</td>
                        <td>
                          {testRes[3].Success ? (
                            testRes[3].MoreDetails[0] ? (
                              <>
                                {testRes[3].MoreDetails[0].MouthOpen.Value
                                  ? "Yes"
                                  : "No"}
                              </>
                            ) : (
                              "-"
                            )
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td>13</td>
                        <td>Predicted Prominent Emotion</td>
                        <td>
                          {testRes[3].Success ? (
                            testRes[3].MoreDetails[0] ? (
                              <>
                                {testRes[3].MoreDetails[0].Emotions[0].Type} -{" "}
                                {Math.floor(
                                  testRes[3].MoreDetails[0].Emotions[0]
                                    .Confidence
                                )}
                                %
                              </>
                            ) : (
                              "-"
                            )
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </Container>

          {/* <p>Page Id: </p> */}
        </div>
        <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
          <div>
            <a
              className="btn btn-outline-success"
              onClick={deleteTriggerRecord}
            >
              Verify
            </a>
            <a
              className="btn btn-outline-success disqualify"
              onClick={disqualifyStudent}
            >
              Disqualify
            </a>
          </div>
          {/* <Link to='/proctorpage2' className="btn btn-outline-success navigation-button">Go Back</Link> */}
          <button
            className="btn btn-outline-success navigation-button"
            onClick={props.history.goBack}
          >
            Go Back
          </button>
        </div>
      </>
    );
  } else {
    return (
      <div>
        <h1>Data Not Found!</h1>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    disqualifyUser: (disqualifyUsers) =>
      dispatch(disqualifyUser(disqualifyUsers)),
    verifyUser: (verifyUsers) => dispatch(verifyUser(verifyUsers)),
    addDisqualifiedUsers: (disqualifyUsers) =>
      dispatch(addDisqualifiedUsers(disqualifyUsers)),
    wrongTriggers: (wrongTrigger) => dispatch(wrongTriggers(wrongTrigger)),
  };
};

const mapStateToProps = (state, ownProps) => {
  //console.log(state);
  //console.log(ownProps)
  const testnumber = ownProps.match.params.testnumber;
  const id = ownProps.match.params.id;
  const flaggedData = state.firestore.data.flaggedData;
  const fData = flaggedData ? flaggedData[id] : null;
  const triggeredUser = state.firebase.data.triggeredUsers;
  const tData = triggeredUser
    ? triggeredUser[testnumber]
      ? triggeredUser[testnumber][id]
      : null
    : null;
  //console.log(tData)
  return {
    olddata: fData,
    auth: state.firebase.auth,
    data: tData,
    id: id,
    testnumber: testnumber,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "flaggedData" }]),
  firebaseConnect(["triggeredUsers"])
)(ImageDetail);
