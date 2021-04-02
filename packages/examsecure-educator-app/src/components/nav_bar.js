import Navbar from 'react-bootstrap/Navbar';
import React, { Component } from 'react';
//import { navigate } from "@reach/router";
//import { Auth } from "aws-amplify";
import logo from '../assets/logo_without_boxshadow.png';
//import LogoText from "./helpers/LogoText";
import { Nav } from 'react-bootstrap';
//import signOut from "../utils/signOut";
import '../styles/header.css';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../actions/auth_actions';

const ESNavbar = (props) => {
  return (
    <Navbar
      bg={'light'}
      className={'navContainer'}
      expand={'lg'}
      collapseOnSelect={true}
    >
      <Navbar.Brand style={{ display: 'flex', alignContent: 'center' }}>
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <img alt={'examsecure'} src={logo} width={40} />
        </Link>
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <span className={'logo'}>ExamSecure</span>
        </Link>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className={'justify-content-end'}>
        <Nav>
          <li>
            <Nav.Link>
              <NavLink to="/proctorpage" className="nav-bar-items">
                Proctor Test
              </NavLink>
            </Nav.Link>
          </li>
          <li>
            <Nav.Link>
              <NavLink to="/disqualifiedusers" className="nav-bar-items">
                Disqualified Users
              </NavLink>
            </Nav.Link>
          </li>
          <li>
            <Nav.Link>
              <NavLink to="/studentpage" className="nav-bar-items">
                Student Details
              </NavLink>
            </Nav.Link>
          </li>
          <li>
            <Nav.Link>
              <NavLink to="/addquestions" className="nav-bar-items">
                Add Questions
              </NavLink>
            </Nav.Link>
          </li>
          <li>
            <Nav.Link
              onClick={props.signOut}
              className="nav-bar-items"
              style={{ cursor: 'pointer' }}
            >
              Sign Out
            </Nav.Link>
          </li>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(ESNavbar);
