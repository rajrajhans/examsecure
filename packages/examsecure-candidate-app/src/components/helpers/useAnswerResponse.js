import { useEffect, useState } from 'react';
import gateway from '../../utils/gateway';

const useAnswerResponse = (username, email, questionSetID, test_by) => {
  const [answerResponse, setAnswerResponse] = useState({});

  const updateAnswerHandler = (questionID, userSelectedAnswer) => {
    gateway
      .updateAnswer(
        username,
        email,
        questionSetID,
        questionID,
        userSelectedAnswer,
        test_by,
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
