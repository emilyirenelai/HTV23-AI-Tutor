import React, { useRef, useState } from 'react';
import "./prep.css";
import axios from "axios";
import SpeechToText from './SpeechToText';
import Assess from './learn';  // Import Assess if it's not imported yet

function Upload() {
  const timeLimit = 180000; // 3 minutes
  const inputRef = useRef(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const clickInput = () => {
    inputRef.current.click();
  };

  const onFileChange = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    axios.post("http://localhost:3001/upload", formData, {})
    .then(res => {
      return axios.post("http://localhost:3001/recognize", { blobName: res.data.blobName });
    })
    .then(response => {
      return axios.post("http://localhost:3001/generate", { text: response.data.text });
    })
    .then(respo => {
      setQuestions(respo.data.questions);
      setAnswers(respo.data.answers);
    })
    .catch(error => {
      console.log(error);
    });
  };

  return (
    <div className="App">
      <div>
        <div className="drop-zone" onClick={clickInput}>
          <span className="drop-zone__prompt">Drop file here or click to upload</span>
          <input type="file" name="file" className="drop-zone__input" ref={inputRef} onChange={onFileChange} />
        </div>
      </div>
      <div>
        <p className="prompt"></p>
        <SpeechToText timeLimit={timeLimit} data={{ questions, answers }} />
        <Assess data={{ questions, answers }} />  {/* Pass data to Assess */}
      </div>
    </div>
  );
}

export default Upload;
