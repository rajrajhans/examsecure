import React, {useEffect, useRef, useState} from "react";
import Webcam from "react-webcam";
import { Col, Row } from "react-bootstrap"

const Landing = () => {
    const [isWebCamReady, setisWebcamReady] = useState(false);
    const webcam = useRef(undefined);

    const setupWebcam = (instance) => {
        webcam.current = instance;

        const checkIfReady = () => {
            if(webcam.current && webcam.current.state && webcam.current.state.hasUserMedia){
                setisWebcamReady(true);
            }else{
                setTimeout(checkIfReady, 250);
            }
        }

        checkIfReady();
    }

    return(

    )

}

export default Landing