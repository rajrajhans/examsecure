import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import questionSets from "../static/questionSets.json";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { navigate } from "@reach/router";

const QuestionSetSelector = () => {
  const [qSet, setQSet] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(qSet);
    // todo: send req to server, fetch selected question set, load it in the store, and send user to '/landing'
    navigate("/landing");
  };

  useEffect(() => {
    console.log("Retrieving Available Question Sets");
    //todo: send req to server, get available qset names for currentUser, and load those in questionSets array
  }, []);

  const handleSelect = (e) => {
    setQSet(e.target.value);
  };

  return (
    <Container>
      <div>
        <h1 style={{ marginTop: "5px" }} className="welcomeText">
          Welcome, Raj
        </h1>

        <Card style={{ maxWidth: "600px", margin: "70px auto" }}>
          <Card.Header>
            <Card.Title style={{ marginBottom: "0" }}>
              To begin, select a Question Set available to you
            </Card.Title>
          </Card.Header>
          <Form onSubmit={handleSubmit}>
            <Card.Body>
              <Form.Group>
                <Form.Label>Select a Question Set</Form.Label>
                <Form.Control
                  as={"select"}
                  custom
                  onChange={handleSelect}
                  name={"questionSetName"}
                >
                  {questionSets.map((questionSet) => (
                    <option key={questionSet.qSetID} value={questionSet.qSetID}>
                      {questionSet.qSetName}
                    </option>
                  ))}
                </Form.Control>
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
