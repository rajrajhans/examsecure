import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import missingDemo from '../../static/videos/face_demo.mp4';
import multiplePplDemo from '../../static/videos/multiple_person_demo.mp4';
import { pageview } from 'react-ga';

const DemoVideos = ({ navigate }) => {
  useEffect(() => {
    pageview(window.location.pathname + window.location.search);
  }, []);

  const demos = [
    {
      title: 'No face detected in the Camera Frame',
      vidSrc: missingDemo,
    },
    {
      title: 'Multiple Persons in the Camera Frame',
      vidSrc: multiplePplDemo,
    },
    {
      title: 'Impersonation Warning',
      vidSrc: multiplePplDemo,
    },
  ];
  return (
    <>
      <Container>
        <div>
          <h2 style={{ marginTop: '10px' }} className="welcomeText">
            Demo Videos 📺
          </h2>
        </div>

        <p>
          ExamSecure provides a wide array features to make it easy for
          Educators to conduct secure remote examinations and for Candidates to
          have a hassle free experience while ensuring the integrity of the
          exam. Following are short screengrab videos of some of the features.
          Note that many demo videos are yet to be uploaded. To explore all the
          features that ExamSecure provides, start a test exam{' '}
          <a href={'/selectQuestionSet'}> here</a> or check out our image
          analysis demo <a href={'/demo'}> here</a>.
        </p>

        {demos.map((demo) => (
          <Card style={{ margin: '20px' }}>
            <Card.Header>
              <Card.Title>{demo.title}</Card.Title>
            </Card.Header>
            <Card.Body style={{ margin: 'auto' }}>
              <video width={'500'} controls>
                <source src={demo.vidSrc} type={'video/mp4'} />
              </video>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default DemoVideos;
