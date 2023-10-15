import React from 'react';
import "./prep.css";
import { Link } from 'wouter';

function GetNotes() {
    return (
        <div className="App"> 
          <h2>Scan or upload the material you need help with!</h2>

            <div>
                <Link to="/upload"><button className='buttonStyle' >Upload </button></Link>
            </div>

            <div >
                <Link to="/ar"><button className='buttonStyle'>Camera</button></Link>
            </div>
        </div>
    );
}

export default GetNotes;