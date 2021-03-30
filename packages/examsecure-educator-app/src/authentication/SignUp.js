import React, { useState } from 'react';
import styled from 'styled-components';
import backgroundImg from '../assets/authbg1.jpg';
import { Title, TextInput, Button, WhiteCard } from '@examsecure/design-system';
import colors from '@examsecure/design-system/src/colors';

const AuthContainer = styled.div`
  min-height: 100vh;
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

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  const onBlur = () => {};

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(pwd);
    if (pwd !== confirmPwd) {
      alert('Passwords do not match');
    }
  };

  return (
    <>
      <AuthContainer>
        <StyledWhiteCard>
          <FlexLeft>
            <Title value={'Sign Up as Educator'} />
            <HelperText>
              <div>
                Sign up for an Educator account for free to create, schedule
                remote examinations with AI powered proctoring and powerful
                analytics.
              </div>
            </HelperText>
            <HelperText>
              <div>Already have an account? Sign in.</div>
            </HelperText>
          </FlexLeft>
          <FlexRight>
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
          </FlexRight>
        </StyledWhiteCard>
      </AuthContainer>
    </>
  );
};

export default SignUp;
