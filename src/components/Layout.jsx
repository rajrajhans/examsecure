import React, {Component} from 'react';
import ESNavbar from "./Navbar";
import Container from "react-bootstrap/Container";

class Layout extends Component {
    render() {
        return (
            <Container>
                <ESNavbar/>
                <div className="wrapper">
                    {children}
                </div>
            </Container>
        );
    }
}

export default Layout;