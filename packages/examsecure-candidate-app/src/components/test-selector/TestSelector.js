import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useHistory } from 'react-router-dom';
import gateway from '../../utils/gateway';
import Spinner from 'react-bootstrap/Spinner';
import { pageview } from 'react-ga';

const TestSelector = ({ fetchQuestions, questions, currentUser }) => {
  const [selectedQSet, setSelectedQSet] = useState('');
  const [selectedQSetMetadata, setSelectedQSetMetadata] = useState({});
  const [qSets, setQsets] = useState([]);
  const [isSpinnerActive, setIsSpinnerActive] = useState(false);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSpinnerActive(true);
    fetchQuestions(selectedQSet, selectedQSetMetadata);
    history.push('/landing');
  };

  useEffect(() => {
    gateway
      .getQuestionSets()
      .then((data) => {
        const tests = Object.entries(data['questionSets']).map(
          ([id, metadata]) => {
            return {
              test_id: id,
              ...metadata,
            };
          },
        );

        setSelectedQSetMetadata(tests[0]);
        setSelectedQSet(tests[0].test_id);
        setQsets(tests);
      })
      .catch((e) => {
        console.log(e);
      });
    pageview(window.location.pathname + window.location.search);
  }, []);

  const handleSelect = (e) => {
    setSelectedQSet(e.target.value);
    const { options } = e.target;
    const selectedDataset = options[e.target.selectedIndex].dataset;
    const selectedQSetMetaData = {
      test_duration: selectedDataset.test_duration,
      test_id: selectedDataset.test_id,
      test_name: selectedDataset.test_name,
      test_by: selectedDataset.test_by,
    };
    setSelectedQSetMetadata(selectedQSetMetaData);
  };

  return (
    <Container>
      <div>
        <h2 style={{ marginTop: '10px' }} className="welcomeText">
          👋🏻 Welcome, {currentUser}
        </h2>

        <Card style={{ maxWidth: '600px', margin: '70px auto' }}>
          <Card.Header>
            <Card.Title style={{ marginBottom: '0' }}>
              To begin, select a test available to you
            </Card.Title>
          </Card.Header>
          <Form onSubmit={handleSubmit}>
            <Card.Body>
              <Form.Group>
                {qSets.length > 0 && isSpinnerActive === false ? (
                  <>
                    <Form.Label>Select a test</Form.Label>
                    <Form.Control
                      as={'select'}
                      custom
                      onChange={handleSelect}
                      name={'questionSetName'}
                    >
                      {qSets.map((questionSet) => (
                        <option
                          key={questionSet.test_id}
                          value={questionSet.test_id}
                          data-test_duration={questionSet.test_duration}
                          data-test_name={questionSet.test_name}
                          data-test_id={questionSet.test_id}
                          data-test_by={questionSet.test_by}
                        >
                          {questionSet.test_name}
                        </option>
                      ))}
                    </Form.Control>
                  </>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <Spinner animation={'border'} />
                  </div>
                )}
              </Form.Group>
            </Card.Body>
            <Card.Footer>
              <Button variant={'primary'} type={'submit'}>
                Submit
              </Button>
            </Card.Footer>
          </Form>
        </Card>

        <Card style={{ maxWidth: '500px', margin: '20px auto' }}>
          <Card.Body>
            <div>
              Note: Currently, we are only allowing full access to our beta to
              selected Educators and Candidates. Exam will run in a limited
              mode. We encourage you to check out the{' '}
              <a href={'/demo'}>Demo Page</a> for a quick demo on image analysis
              that ExamSecure does during the Exam.
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default TestSelector;
