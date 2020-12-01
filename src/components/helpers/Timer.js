import React, {Component} from 'react';
import Alert from "react-bootstrap/Alert";

// Takes in a "duration" and "Callback Function", waits for "duration" and fires the CallbackFn

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timePassed: 0
        }
    }

    tick() {
        const {duration, callBackFn} = this.props;

        if (this.state.timePassed === duration) {
            callBackFn();
        } else {
            this.setState((prevState) => ({
                timePassed: prevState.timePassed + 1
            }));
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getTimeFromSeconds = (seconds) => {
        const minsRemaining = Math.floor(seconds / 60);
        const secsRemaining = seconds - (minsRemaining * 60);

        return `${minsRemaining} minutes and ${secsRemaining} seconds`;
    }

    render() {
        const { duration } = this.props;
        let timeLeftinSecs = duration - this.state.timePassed;

        return (
            <Alert variant={"warning"} className={"timer"}>
                Time Remaining - {this.getTimeFromSeconds(timeLeftinSecs)}
            </Alert>
        );
    }
}

export default Timer;