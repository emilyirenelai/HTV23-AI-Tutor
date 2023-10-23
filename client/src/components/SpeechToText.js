import React, { useEffect, useState } from 'react';
import SpeechRecognitionService from '../utils/SpeechRecognitionService';
import "./prep.css";
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

    const callback = (similarityScore) => {
      const percentageSimilarity = Math.round(similarityScore * 100 * 100) / 100;
      console.log(`Similarity score: ${percentageSimilarity}%`);
      
      if (percentageSimilarity > 50) { // Adjust threshold as needed
        console.log("The answer is similar.");
      } else {
        console.log("The answer is not similar.");
      }
    };

    const submit_voice_record = (recordedText) => {
      const referenceAnswer = data.answers[currentQuestionIndex];
      console.log("The reference " + referenceAnswer);
      console.log("The recorded " + recordedText);
      window.useModel(recordedText, referenceAnswer, callback);
    };

    speechRecognition.setOnResultCallback(handleResult);

    if (isRecording) {
      speechRecognition.startRecording(timeLimit);
    } else {
      //const recordedText = speechRecognition.getFinalText();
      const recordedText = setFinalText(speechRecognition.getFinalText());
      submit_voice_record(recordedText);
    }

    return () => {
      speechRecognition.stopRecording();
    };
  }, [timeLimit, isRecording, data.answers, currentQuestionIndex]);

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < data.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsRecording(true);
      
      // Resetting the user input
      setLiveText('');
      setFinalText('');

    } else {
      console.log("All questions answered.");
    }
  };


  return (
    <div>
      <h2>Question: {data.questions[currentQuestionIndex]}</h2>
      <h2>Tell me your answer</h2>
      <p>{liveText}</p>
      {isRecording && <p><b>Recording in Progress:</b> click mic to stop recording</p>}
      {!isRecording && <p>Recording stopped.</p>}
      {isRecording && <button className="mic" onClick={handleStopRecording}><img className="mic" src={mic} alt="microphone" /></button>}
      {!isRecording && (
        <div>
          <div className="result">
            <h2>Final Text:</h2>
            <p>{finalText}</p>
          </div>
          <button onClick={handleNextQuestion}>Next Question</button>
        </div>
      )}
    </div>
  );
};

export default SpeechToText;