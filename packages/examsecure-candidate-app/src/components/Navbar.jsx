import Navbar from 'react-bootstrap/Navbar';
import React, { Component } from 'react';
import { navigate } from '@reach/router';
import { Auth } from 'aws-amplify';
import logo from '../static/logo.png';
import LogoText from './helpers/LogoText';
import Nav from 'react-bootstrap/Nav';
import signOut from '../utils/signOut';

class ESNavbar extends Component {
  render() {
    let isLoggedIn = this.props.isSignedIn;
    return (
      <Navbar
        bg={'light'}
        className={'navContainer'}
        expand={'lg'}
        collapseOnSelect={true}
      >
        <Navbar.Brand>
          <div
            className="logoContainer"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            <img
              alt={'examsecure'}
              src={logo}
              width={70}
              height={70}
              className={'navImage'}
            />
            &nbsp;
            <LogoText />
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={'justify-content-end'}
        >
          <Nav>
            <Nav.Link onClick={() => navigate('/demo')} eventKey={'1'}>
              Demo
            </Nav.Link>

            {isLoggedIn ? (
              <>
                <Nav.Link
                  onClick={() => navigate('/selectQuestionSet')}
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
  }
}

export default ESNavbar;
