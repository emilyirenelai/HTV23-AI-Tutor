import React, {useRef} from 'react';
import "./prep.css";
import { Link } from 'wouter';
import axios from "axios";

function Upload() {
    const inputRef = useRef(null);

  const clickInput = () => {
    inputRef.current.click();
  };

  const onFileChange = (e) => {
    let upload = e.target.files;
    if (upload.length < 1) return;
    let fileUpload = new FormData();
    fileUpload.append("file", upload[0]);

    axios({
      method: "post",
      url: "http://localhost:3001/upload",
      data: fileUpload
    }).then(response => {
        // Handle success here
        console.log(response.data);
      })
      .catch(error => {
        // Handle error here
        console.error("Error uploading file:", error);
      });
  };

    return (
        <div className="App">
            <div>
              <div>
                <h2>Upload Your Notes</h2>
              </div>
                <div className="drop-zone" onClick={clickInput}>
                <span className="drop-zone__prompt">
                    Drop file here or click to upload
                </span>
                <input type="file" name="file" className="drop-zone__input" ref={inputRef} onChange={onFileChange}/>
                </div>
            </div>

            <div >
                <Link to="/learn"><button className='buttonStyle'>Learn with Tutor Bo</button></Link>
            </div>
        </div>
    );
}

export default Upload;