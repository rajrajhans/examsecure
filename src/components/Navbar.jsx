import Navbar from 'react-bootstrap/Navbar';
import React, {Component} from 'react';
import logo from '../static/logo.png'
import LogoText from "./helpers/LogoText";

class ESNavbar extends Component {
    render() {
        return (
            <Navbar bg={"light"}>
                <Navbar.Brand href={"/"}>
                    <img alt={"examsecure"} src={logo} width={60} height={60}/>
                </Navbar.Brand>

                <a className={"logoTextLink"} href={"/"}>
                    <LogoText/>
                </a>
            </Navbar>
        );
    }
}

export default ESNavbar;