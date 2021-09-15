import { useEffect, useState } from 'react';
import { DATE_TIME_FORMAT } from './constants';

export default function useForm(initialState = {}) {
  const [inputState, setInputState] = useState(initialState);
  const initialValues = Object.values(initialState).join('');

  useEffect(() => {
    setInputState(initialState);
    // eslint-disable-next-line
  }, [initialValues]);

  const handleChange = (e) => {
    let { value, name, type } = e.target;

    if (type === 'number') {
      value = parseInt(value);
    }

    if (type === 'file') {
      [value] = e.target.files;
    }

    setInputState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateTimeChange = (moment, name) => {
    if (moment.format) {
      setInputState((prevState) => ({
        ...prevState,
        [name]: moment.format(DATE_TIME_FORMAT),
      }));
    }
  };

  const resetForm = () => {
    setInputState(initialState);
  };

  return [
    inputState,
    handleChange,
    handleDateTimeChange,
    resetForm,
    setInputState,
  ];
}
