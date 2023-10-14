import React, {useState} from 'react';
import "./prep.css";
import { Link } from 'wouter';


function GetNotes() {

    const [file, setFile] = useState(null);

    const onFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

    return (
        <div>
            <div className='bordered-div'>
                <h1>Upload a File to Learn with Bo</h1>
                <input type="file" onChange={onFileChange} />
            </div>
            <div className='bordered-div'>
                <h1>Scan with AR and Play with Bo</h1>
                <Link to="/ar"><button >Scan with AR</button></Link>
            </div>
        </div>
    );
}

export default GetNotes;