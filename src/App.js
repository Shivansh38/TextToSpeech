import "./App.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import {useState} from "react";
const App = () => {
  // State variables
  const [textToCopy, setTextToCopy] = useState();
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000
  });

  // Start speech recognition
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: 'en-In' });
  
  // Get transcript and browser support information
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // Return null if browser doesn't support speech recognition
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  // Render the component
  return (
    <>
      <div className="container">
        <h2>Speech to Text Converter</h2>
        <br/>
        <p>A React hook that converts speech from the microphone to text and makes it available to your React components.</p>

        <div className="main-content" onClick={() => setTextToCopy(transcript)}>
          {transcript}
        </div>

        <div className="btn-style">
          <button onClick={setCopied}>
            {isCopied ? 'Copied!' : 'Copy to clipboard'}
          </button>
          <button onClick={startListening}>Start Listening</button>
          <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
        </div>
      </div>
    </>
  );
};

export default App;


