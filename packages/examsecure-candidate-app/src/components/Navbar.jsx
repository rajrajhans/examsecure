import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../static/logo.png';
import LogoText from './helpers/LogoText';
import Nav from 'react-bootstrap/Nav';
import signOut from '../utils/signOut';

const ESNavbar = ({ isSignedIn }) => {
  const history = useHistory();
  return (
    <Navbar
      bg={'light'}
      className={'navContainer'}
      expand={'lg'}
      collapseOnSelect={true}
    >
      <Navbar.Brand style={{ display: 'flex', alignContent: 'center' }}>
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <img alt={'examsecure'} src={logo} width={40} height={40} />
        </Link>
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <LogoText />
        </Link>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className={'justify-content-end'}>
        <Nav>
          <Nav.Link onClick={() => history.push('/demo')} eventKey={'1'}>
            Demo
          </Nav.Link>

          {isSignedIn ? (
            <>
              <Nav.Link
                onClick={() => history.push('/selectQuestionSet')}
                eventKey={'4'}
              >
                Exam
              </Nav.Link>
              <Nav.Link href="/" onClick={signOut} eventKey={'2'}>
                Sign Out
              </Nav.Link>
            </>
          ) : null}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ESNavbar;
