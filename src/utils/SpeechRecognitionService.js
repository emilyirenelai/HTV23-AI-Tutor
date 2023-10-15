class SpeechRecognitionService {
    constructor() {
      this.recognition = null;
      this.finalText = '';
      this.onResultCallback = null;
    }
  
    startRecording(timeLimit) {
      this.finalText = '';
      this.recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
      this.recognition.interimResults = true;
      this.recognition.continuous = true;
  
      this.recognition.onresult = (event) => {
        let accumulatedText = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcript = result[0].transcript;
          if (result.isFinal) {
            this.finalText += transcript + ' ';
            accumulatedText += transcript + ' ';
          }
        }
  
        if (typeof this.onResultCallback === 'function') {
          this.onResultCallback(accumulatedText.trim());
        }
      };
  
      this.recognition.start();
  
      setTimeout(() => {
        this.stopRecording();
      }, timeLimit);
    }
  
    stopRecording() {
      if (this.recognition) {
        this.recognition.stop();
        this.recognition = null;
      }
    }
  
    getFinalText() {
      return this.finalText.trim();
    }
  
    setOnResultCallback(callback) {
      this.onResultCallback = callback;
    }
  }
  
export default SpeechRecognitionService;
  