import React, { useState } from 'react';
import SpeechToText from './SpeechToText';

const Assess = ({ data }) => {
  const [loading] = useState(false); // Assuming you have some loading mechanism
  const timeLimit = 180000; // 3 minutes

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>
            <SpeechToText timeLimit={timeLimit} data={data} />
          </div>
        </>
      )}
    </div>
  );
}

export default Assess;
