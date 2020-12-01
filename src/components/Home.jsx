import React, {Component, Fragment} from 'react';
import Jumbotron from "react-bootstrap/Jumbotron";
import LogoText from "./helpers/LogoText";
import Layout from "./Layout";
import Button from "react-bootstrap/Button";

class Home extends Component {
    render() {
        return (
            <Fragment>
                <Layout>
                    <Jumbotron>
                        <LogoText/>
                        <p>
                            Ensure Cheat-free Examinations. Lorem Ipsum Dolor Sit Amet
                        </p>
                        <p>
                            <Button variant="primary">Learn more</Button>
                        </p>
                    </Jumbotron>
                </Layout>
            </Fragment>
        );
    }
}

export default Home;