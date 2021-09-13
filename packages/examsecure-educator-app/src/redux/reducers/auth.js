const initState = {
  authError: null,
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      console.log('Login Failed');
      return {
        ...state,
        authError: {
          error: action.error,
        },
      };
    case 'LOGIN_SUCCESS':
      console.log('Login Successful!');
      return {
        ...state,
        authError: null,
      };
    case 'SIGNOUT_SUCCESS':
      console.log('Signout Success');
      return state;
    case 'SIGN_UP_SUCCESS':
      console.log('Sign Up Success');
      return {
        ...state,
        authError: null,
      };
    case 'SIGN_UP_FAILED':
      console.log('Sign Up Failed');
      return {
        ...state,
        authError: {
          error: action.error,
        },
      };
    default:
      return state;
  }
};
export default auth;
