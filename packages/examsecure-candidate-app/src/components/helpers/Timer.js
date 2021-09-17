import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import gateway from '../../utils/gateway';
import { withRouter } from 'react-router-dom';
// Takes in a "duration" and "Callback Function", waits for "duration" and fires the CallbackFn

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timePassed: 0,
      timeRemaining: undefined,
    };
  }

  checkForDisqualification = (email, questionSetID, test_by) => {
    gateway
      .checkIsDisqualified(
        email,
        questionSetID,
        test_by,
        this.state.timeRemaining,
      )
      .then((res) => {
        if (res.isDisqualified === 'true') {
          clearInterval(this.checkForDisqInterval);
          alert('You have been disqualified by the educator.');
          this.props.history.push('/').catch((e) => {
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
      email,
      questionSetID,
      test_by,
    } = this.props;

    let remainingTimeGotFromServer, adjustedDuration;

    getLastAlive().then((res) => {
      if (res.lastAlive !== 'null') {
        remainingTimeGotFromServer = Number(res.lastAlive.slice(1, -1));
        adjustedDuration = remainingTimeGotFromServer;

        this.setState((prevState) => ({
          timePassed: examDuration - remainingTimeGotFromServer,
          timeRemaining: remainingTimeGotFromServer,
        }));
      } else {
        adjustedDuration = examDuration;
        this.setState((prevState) => ({
          timePassed: 0,
          timeRemaining: examDuration,
        }));
      }

      this.interval = setInterval(
        () => this.tick(examDuration, callBackFn),
        1000,
      );
    });

    this.checkForDisqInterval = setInterval(
      () => this.checkForDisqualification(email, questionSetID, test_by),
      5000,
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

    return (
      <Alert variant={'warning'} className={'timer'}>
        <strong>Time Remaining</strong> <br />
        {typeof this.state.timeRemaining === 'undefined' ? (
          <>
            <Spinner
              animation={'border'}
              size={'sm'}
              style={{ margin: '15px 0' }}
            />
          </>
        ) : (
          <div style={{ margin: '15px 0', fontSize: '20px' }}>
            <span>
              <span style={{ fontSize: '40px' }}>{min}</span> m
            </span>
            {'  '}
            <span>
              <span style={{ fontSize: '40px' }}>{sec}</span> s
            </span>
          </div>
        )}
      </Alert>
    );
  }
}

export default withRouter(Timer);
