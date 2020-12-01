import Navbar from 'react-bootstrap/Navbar'
import React, {Component} from 'react';

class ESNavbar extends Component {
    render() {
        return (
            <Navbar bg={"dark"}>
                <Navbar.Brand href={"#"}>
                    Smol Logo will go here
                </Navbar.Brand>
            </Navbar>
        );
    }
}

export default ESNavbar;