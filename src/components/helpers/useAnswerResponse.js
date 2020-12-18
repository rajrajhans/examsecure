import React, { useEffect, useState } from "react";

const useAnswerResponse = () => {
  const [answerResponse, setAnswerResponse] = useState({});

  useEffect(() => {
    console.log("answerResponse updated to ", answerResponse);
    console.log("Making req to /answer-response");
  }, [answerResponse]);

  return [answerResponse, setAnswerResponse];
};

export default useAnswerResponse;
