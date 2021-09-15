export default function validateQuestionInput(questionsInput) {
  let isTestDetailsOK = true;
  let errorMessage = '';

  Object.entries(questionsInput).map(([k, v]) => {
    if (k === 'choices' && questionsInput.question_type !== 'subjective') {
      if (v.length <= 1) {
        errorMessage += ' Enter more than one choice for the answer. \n';
        isTestDetailsOK = false;
      }
      v?.forEach((choice) => {
        if (choice.choice_text === '') {
          errorMessage += ' Make sure the choices are not empty!. \n';
          isTestDetailsOK = false;
        }
      });
    } else if (
      k === 'correct_choice_id' &&
      questionsInput.question_type === 'mcq_single' &&
      v === ''
    ) {
      errorMessage += ' Make sure to select the correct answer. \n';
      isTestDetailsOK = false;
    } else if (
      k === 'correct_choices' &&
      questionsInput.question_type === 'mcq_multiple'
    ) {
      const choicesArray = [...v];
      if (choicesArray.length < 1) {
        errorMessage += ' Make sure to select the correct choices. \n';
        isTestDetailsOK = false;
      }
    } else if (v === '' && k !== 'correct_choice_id') {
      errorMessage += ` Please fill the ${k} field! \n`;
      isTestDetailsOK = false;
    }
  });

  if (errorMessage) {
    alert(errorMessage);
  }

  return isTestDetailsOK;
}
