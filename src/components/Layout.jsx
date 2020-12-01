import React, {Component, Fragment} from 'react';
import ESNavbar from "./Navbar";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

class Layout extends Component {
    isConfigurationOk = window.rekognitionSettings;

    render() {
        if (this.isConfigurationOk) {
            return (
                <Fragment>
                    <ESNavbar isSignedIn={this.props.isSignedIn}/>
                    <Container>
                        <div className="wrapper">
                            {this.props.children}
                        </div>
                    </Container>
                </Fragment>
            );
        } else {
            return (
                <Alert variant={"danger"}>
                    Configuration Error. Contact the developers.
                </Alert>
            )
        }
    }
}

export default Layout;