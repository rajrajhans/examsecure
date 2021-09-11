import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const InviteCandidateEmails = () => {
  const [emails, setEmails] = useState([]);
  const [emailInput, setEmailInput] = useState('');

  const handleEmailInputChange = (e) => {
    setEmailInput(e.target.value);
  };

  const addEmail = (e) => {
    e.preventDefault();
    if (emailInput.endsWith('@vit.edu')) {
      if (!emails.includes(emailInput)) {
        setEmails((prevState) => [...prevState, emailInput]);
        setEmailInput('');
      } else {
        alert(`${emailInput} is already invited.`);
      }
    } else {
      alert(
        'To optimize costs, we are currently restricting email invitations to vit.edu emails only. Please enter vit.edu emails or keep the test Open To All and share the test link with candidates.',
      );
    }
  };

  return (
    <>
      <Form onSubmit={addEmail}>
        <Form.Group>
          <Form.Label>Add Candidate Emails to invite</Form.Label>
          <InputGroup>
            <Form.Control
              type="email"
              placeholder="candidate.xyz@vit.edu"
              value={emailInput}
              onChange={handleEmailInputChange}
              required
            />
            <InputGroup.Text className="dash-op-add-invite-emails">
              <Button variant={'secondary'} type={'submit'}>
                +
              </Button>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <div className="dash-op-invited-emails">
          {emails.length > 0 && (
            <div>
              <strong>List of invited emails ({emails.length})</strong>
              <ol>
                {emails.map((email) => (
                  <li>{email}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </Form>
    </>
  );
};

export default InviteCandidateEmails;
