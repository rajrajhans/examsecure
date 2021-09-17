import TestSelector from './TestSelector';
import { connect } from 'react-redux';
import fetchQuestions from '../../redux/actions/questionAction';

export default connect(null, { fetchQuestions })(TestSelector);
