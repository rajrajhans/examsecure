import React, { useState } from 'react';
import styled from 'styled-components';
import backgroundImg from '../../assets/authbg1.jpg';
import { Title, TextInput, Button, WhiteCard } from '@examsecure/design-system';
import colors from '@examsecure/design-system/src/colors';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { signIn } from '../../redux/action-creators/auth';

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
`;

const HelperText = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 15px;
  color: ${colors.grayText};
  padding: 15px 0;
`;

const SignIn = (props) => {
  const [email, setEmail] = useState('es@rajrajhans.com');
  const [pwd, setPwd] = useState('password');

  const onBlur = () => {};

  const handleSignIn = (e) => {
    e.preventDefault();
    props.signIn({ email, pwd });
  };

  const { authError, auth } = props;

  if (auth.uid) return <Redirect to="/" />;

  return (
    <>
      <AuthContainer>
        <StyledWhiteCard>
          <FlexLeft>
            <Title value={'Sign In as Educator'} />
            <HelperText>
              <div style={{ paddingBottom: '20px', paddingTop: '16px' }}>
                {authError ? (
                  <div style={{ color: 'red' }}>
                    {authError.error.message} Please try again.
                  </div>
                ) : (
                  <>
                    For a test drive of the platform, enter "demo@vit.edu" as
                    both the username and password
                  </>
                )}
              </div>
              <div>
                Don't have an account?
                <Link to="/sign-up"> Create one</Link>
              </div>
              <div>Forgot Password?</div>
            </HelperText>
          </FlexLeft>
          <FlexRight>
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
          </FlexRight>
        </StyledWhiteCard>
      </AuthContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
