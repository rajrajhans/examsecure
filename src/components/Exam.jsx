import React, {useEffect, useRef, useState} from 'react';
import Timer from "./helpers/Timer";
import questions from '../static/questions.json'
import Button from "react-bootstrap/Button";
import {Link, navigate} from "@reach/router";
import '../styles/exam.css'
import Webcam from "react-webcam";
import gateway from "../utils/gateway";

const Exam = () => {
    const [isWebCamReady, setisWebcamReady] = useState(false);

    const duration = 10000;

    const webcam = useRef(undefined);
    const isStreaming = useRef(true);
    const currentUrl = window.location.href;

    const timeUp = () => navigate('/thankyou');

    const setupWebcam = (instance) => {
        webcam.current = instance;

        const checkIfReady = () => {
            if (webcam.current && webcam.current.state && webcam.current.state.hasUserMedia) {
                setisWebcamReady(true);
            } else {
                setTimeout(checkIfReady, 250);
            }
        }

        checkIfReady();
    }

    const getSnapshot = () => {
        const image = webcam.current.getScreenshot();
        const b64EncodedImg = image.split(",")[1];

        // gateway.processImage(b64EncodedImg).then(
        //     (res) => {
        //         if (res)
        //             console.log(res);
        //
        //         if (isStreaming.current)
        //             setTimeout(getSnapshot, 300);
        //     }
        // )
    }

    useEffect(() => {
        return function cleanup() {
            isStreaming.current = false
        };
    }, [])

    return (
        <>
            <Webcam
                ref={setupWebcam}
                screenshotFormat={"image/jpeg"}
                videoConstraints={{
                    width: 1280,
                    height: 640,
                    facingMode: "user"
                }}
                className={"examCamera"}
            />
            {isWebCamReady ?
                (
                    <>
                        {getSnapshot()}
                        <Timer duration={duration} callBackFn={timeUp}/>
                        <div>
                            {questions.map((q) =>
                                <Question
                                    id={q.id}
                                    question={q.question}
                                    opt1={q.opt1}
                                    opt2={q.opt2}
                                    opt3={q.opt3}
                                    opt4={q.opt4}
                                />)
                            }

                            <Link to={"/thankyou"}>
                                <Button variant={"success"} size={"lg"} style={{marginTop: "20px"}}>
                                    Submit
                                </Button>
                            </Link>
                        </div>
                    </>):null}
        </>
    );
};

const Question = ({id, question, opt1, opt2, opt3, opt4}) => {
    const opts = [opt1, opt2, opt3, opt4]
    return (
        <>
            <div className="card questionCard" id={id}>
                <div className="card-body">
                    <div className="card-title"><strong>{question}</strong></div>

                    {opts.map((opt) =>
                        <div className="form-check" key={String(id) + opt.trim(' ')}>
                            <input className="form-check-input" type="radio" name={String(id) + opt.trim(' ')}
                                   id={String(id) + opt.trim(' ')} value={opt}/>
                            <label className="form-check-label" htmlFor={String(id) + opt.trim(' ')}>
                                {opt}
                            </label>
                        </div>
                    )}

                </div>
            </div>

        </>
    )
}

export default Exam;
