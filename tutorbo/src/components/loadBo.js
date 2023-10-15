import React from 'react';
import { Link } from 'wouter';
import "./loadBo.css";

import bo from "./bo.png";

function LoadBo() {
    return (
        <div className="main">
            <div className="header">
                <h1>Meet Tutor Bo</h1>
                <h1>Your own personal study buddy!</h1>
            </div>
                <img src={bo} alt="TutorBo" class="bo"/>
            <div>
            <Link to="/prep"><button className='start'>Let's Learn</button></Link>
            </div>
        </div>
    );
}

export default LoadBo;