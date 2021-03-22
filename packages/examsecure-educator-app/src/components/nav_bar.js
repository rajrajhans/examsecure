import Navbar from "react-bootstrap/Navbar";
import React, { Component } from "react";
//import { navigate } from "@reach/router";
//import { Auth } from "aws-amplify";
import logo from '../assets/logo_without_boxshadow.png'
//import LogoText from "./helpers/LogoText";
import {Nav} from "react-bootstrap";
//import signOut from "../utils/signOut";
import '../styles/header.css'
import {NavLink, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut} from '../actions/auth_actions'

const ESNavbar = (props) => {
    return (
      <Navbar
        bg={"light"}
        className={"navContainer"}
        expand={"lg"}
        collapseOnSelect={true}
      >
        <Navbar.Brand>
        <Link to='/' className="navbar-title">
            <div
                className="logoContainer"
                style={{ cursor: "pointer" }}
            >
                <img
                alt={"examsecure"}
                src={logo}
                width={70}
                height={70}
                className={"navImage"}
                style={{borderRadius:0}}
                />
                &nbsp;
                <span style={{fontWeight:"bold", fontSize:40, color:'#181838', textDecoration:'none'}}>  ExamSecure</span>
            </div>
            </Link> 
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={"justify-content-end"}
        >
          <Nav>

            {/* <Nav.Link onClick={() => <NavLink to='/addquestions'/>} eventKey={"1"}>
              Add Questions
            </Nav.Link> */}
            <li>
                <Nav.Link>
                <NavLink to='/proctorpage' className='nav-bar-items'>Proctor Test</NavLink>
                </Nav.Link>
            </li>
            <li>
                <Nav.Link>
                <NavLink to='/disqualifiedusers' className='nav-bar-items'>Disqualified Users</NavLink>
                </Nav.Link>
            </li>
            <li>
                <Nav.Link>
                <NavLink to='/studentpage' className='nav-bar-items'>Student Details</NavLink>
                </Nav.Link>
            </li>
            <li>
                <Nav.Link>
                <NavLink to='/addquestions' className='nav-bar-items'>Add Questions</NavLink>
                </Nav.Link>
            </li>
            <li>
                <Nav.Link onClick={props.signOut} className="nav-bar-items" style={{cursor: 'pointer'}}>Sign Out
                </Nav.Link>
            </li>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(ESNavbar);