import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { navigate } from "@reach/router";
import gateway from "../utils/gateway";
import Spinner from "react-bootstrap/Spinner";

const QuestionSetSelector = ({ fetchQuestions, questions, currentUser }) => {
  const [selectedQSet, setSelectedQSet] = useState("");
  const [selectedQSetDuration, setSelectedQSetDuration] = useState("");
  const [qSets, setQsets] = useState([]);
  const [isSpinnerActive, setIsSpinnerActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSpinnerActive(true);
    fetchQuestions(selectedQSet, selectedQSetDuration);
    navigate("/landing").catch((e) => {
      console.log(e);
    });
  };

  useEffect(() => {
    gateway
      .getQuestionSets()
      .then((data) => {
        setSelectedQSetDuration(data["questionSets"][0].duration);
        setSelectedQSet(data["questionSets"][0].qSetID);
        setQsets(data["questionSets"]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleSelect = (e) => {
    setSelectedQSet(e.target.value);
    const { options } = e.target;
    const selectedDuration = options[e.target.selectedIndex].dataset.duration;
    setSelectedQSetDuration(selectedDuration);
  };

  return (
    <Container>
      <div>
        <h2 style={{ marginTop: "10px" }} className="welcomeText">
          👋🏻 Welcome, {currentUser}
        </h2>

        <Card style={{ maxWidth: "600px", margin: "70px auto" }}>
          <Card.Header>
            <Card.Title style={{ marginBottom: "0" }}>
              To begin, select a Question Set available to you
            </Card.Title>
          </Card.Header>
          <Form onSubmit={handleSubmit}>
            <Card.Body>
              <Form.Group>
                {qSets.length > 0 && isSpinnerActive === false ? (
                  <>
                    <Form.Label>Select a Question Set</Form.Label>
                    <Form.Control
                      as={"select"}
                      custom
                      onChange={handleSelect}
                      name={"questionSetName"}
                    >
                      {qSets.map((questionSet) => (
                        <option
                          key={questionSet.qSetID}
                          value={questionSet.qSetID}
                          data-duration={questionSet.duration}
                        >
                          {questionSet.qSetName}
                        </option>
                      ))}
                    </Form.Control>
                  </>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <Spinner animation={"border"} />
                  </div>
                )}
              </Form.Group>
            </Card.Body>
            <Card.Footer>
              <Button variant={"primary"} type={"submit"}>
                Submit
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    </Container>
  );
};

export default QuestionSetSelector;
