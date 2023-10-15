import React, { useEffect, useState } from 'react';
import SpeechRecognitionService from '../utils/SpeechRecognitionService';
import mic from './mic.png';

const SpeechToText = ({ timeLimit, data }) => {
  const [liveText, setLiveText] = useState('');
  const [isRecording, setIsRecording] = useState(true);
  const [finalText, setFinalText] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const speechRecognition = new SpeechRecognitionService();

    const handleResult = (accumulatedText) => {
      setLiveText((prevText) => prevText + ' ' + accumulatedText);
    };

    speechRecognition.setOnResultCallback(handleResult);

    if (isRecording) {
      speechRecognition.startRecording(timeLimit);
    } else {
      const recordedText = speechRecognition.getFinalText();
      setFinalText(recordedText);
      submit_voice_record(recordedText);
    }

    return () => {
      speechRecognition.stopRecording();
    };
  }, [timeLimit, isRecording]);


  const submit_voice_record = (recordedText) => {
    const submitText = recordedText;

    fetch("http://localhost:3001/", {
      mode: 'no-cors',
      method: "POST",
      body: JSON.stringify({
        text: submitText,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        console.log(data.score);
      })
      .catch(error => console.error(error));
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < data.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsRecording(true); // To start recording the answer for the next question
    } else {
      console.log("All questions answered.");
      // Implement further logic when all questions are answered if needed
    }
  };

  return (
    <div>
      <h2>Question: {data.questions[currentQuestionIndex]}</h2>
      <h2>Tell me your answer</h2>
      <p>{liveText}</p>
      {isRecording && <img className="mic" src={mic} alt="microphone" /> && <p><b>Recording in Progress:</b> click mic to stop recording</p>}
      {!isRecording && <p>Recording stopped.</p>}
      {isRecording && <button onClick={handleStopRecording}><img className="mic" src={mic} alt="microphone" /></button>}
      {!isRecording && (
        <div>
          <div className="result">
            <h2>Final Text:</h2>
            <p>{finalText}</p>
          </div>
        </div>
      )}
      <button onClick={handleNextQuestion}>Next Question</button>
    </div>
  );
};

export default SpeechToText;
