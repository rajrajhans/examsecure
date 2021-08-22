export const startLoading = () => {
  console.log('action: started loading');
  return {
    type: 'START_LOADING',
  };
};

export const stopLoading = () => {
  console.log('action: stopeed loading');

  return {
    type: 'STOP_LOADING',
  };
};
