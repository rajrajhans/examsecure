import React, { useState } from 'react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import backgroundImg from '../../static/authbg1.jpg';
import { Title, TextInput, Button, WhiteCard } from '@examsecure/design-system';
import colors from '@examsecure/design-system/src/colors';
import { Link, useHistory } from 'react-router-dom';

const AuthContainer = styled.div`
  flex: 1;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${backgroundImg}) center bottom;
  background-size: cover;
  display: flex;
  align-content: center;
`;

const InputsContainer = styled.div`
  padding: 25px 10px;
`;

const ButtonContainer = styled.div`
  text-align: center;
`;

const TextInputContainer = styled.div`
  padding: 15px 0;
`;

const StyledWhiteCard = styled(WhiteCard)`
  display: flex;
  flex-wrap: wrap;
  @media only screen and (max-width: 768px) {
    width: 95%;
  }
`;

const FlexRight = styled.div`
  padding: 10px;
  margin: auto;
  flex: 1;
`;

const FlexLeft = styled.div`
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HelperText = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 15px;
  color: ${colors.grayText};
  padding: 15px 0;
`;

const SignUp = ({ setLoading }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [stage, setStage] = useState(0); // 0 for sign up stage, 1 for verification stage
  const [verificationCode, setVerificationCode] = useState('');

  const history = useHistory();

  const onBlur = () => {};

  const handleSignUp = (e) => {
    e.preventDefault();
    if (pwd !== confirmPwd) {
      alert('Passwords do not match');
    } else if (pwd.length < 8) {
      alert('Password should be at least 8 characters long');
    } else {
      setLoading(true);
      console.log(name, email, pwd, confirmPwd);
      Auth.signUp({
        username: email,
        password: pwd,
        attributes: { email, name },
        validationData: [],
      })
        .then((data) => {
          setLoading(false);
          setStage(1);
          console.log(data);
        })
        .catch((err) => {
          setLoading(false);
          alert(`An error occurred: ${err.message}`);
          console.log(err);
        });
    }
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    Auth.confirmSignUp(email, verificationCode)
      .then((data) => {
        console.log(data);
      })
      .then(() => {
        history.push('/signin');
      })
      .catch((err) => {
        console.log(err);
        alert(`An error occurred: ${err.message}`);
      });
  };

  return (
    <>
      <AuthContainer>
        <StyledWhiteCard>
          <FlexLeft>
            <Title value={'Sign Up as a Candidate'} />
            <HelperText>
              <div>
                Sign up for a free ExamSecure Candidate account to continue.
              </div>
            </HelperText>
            <HelperText>
              <Link to={'/signin'}>Already have an account? Sign in.</Link>
            </HelperText>
          </FlexLeft>
          <FlexRight>
            {stage === 0 ? (
              <form onSubmit={handleSignUp}>
                <InputsContainer>
                  <TextInputContainer>
                    <TextInput
                      label={'Name'}
                      onBlur={onBlur}
                      onChange={(name) => {
                        setName(name);
                      }}
                      iconLeft={'User'}
                      value={name}
                      type={'text'}
                      name={'name'}
                      required={true}
                    />
                  </TextInputContainer>
                  <TextInputContainer>
                    <TextInput
                      label={'Email'}
                      onBlur={onBlur}
                      onChange={(email) => {
                        setEmail(email);
                      }}
                      iconLeft={'Mail'}
                      value={email}
                      type={'email'}
                      name={'email'}
                      required={true}
                    />
                  </TextInputContainer>
                  <TextInputContainer>
                    <TextInput
                      label={'Password'}
                      onBlur={onBlur}
                      onChange={(pwd) => {
                        setPwd(pwd);
                      }}
                      iconLeft={'Lock'}
                      value={pwd}
                      type={'password'}
                      name={'password'}
                      required={true}
                    />
                  </TextInputContainer>
                  <TextInputContainer>
                    <TextInput
                      label={'Confirm Password'}
                      onBlur={onBlur}
                      onChange={(pwd) => {
                        setConfirmPwd(pwd);
                      }}
                      iconLeft={'Lock'}
                      value={confirmPwd}
                      type={'password'}
                      name={'confirmPassword'}
                      required={true}
                    />
                  </TextInputContainer>
                </InputsContainer>
                <ButtonContainer>
                  <Button
                    variant={'primary'}
                    label={'Sign Up'}
                    type={'submit'}
                    width={'150px'}
                  />
                </ButtonContainer>
              </form>
            ) : (
              <form onSubmit={handleVerificationSubmit}>
                <HelperText>
                  <div>Please enter the six digit code sent on "{email}"</div>
                </HelperText>
                <InputsContainer>
                  <TextInputContainer>
                    <TextInput
                      label={'Verification Code'}
                      onBlur={onBlur}
                      onChange={(code) => {
                        setVerificationCode(code);
                      }}
                      iconLeft={'Hash'}
                      value={verificationCode}
                      type={'number'}
                      name={'verificationCode'}
                      required={true}
                    />
                  </TextInputContainer>
                </InputsContainer>
                <ButtonContainer>
                  <Button
                    variant={'primary'}
                    label={'Submit'}
                    type={'submit'}
                    width={'150px'}
                  />
                </ButtonContainer>
              </form>
            )}
          </FlexRight>
        </StyledWhiteCard>
      </AuthContainer>
    </>
  );
};

export default SignUp;
