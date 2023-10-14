import React from 'react';
//import "./prep.css";
import { Link } from 'wouter';

function GetNotes() {
    return (
        <div>
            <button>Upload Files</button>
            <Link to="/ar"><button >Scan with AR</button></Link>
        </div>
    );
}

export default GetNotes;