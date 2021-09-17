// Temporary hack to easily disable calls to AWS Lambda and Rekognition for testing purposes without incurring charges
let mode = 1;

if (
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'test' ||
  process.env.REACT_APP_TURN_ON_API_CALLS === '1'
) {
  mode = 1;
}

export { mode };
