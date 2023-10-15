import React, { useEffect, useState } from 'react';
import SpeechRecognitionService from '../utils/SpeechRecognitionService';
import "./learn.css";

import mic from './mic.png'

const SpeechToText = ({ timeLimit }) => {
  const [liveText, setLiveText] = useState('');
  const [isRecording, setIsRecording] = useState(true);
  const [finalText, setFinalText] = useState('');

  useEffect(() => {
    const speechRecognition = new SpeechRecognitionService();

    const handleResult = (accumulatedText) => {
      setLiveText((prevText) => prevText + ' ' + accumulatedText);
    };

    speechRecognition.setOnResultCallback(handleResult);

    if (isRecording) {
      speechRecognition.startRecording(timeLimit);
    }

    return () => {
      const recordedText = speechRecognition.getFinalText();
      setFinalText(recordedText);
      speechRecognition.stopRecording();
      submit_voice_record(recordedText);
    };
  }, [timeLimit, isRecording]);

  const submit_voice_record = (recordedText) => {
    const submitText = recordedText;

    fetch("http://localhost:8000/classify/",
    {
      mode: 'no-cors',
      method : "POST",
      body: JSON.stringify({
        text: submitText,
      }),
      headers: {"Content-Type": "application/json"},
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        console.log(data.score);
      })
      .catch(error => console.error(error));
  };

  /*const submit_voice_record = (recordedText) => {
    const submitText = recordedText;

    // Step 1: Send the user's response to your local server
    fetch("http://localhost:8000/classify/", {
      mode: 'no-cors',
      method: "POST",
      body: JSON.stringify({
        text: submitText,
      }),
      headers: {"Content-Type": "application/json"},
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.score);

      // Step 2: Call Cohere's API to get the expected answer (modify as necessary)
      return fetch('https://api.cohere.ai/v1/infer/YOUR_MODEL_NAME', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // Replace with the appropriate payload for your Cohere API request
          prompt: "YOUR_QUESTION_TO_COHERE"
        })
      });
    })
    .then(response => response.json())
    .then(cohereData => {
      // Compare user's response with Cohere's output
      if (finalText === cohereData.output) {
        console.log("User's response matches Cohere's output!");
      } else {
        console.log("User's response doesn't match Cohere's output.");
      }
    })
    .catch(error => console.error(error));
};*/

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  return (
    <div>
      <h2>Tell me your answer</h2>
      <p>{liveText}</p>
      {isRecording && <img class="mic" src={mic} alt="microphone"/> && <p><b>Recording in Progresss:</b> click mic to stop recording</p>}
      {!isRecording && <p>Recording stopped.</p>}
      {isRecording && <button onClick={handleStopRecording}><img class="mic" src={mic} alt="microphone"/></button>}
      {!isRecording && (
        <div class="result">
          <h2>Final Text:</h2>
          <p>{finalText}</p>
        </div>
      )}
    </div>
  );
};

export default SpeechToText;