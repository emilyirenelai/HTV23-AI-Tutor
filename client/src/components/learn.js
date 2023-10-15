import React from 'react'
import SpeechToText from './SpeechToText';
//import "./learn.css";

const Assess = (props) => {
    const timeLimit = 180000; // 3 minutes
    console.log(props.locationstate);

    return (
        <div>
            <p className="prompt"></p>
            <SpeechToText timeLimit={timeLimit} />
        </div>
    )
}

export default Assess