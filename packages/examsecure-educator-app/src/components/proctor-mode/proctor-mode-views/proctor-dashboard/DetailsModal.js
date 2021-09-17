import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button as ESButton } from '@examsecure/design-system';
import './ModalStyles.scss';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { getHeadPoseInterpretation } from '../../../../utils/headPoseAnalysisUtils';
import Alert from 'react-bootstrap/Alert';

const DetailsModal = ({
  show,
  onModalHide,
  detailsFlagRecord,
  flaggedImages,
}) => {
  const [currentRecord] =
    flaggedImages &&
    flaggedImages.filter((record) => record?.id === detailsFlagRecord);

  const testRes = currentRecord?.testRes;
  console.log({ testRes });

  return (
    <Modal show={show} onHide={onModalHide} size={'xl'} className="proc-modal">
      <Modal.Header closeButton>
        <Modal.Title>Flagged Image Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {currentRecord && testRes && (
          <>
            <Container>
              <Row>
                <Col xs={12} md={6}>
                  <img src={currentRecord.imageURL} alt={'examsecure'} />
                  <div
                    className={'container'}
                    style={{
                      margin: '20px auto 30px auto',
                    }}
                  >
                    <>
                      {testRes ? (
                        <div>
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
                                  {testRes[3]['MoreDetails']?.[0]
                                    ? testRes[3]['MoreDetails']?.[0]['Pose']
                                        .Roll
                                    : 'No Face Detected'}
                                </td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>Pitch</td>
                                <td>
                                  {testRes[3]['MoreDetails']?.[0]
                                    ? testRes[3]['MoreDetails']?.[0]['Pose']
                                        .Pitch
                                    : 'No Face Detected'}
                                </td>
                              </tr>
                              <tr>
                                <td>3</td>
                                <td>Yaw</td>
                                <td>
                                  {testRes[3]['MoreDetails']?.[0]
                                    ? testRes[3]['MoreDetails']?.[0]['Pose'].Yaw
                                    : 'No Face Detected'}
                                </td>
                              </tr>
                              <tr>
                                <td>4</td>
                                <td>Interpretation</td>
                                <td>
                                  {testRes[3]['MoreDetails']?.[0] ? (
                                    <b>
                                      {getHeadPoseInterpretation(
                                        testRes[3]['MoreDetails']?.[0]['Pose']
                                          .Roll,
                                        testRes[3]['MoreDetails']?.[0]['Pose']
                                          .Pitch,
                                        testRes[3]['MoreDetails']?.[0]['Pose']
                                          .Yaw,
                                      )}
                                    </b>
                                  ) : (
                                    'No Face Detected'
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      ) : null}
                    </>
                    )}
                  </div>
                </Col>
                <Col xs={12} md={6}>
                  <div className="demoTestResults">
                    {testRes ? (
                      <>
                        <h3>Results of Image Analysis</h3>
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
                              <td>{testRes ? testRes[3]['Details'] : '-'}</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Was Person Recognised</td>
                              <td>
                                {testRes ? (
                                  <>
                                    {testRes[2]['Success']
                                      ? `Yes. Identity: ${testRes[2]['Details']}`
                                      : 'No'}
                                  </>
                                ) : (
                                  '-'
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>Multiple Persons Warning</td>
                              <td>
                                {testRes ? (
                                  <>
                                    {testRes[3]['Details'] > 1 ? (
                                      <b>Multiple Persons Detected!</b>
                                    ) : (
                                      'No'
                                    )}
                                  </>
                                ) : (
                                  '-'
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>No Face in Frame Warning</td>
                              <td>
                                {testRes ? (
                                  <>
                                    {testRes[3]['Details'] === 0 ? (
                                      <b>Cannot detect any face!</b>
                                    ) : (
                                      'No'
                                    )}
                                  </>
                                ) : (
                                  '-'
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>5</td>
                              <td>Violating object in sight Warning</td>
                              <td>
                                {testRes ? (
                                  <>
                                    {testRes[0]['Success'] === false
                                      ? `Yes. ${testRes[0]['Details']}`
                                      : 'No'}
                                  </>
                                ) : (
                                  '-'
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={'3'}>
                                <i>
                                  Predicted attributes of the most prominent
                                  face detected -
                                </i>
                              </td>
                            </tr>
                            <tr>
                              <td>6</td>
                              <td>Predicted Age Range</td>
                              <td>
                                {testRes[3]['MoreDetails']?.[0] ? (
                                  <>
                                    {
                                      testRes[3]['MoreDetails']?.[0]['AgeRange']
                                        .Low
                                    }{' '}
                                    -{' '}
                                    {
                                      testRes[3]['MoreDetails']?.[0]['AgeRange']
                                        .High
                                    }
                                  </>
                                ) : (
                                  '-'
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>7</td>
                              <td>Predicted Gender</td>
                              <td>
                                {testRes[3]['MoreDetails']?.[0] ? (
                                  <>
                                    {
                                      testRes[3]['MoreDetails']?.[0]['Gender']
                                        .Value
                                    }
                                  </>
                                ) : (
                                  '-'
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>9</td>
                              <td>Eyewear</td>
                              <td>
                                {testRes[3]['MoreDetails']?.[0] ? (
                                  <>
                                    {testRes[3]['MoreDetails']?.[0][
                                      'Eyeglasses'
                                    ].Value ||
                                    testRes[3]['MoreDetails']?.[0]['Sunglasses']
                                      .Value
                                      ? 'Yes'
                                      : 'No'}
                                  </>
                                ) : (
                                  '-'
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>10</td>
                              <td>Facial Expression - Smile</td>
                              <td>
                                {testRes[3]['MoreDetails']?.[0] ? (
                                  <>
                                    {testRes[3]['MoreDetails']?.[0]['Smile']
                                      .Value
                                      ? 'Yes'
                                      : 'No'}
                                  </>
                                ) : (
                                  '-'
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>11</td>
                              <td>Facial Expression - Eyes Open?</td>
                              <td>
                                {testRes[3]['MoreDetails']?.[0] ? (
                                  <>
                                    {testRes[3]['MoreDetails']?.[0]['EyesOpen']
                                      .Value
                                      ? 'Yes'
                                      : 'No'}
                                  </>
                                ) : (
                                  '-'
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td>12</td>
                              <td>Facial Expression - Mouth Open?</td>
                              <td>
                                {testRes[3]['MoreDetails']?.[0] ? (
                                  <>
                                    {testRes[3]['MoreDetails']?.[0]['MouthOpen']
                                      .Value
                                      ? 'Yes'
                                      : 'No'}
                                  </>
                                ) : (
                                  '-'
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td>13</td>
                              <td>Predicted Prominent Emotion</td>
                              <td>
                                {testRes[3]['MoreDetails']?.[0] ? (
                                  <>
                                    {
                                      testRes[3]['MoreDetails']?.[0][
                                        'Emotions'
                                      ][0]['Type']
                                    }{' '}
                                    -{' '}
                                    {Math.floor(
                                      testRes[3]['MoreDetails']?.[0][
                                        'Emotions'
                                      ][0]['Confidence'],
                                    )}
                                    %
                                  </>
                                ) : (
                                  '-'
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </>
                    ) : (
                      <>
                        <>
                          <Alert
                            variant={'warning'}
                            width={'500px'}
                            className={'instructionsBox'}
                          >
                            <Alert.Heading className={'instrHeading'}>
                              Please allow required permissions to continue
                            </Alert.Heading>
                            <ul className={'instructionsBoxList'}>
                              <li>
                                When prompted, you need to click <i>Allow</i> to
                                use the application with your webcam.
                              </li>
                              <li>
                                If you don't see the dialog, try{' '}
                                <a href={window.location}>
                                  opening the application
                                </a>{' '}
                                in a new incognito window, or review your webcam
                                settings on your browser.
                              </li>
                              <li>
                                We recommend using the latest version of{' '}
                                <b>Google Chrome</b> for a hassle-free
                                experience.
                              </li>
                            </ul>
                          </Alert>
                        </>
                      </>
                    )}
                  </div>
                </Col>
              </Row>
            </Container>
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <ESButton variant="secondary" onClick={onModalHide} label={'Back'} />
      </Modal.Footer>
    </Modal>
  );
};

export default DetailsModal;
