import { connect } from 'react-redux';
import Landing from './Landing';

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    questionSetMetadata: state.questions.metadata,
  };
};

export default connect(mapStateToProps)(Landing);
