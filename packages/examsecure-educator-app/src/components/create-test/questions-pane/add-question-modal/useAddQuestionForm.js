import useForm from '../../../../utils/useForm';

const emptyQuestion = {
  question_id: 1,
  question_text: '',
  question_type: 'mcq_single',
  question_max_score: 4,
  negative_marking: 'no',
  negative_marks: 0,
  choices: [
    {
      id: 1,
      choice_text: '',
    },
    {
      id: 2,
      choice_text: '',
    },
    {
      id: 3,
      choice_text: '',
    },
    {
      id: 4,
      choice_text: '',
    },
  ],
  correct_choices: new Set(),
  correct_choice_id: '',
};

export default function useAddQuestionForm() {
  // eslint-disable-next-line no-unused-vars
  const [inputs, onChangeHandler, _, __, setInputs] = useForm(emptyQuestion);

  const addChoice = (choice_id, choice_text) => {
    setInputs((prevState) => ({
      ...prevState,
      choices: [
        ...prevState.choices,
        {
          id: choice_id,
          choice_text: choice_text,
        },
      ],
    }));
  };

  const removeChoice = (choice_id) => {
    setInputs((prevState) => ({
      ...prevState,
      choices: prevState.choices.filter((choice) => choice.id !== choice_id),
    }));
  };

  const choiceTextChangeHandler = (e) => {
    const { id, value: choice_text } = e.target;
    const choice_id = Number(id);

    setInputs((prevState) => ({
      ...prevState,
      choices: prevState.choices.map((choice) => {
        if (choice.id === choice_id) {
          return {
            id: choice_id,
            choice_text: choice_text,
          };
        } else {
          return choice;
        }
      }),
    }));
  };

  const choiceSelectChangeHandler = (e) => {
    const { id: choice_id } = e.target;

    if (inputs.question_type === 'mcq_single') {
      markAsCorrectChoice(choice_id);
    } else {
      if (inputs.correct_choices.has(choice_id)) {
        removeAsOneOfTheCorrectChoices(choice_id);
      } else {
        markAsOneOfTheCorrectChoices(choice_id);
      }
    }
  };

  const markAsCorrectChoice = (choice_id) => {
    setInputs((prevState) => ({
      ...prevState,
      correct_choice_id: choice_id,
    }));
  };

  const markAsOneOfTheCorrectChoices = (choice_id) => {
    setInputs((prevState) => {
      prevState.correct_choices.add(choice_id);
      return {
        ...prevState,
        correct_choices: new Set(prevState.correct_choices),
      };
    });
  };

  const removeAsOneOfTheCorrectChoices = (choice_id) => {
    setInputs((prevState) => {
      prevState.correct_choices.delete(choice_id);
      return {
        ...prevState,
        correct_choices: new Set(prevState.correct_choices),
      };
    });
  };

  const resetQuestionInputState = () => {
    setInputs(emptyQuestion);
  };

  const replaceQuestionInputState = (questionState) => {
    setInputs(questionState);
  };

  return {
    inputs,
    onChangeHandler,
    choiceSelectChangeHandler,
    addChoice,
    removeChoice,
    choiceTextChangeHandler,
    resetQuestionInputState,
    replaceQuestionInputState,
  };
}
