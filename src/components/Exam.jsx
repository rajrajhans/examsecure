import React from 'react';
import Timer from "./helpers/Timer";
import questions from '../static/questions.json'
import Button from "react-bootstrap/Button";
import {Link, navigate} from "@reach/router";
import '../styles/exam.css'

const Exam = () => {
    const duration = 30;
    const timeUp = () => navigate('/thankyou');

    return (
        <>
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
                    <Button variant={"success"} size={"lg"} style={{marginTop:"20px"}}>
                        Submit
                    </Button>
                </Link>
            </div>
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
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={String(id) + opt.trim(' ')} id={String(id) + opt.trim(' ')} value={opt}/>
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
