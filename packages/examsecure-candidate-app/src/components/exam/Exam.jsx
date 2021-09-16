import React, { useEffect, useRef, useState } from 'react';
import Timer from '../helpers/Timer';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import '../../styles/exam.css';
import Webcam from 'react-webcam';
import gateway from '../../utils/gateway';
import signOut from '../../utils/signOut';
import ExamWarningModal from '../helpers/ExamWarningModal';
import { mode } from '../helpers/modeSetter';
import useAnswerResponse from '../helpers/useAnswerResponse';
import { pageview } from 'react-ga';

const Exam = ({ loadForSeconds, currentUser, testData }) => {
  const [isWebCamReady, setisWebcamReady] = useState(false);
  const [warning, setWarning] = useState({
    title: '',
    text: '',
    isWarningModalActive: false,
  });
  console.log({ testData });
  // const questionsData = undefined;

  const questions = testData.questions.questions;
  const [
    answerResponse,
    answerResponseHandler,
    setAnswerResponse,
  ] = useAnswerResponse(currentUser, questionsData.questionSetID);
  const [shouldIntervalBeCancelled, setShouldIntervalBeCancelled] = useState(
    false,
  );
  const history = useHistory();

  useEffect(() => {
    if (questions.length === 0) {
      history.push('/selectQuestionSet').catch((e) => {
        console.log(e);
      });
    }
    loadForSeconds();
    pageview(window.location.pathname + window.location.search);
    document.oncontextmenu = () => false; // Disables Right Click
    startExam().catch((e) => console.log(e));
    gateway
      .getSavedAnswers(currentUser, testData.test_id)
      .then((data) => setAnswerResponse(data.savedAnswers))
      .catch((e) => console.log(e));
    getSnapshotInitial();

    return function cleanup() {
      isStreaming.current = false;
    };
  }, []);

  const webcam = useRef(undefined);
  const isStreaming = useRef(true);

  const timeUp = () => {
    isStreaming.current = false;
    history.push('/thankyou');
  };

  const getLastAlive = async () => {
    return gateway
      .getLastAlive(currentUser, testData.test_id)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const startExam = async () => {
    return gateway
      .startExam(currentUser, testData.test_id)
      .then((res) => {
        return res;
      })
      .catch((e) => console.log(e));
  };

  const setupWebcam = (instance) => {
    webcam.current = instance;

    const checkIfReady = () => {
      if (
        webcam.current &&
        webcam.current.state &&
        webcam.current.state.hasUserMedia
      ) {
        setisWebcamReady(true);
      } else {
        setTimeout(checkIfReady, 250);
      }
    };

    checkIfReady();
  };

  const handleWarningInvokation = (title, text) => {
    setWarning({
      ...warning,
      title: title,
      text: text,
      isWarningModalActive: true,
    });
  };

  const setIsWarningModalActive = (val) => {
    setWarning({ ...warning, isWarningModalActive: val });
  };

  // Putting a delay for capturing the first image since first image captured just after renderwas leading to false positives
  const getSnapshotInitial = () => {
    setTimeout(getSnapshot, 5000);
  };

  const getSnapshot = () => {
    if (webcam.current && isStreaming.current) {
      const image = webcam.current.getScreenshot();

      if (image) {
        const b64EncodedImg = image.split(',')[1];

        if (mode === 1) {
          gateway
            .processImage(b64EncodedImg, currentUser, testData.test_id)
            .then((res) => {
              if (res) {
                // If "Objects of Interest" test fails
                if (res[0]['Success'] === false) {
                  alert(
                    `Alert! ${res[0]['Details']} Detected! You will be Logged Out.`,
                  );
                  signOut();
                  history.push('/caught');
                }

                // If "Person Detection" test fails TODO: Change this alert to custom modal
                if (res[1]['Success'] === false && res[3]['Details'] > 1) {
                  handleWarningInvokation(
                    'Warning: Multiple Persons',
                    'There seem to be multiple people in your camera frame.',
                  );
                }

                // If "Person Recognition" test fails TODO: Change this alert to custom modal
                if (res[2]['Success'] === false && res[3]['Success'] === true) {
                  handleWarningInvokation(
                    'Impersonation Warning!',
                    'Person in the camera frame is not recognised. Ensure your face is clearly visible!',
                  );
                }

                // If "Face Detection" test fails TODO: Change this alert to custom modal
                if (res[3]['Success'] === false && res[3]['Details'] === 0) {
                  handleWarningInvokation(
                    'Warning: Face Not Detected!',
                    'Your face was not detected in the webcam. Ensure your face is clearly visible!',
                  );
                }
              }

              if (isStreaming.current) setTimeout(getSnapshot, 20000);
            });
        } else {
          console.log(
            'In dev mode. NOT sending req to Lambda. Screenshot captured at - ',
            new Date().toLocaleString(),
          ); // Testing purposes
          if (isStreaming.current) setTimeout(getSnapshot, 40000); // Testing purposes
        }
      } else {
        console.log('Waiting for camera to start responding');
        setTimeout(getSnapshot, 500);
      }
    }
  };

  function onEndExam() {
    gateway.endExam(currentUser, testData.test_id).catch((e) => {
      console.log(e);
    });
    setShouldIntervalBeCancelled(true);
    history.push('/thankyou').catch((e) => {
      console.log(e);
    });
  }

  const handleAnswerChange = (e) => {
    const questionName = e.target.name;
    const selectedAnswer = e.target.value;
    if (selectedAnswer) {
      answerResponseHandler(questionName, selectedAnswer);
    }
  };

  const isRadioChecked = (questionID, answerID) => {
    if (
      answerResponse &&
      answerResponse[questionID] &&
      answerResponse[questionID] === answerID
    ) {
      return true;
    }
  };

  return (
    <>
      <ExamWarningModal
        show={warning.isWarningModalActive}
        setShow={setIsWarningModalActive}
        title={warning.title}
        text={warning.text}
      />
      <Webcam
        ref={setupWebcam}
        screenshotFormat={'image/jpeg'}
        videoConstraints={{
          width: 1280,
          height: 640,
          facingMode: 'user',
        }}
        className={'examCamera'}
      />

      {isWebCamReady ? (
        <>
          <Timer
            examDuration={testData.test_duration * 60}
            getLastAlive={getLastAlive}
            callBackFn={timeUp}
            currentUser={currentUser}
            questionSetID={testData.test_id}
          />
          <div className={'examQuestions'}>
            {questions.map((q) => (
              <div className={'questionsWrapper'} key={q.id}>
                <Question
                  questionID={q.question_id}
                  question={q.question_text}
                  opts={q.choices}
                  handleAnswerChange={handleAnswerChange}
                  isRadioChecked={isRadioChecked}
                />
              </div>
            ))}

            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
              <Button
                variant={'primary'}
                size={'lg'}
                style={{ marginTop: '20px' }}
                onClick={onEndExam}
              >
                Submit
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

const Question = ({
  questionID,
  question,
  opts,
  handleAnswerChange,
  isRadioChecked,
}) => {
  return (
    <>
      <div className="card questionCard">
        <div className="card-body">
          <div className="card-title">
            <strong>{question}</strong>
          </div>

          {opts.map((opt) => (
            <div className="form-check mcqOption" key={opt.choice_id}>
              <input
                className="form-check-input"
                type="radio"
                name={questionID}
                id={opt.choice_id}
                value={opt.choice_text}
                onChange={handleAnswerChange}
                checked={
                  isRadioChecked(questionID, opt.choice_id) ? 'checked' : null
                }
              />
              <label htmlFor={opt.choice_id} className="form-check-label">
                {opt.choice_text}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Exam;
