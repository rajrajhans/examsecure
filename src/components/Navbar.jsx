import Navbar from 'react-bootstrap/Navbar';
import React, {Component} from 'react';
import { Auth } from "aws-amplify";
import logo from '../static/logo.png'
import LogoText from "./helpers/LogoText";
import Nav from "react-bootstrap/Nav";
import signOut from "../utils/signOut";

class ESNavbar extends Component {

    render() {
        let isLoggedIn = this.props.isSignedIn;
        return (
            <Navbar bg={"light"}>
                <Navbar.Brand href={"/"}>
                    <img alt={"examsecure"} src={logo} width={60} height={60}/>
                    &nbsp;
                    <LogoText/>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav" className={"justify-content-end"}>
                    <Nav>
                        {isLoggedIn ? (
                            <Nav.Link href="/" onClick={signOut} active>Sign Out</Nav.Link>
                        ) : (
                            <Nav.Link href="/" active>Sign In</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default ESNavbar;