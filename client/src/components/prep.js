import React from 'react';
import "./prep.css";
import { Link } from 'wouter';

function GetNotes() {
    return (
        <div className="App"> 
          <h1>Scan or upload the material you need help with!</h1>

            <div className='buttonStyle'>
                <Link to="/upload"><button className='buttonStyle' >Upload</button></Link>
            </div>

            <div className='buttonStyle' >
                <Link to="/ar"><button className='buttonStyle'>Scan</button></Link>
            </div>
        </div>
    );
}

export default GetNotes;