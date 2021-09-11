import { useEffect, useState } from 'react';

export default function useForm(initialState = {}) {
  const [inputState, setInputState] = useState();
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

  const resetForm = () => {
    setInputState(initialState);
  };

  return [inputState, handleChange, resetForm];
}
