import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { navigate } from "@reach/router";
import gateway from "../utils/gateway";
import Spinner from "react-bootstrap/Spinner";

const QuestionSetSelector = () => {
  const [qSet, setQSet] = useState(1);
  const [qSets, setQsets] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(qSet);
    // todo: send req to server, fetch selected question set, load it in the store, and send user to '/landing'
    navigate("/landing");
  };

  useEffect(() => {
    gateway
      .getQuestionSets()
      .then((data) => {
        setQsets(data["questionSets"]);
      })
      .catch((e) => {
        console.log(e);
      });
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
                {qSets.length > 0 ? (
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
