import React, {useRef} from 'react';
import logo from '../static/logo.png'
import Spinner from "react-bootstrap/Spinner";
import '../styles/Loading.css'

const Loading = () => {
    return (
        <div className={"loadingWrapper"}>
            <div className="loadingLogo">
                <img src={logo} alt={"ExamSecure"}/>
            </div>
        </div>
    );
};

export default Loading;
