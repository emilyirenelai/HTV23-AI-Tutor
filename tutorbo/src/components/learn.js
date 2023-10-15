import React, { useState } from 'react';
import SpeechToText from './SpeechToText';

const Assess = () => {
    const timeLimit = 180000; // 3 minutes
    const [cohereQuestion, setCohereQuestion] = useState(null);
    const [askedQuestions, setAskedQuestions] = useState(new Set()); // Track asked questions
    const [loading, setLoading] = useState(false);

    const fetchQuestion = () => {
        setLoading(true);
        fetch('https://api.cohere.ai/v1/infer/YOUR_MODEL_NAME', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer YOUR_API_KEY',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: "Generate a question for the user." // Adjust as needed
            })
        })
        .then(res => res.json())
        .then(data => {
            if (askedQuestions.has(data.output)) {
                // If question already asked, fetch a new one
                fetchQuestion();
            } else {
                // Otherwise, set question and add to askedQuestions set
                setCohereQuestion(data.output);
                setAskedQuestions(prevQuestions => new Set([...prevQuestions, data.output]));
                setLoading(false);
            }
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
            setLoading(false);
        });
    };

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <p>BO is Here</p>
                    
                    <p>Generated Question from Cohere:</p>
                    <p><strong>{cohereQuestion}</strong></p>

                    <div>
                    <SpeechToText timeLimit={timeLimit} />
                    </div>

                    <button onClick={fetchQuestion}>Next Question</button>
                </>
            )}
        </div>
    );
}

export default Assess;
