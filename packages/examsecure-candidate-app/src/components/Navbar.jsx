import Navbar from 'react-bootstrap/Navbar';
import React, { Component } from 'react';
import { Link, navigate } from '@reach/router';
import { Auth } from 'aws-amplify';
import logo from '../static/logo.png';
import LogoText from './helpers/LogoText';
import Nav from 'react-bootstrap/Nav';
import signOut from '../utils/signOut';

class ESNavbar extends Component {
  render() {
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
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={'justify-content-end'}
        >
          <Nav>
            <Nav.Link onClick={() => navigate('/demo')} eventKey={'1'}>
              Demo
            </Nav.Link>

            {this.props.isSignedIn ? (
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
