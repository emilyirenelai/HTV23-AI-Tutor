import React, {useRef} from 'react';
import "./prep.css";
import { Link } from 'wouter';
import axios from "axios";
import SpeechToText from './SpeechToText';

function Upload() {
  const timeLimit = 180000; // 3 minutes
  const inputRef = useRef(null);
  var data = { questions: [], answers: [] }

  const clickInput = () => {
    inputRef.current.click();
  };

  const onFileChange = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    axios.post("http://localhost:3001/upload", formData, {})
    .then(res => {
      console.log(res.data.blobName)
      axios.post("http://localhost:3001/recognize", {
        blobName: res.data.blobName
      })
      .then(response => {
        console.log(response.data.text);
        axios.post("http://localhost:3001/generate", {
          text: response.data.text
        })
        .then(respo => {
          data.questions = respo.data.questions;
          data.answers = respo.data.answers;
          console.log(data.questions);
          console.log(data.answers);
        })
      })
    })
    .catch(error => {
      console.log(error)
    })
  };

    return (
        <div className="App">
            <div>
                <div className="drop-zone" onClick={clickInput}>
                <span className="drop-zone__prompt">
                    Drop file here or click to upload
                </span>
                <input type="file" name="file" className="drop-zone__input" ref={inputRef} onChange={onFileChange}/>
                </div>
            </div>

            <div >
                {/* <Link to={{ pathname: '/learn', state: "Hello" }}><button className='buttonStyle'>Learn with Bo</button></Link> */}
                <p className="prompt"></p>
                <SpeechToText timeLimit={timeLimit} />
            </div>
        </div>
    );
}

export default Upload;