const initialState = {
  isLoading: false,
};

export const loadingReducer = (state = initialState, action) => {
  if (action.type === 'START_LOADING') {
    return { ...state, isLoading: true };
  }

  if (action.type === 'STOP_LOADING') {
    return { ...state, isLoading: false };
  }

  return state;
};
