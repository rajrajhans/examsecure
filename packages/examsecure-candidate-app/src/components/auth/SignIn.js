import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { pageview } from 'react-ga';
import { Button, TextInput, Title, WhiteCard } from '@examsecure/design-system';
import styled from 'styled-components';
import backgroundImg from '../../static/authbg1.jpg';
import { Link } from 'react-router-dom';
import colors from '@examsecure/design-system/src/colors';

const AuthContainer = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${backgroundImg}) center bottom;
  flex: 1;
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
  padding: 18px 0;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
`;

const HelperText = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 15px;
  color: ${colors.grayText};
  padding: 15px 0;
`;

const SignIn = ({ isSignedIn, authState, setAuthState, setLoading }) => {
  const [email, setEmail] = useState('es@rajrajhans.com');
  const [pwd, setPwd] = useState('password');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [stage, setStage] = useState(0); // 0 for sign in, 1 for forget password, 2 for verification

  const onBlur = () => {};

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const user = await Auth.signIn(email, pwd);
      setAuthState(user);
      setLoading(false);
      console.log(user);
    } catch (e) {
      setLoading(false);
      alert(e.message);
      console.log(e);
    }
  };

  useEffect(() => {
    pageview(window.location.pathname + window.location.search);
  }, []);

  const handleForgotPwdSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await Auth.forgotPassword(email);
      console.log(res);
      setStage(2);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      alert(e.message);
      console.log(e);
    }
  };

  const handleForgotPwdVerify = async (e) => {
    e.preventDefault();
    if (pwd !== confirmPwd) {
      alert('Passwords do not match');
    } else if (pwd.length < 8) {
      alert('Password should be at least 8 characters long');
    } else {
      try {
        setLoading(true);
        const res = await Auth.forgotPasswordSubmit(
          email,
          verificationCode,
          pwd,
        );
        console.log(res);
        setStage(0);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        alert(e.message);
        console.log(e);
      }
    }
  };

  return (
    <>
      {isSignedIn ? (
        <>{window.history.back()}</>
      ) : (
        <>
          <AuthContainer>
            <StyledWhiteCard>
              <FlexLeft>
                <Title value={'Sign In as a Candidate'} />
                <HelperText>
                  <div style={{ paddingBottom: '20px', paddingTop: '16px' }}>
                    For a test drive of the platform, simply click Sign In with
                    prefilled credentials.
                  </div>
                </HelperText>
                <div>
                  <div>
                    <Link to={'/signup'}>
                      Don't have an account? Create one.
                    </Link>
                  </div>
                  <div>
                    {stage === 0 ? (
                      <a href={'#'} onClick={() => setStage(1)}>
                        Forgot Password?
                      </a>
                    ) : (
                      <a href={'#'} onClick={() => setStage(0)}>
                        Back to Sign In.
                      </a>
                    )}
                  </div>
                </div>
              </FlexLeft>
              <FlexRight>
                {stage === 0 ? (
                  <form onSubmit={handleSignIn}>
                    <InputsContainer>
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
                    </InputsContainer>
                    <ButtonContainer>
                      <Button
                        variant={'primary'}
                        label={'Sign In'}
                        type={'submit'}
                        width={'150px'}
                      />
                    </ButtonContainer>
                  </form>
                ) : (
                  <>
                    {stage === 1 ? (
                      <form onSubmit={handleForgotPwdSubmit}>
                        <InputsContainer>
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
                    ) : (
                      <form onSubmit={handleForgotPwdVerify}>
                        <InputsContainer>
                          <HelperText>
                            <div>
                              Please enter the six digit code sent through email
                            </div>
                          </HelperText>
                          <TextInputContainer>
                            <TextInput
                              label={'Verification Code'}
                              onBlur={onBlur}
                              onChange={(verificationCode) => {
                                setVerificationCode(verificationCode);
                              }}
                              iconLeft={'Hash'}
                              value={verificationCode}
                              type={'number'}
                              name={'verificationCode'}
                              required={true}
                            />
                          </TextInputContainer>
                          <TextInputContainer>
                            <TextInput
                              label={'New Password'}
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
                              label={'Confirm New Password'}
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
                            label={'Submit'}
                            type={'submit'}
                            width={'150px'}
                          />
                        </ButtonContainer>
                      </form>
                    )}
                  </>
                )}
              </FlexRight>
            </StyledWhiteCard>
          </AuthContainer>
        </>
      )}
    </>
  );
};

export default SignIn;
