import React, { useEffect, useState } from "react";
import gateway from "../../utils/gateway";

const useAnswerResponse = (username, questionSetID) => {
  const [answerResponse, setAnswerResponse] = useState({});

  const updateAnswerHandler = (questionID, userSelectedAnswer) => {
    gateway
      .updateAnswer(username, questionSetID, questionID, userSelectedAnswer)
      .catch((e) => {
        console.log("error: ", e);
      });

    setAnswerResponse({ ...answerResponse, [questionID]: userSelectedAnswer });
  };

  useEffect(() => {
    console.log("answerResponse updated to ", answerResponse);
    console.log("Making req to /answer-response");
  }, [answerResponse]);

  return [answerResponse, updateAnswerHandler];
};

export default useAnswerResponse;
