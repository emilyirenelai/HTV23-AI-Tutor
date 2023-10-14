import React from 'react'
import SpeechToText from './SpeechToText';
//import "./learn.css";

const Assess = () => {
    const timeLimit = 180000; // 3 minutes

    return (
        <div>
            <p className="prompt">Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.</p>
            <SpeechToText timeLimit={timeLimit} />
        </div>
    )
}

export default Assess