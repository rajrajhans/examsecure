import { useEffect, useState } from 'react';
import gateway from '../../utils/gateway';

const useAnswerResponse = (username, email, questionSetID) => {
  const [answerResponse, setAnswerResponse] = useState({});

  const updateAnswerHandler = (questionID, userSelectedAnswer) => {
    gateway
      .updateAnswer(
        username,
        email,
        questionSetID,
        questionID,
        userSelectedAnswer,
      )
      .catch((e) => {
        console.log('error: ', e);
      });

    setAnswerResponse({ ...answerResponse, [questionID]: userSelectedAnswer });
  };

  useEffect(() => {
    console.log('answerResponse updated to ', answerResponse);
    console.log('Making req to /answer-response');
  }, [answerResponse]);

  return [answerResponse, updateAnswerHandler, setAnswerResponse];
};

export default useAnswerResponse;
