import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import gateway from "../../utils/gateway";
import { navigate } from "@reach/router";

// Takes in a "duration" and "Callback Function", waits for "duration" and fires the CallbackFn

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timePassed: 0,
      timeRemaining: 0,
    };
  }

  checkForDisqualification = (currentUser, questionSetID) => {
    gateway
      .checkIsDisqualified(currentUser, questionSetID, this.state.timeRemaining)
      .then((res) => {
        if (res.isDisqualified === "true") {
          clearInterval(this.checkForDisqInterval);
          alert("You have been disqualified by the educator.");
          navigate("/").catch((e) => {
            console.log(e);
          });
        }
      });
  };

  tick(duration, callBackFn) {
    if (this.state.timePassed === duration) {
      callBackFn();
    } else {
      this.setState((prevState) => ({
        timePassed: prevState.timePassed + 1,
        timeRemaining: duration - prevState.timePassed,
      }));
    }
  }

  componentDidMount() {
    const {
      examDuration,
      callBackFn,
      getLastAlive,
      startExam,
      currentUser,
      questionSetID,
    } = this.props;

    let lastAlive, startedAt, completedDuration, adjustedDuration;
    getLastAlive()
      .then((res) => {
        lastAlive = Number(res.lastAlive.slice(1, -1));
      })
      .then(() => {
        startExam()
          .then((res) => {
            startedAt = res.startedAt;
          })
          .then(() => {
            if (lastAlive) {
              completedDuration = (lastAlive - startedAt) / 1000;
              adjustedDuration = Math.floor(examDuration - completedDuration);
            } else {
              adjustedDuration = examDuration;
            }

            this.adjustedDuration = adjustedDuration;
          });
      });

    this.interval = setInterval(
      () => this.tick(examDuration, callBackFn),
      1000
    );

    this.checkForDisqInterval = setInterval(
      () => this.checkForDisqualification(currentUser, questionSetID),
      5000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.checkForDisqInterval);
  }

  getTimeFromSeconds = (seconds) => {
    const minsRemaining = Math.floor(seconds / 60);
    const secsRemaining = seconds - minsRemaining * 60;

    return [minsRemaining, secsRemaining];
  };

  render() {
    const [min, sec] = this.getTimeFromSeconds(this.state.timeRemaining);

    if (this.state.shouldIntervalBeCleared) {
      clearInterval(this.state.intervalID);
    }

    return (
      <Alert variant={"warning"} className={"timer"}>
        <strong>Time Remaining</strong> <br />
        {typeof this.adjustedDuration === "undefined" ? (
          <>
            <Spinner
              animation={"border"}
              size={"sm"}
              style={{ margin: "15px 0" }}
            />
          </>
        ) : (
          <div style={{ margin: "15px 0", fontSize: "20px" }}>
            <span>
              <span style={{ fontSize: "40px" }}>{min}</span> m
            </span>
            {"  "}
            <span>
              <span style={{ fontSize: "40px" }}>{sec}</span> s
            </span>
          </div>
        )}
      </Alert>
    );
  }
}

export default Timer;
