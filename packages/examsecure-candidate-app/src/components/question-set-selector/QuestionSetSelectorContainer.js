import QuestionSetSelector from './QuestionSetSelector';
import { connect } from 'react-redux';
import fetchQuestions from '../../redux/actions/questionAction';

export default connect(null, { fetchQuestions })(QuestionSetSelector);
