import React, { useState, useEffect } from 'react';
import noteContext from '../context/noteContext';
import { useContext } from 'react';


const SpeechRecorder = () => {
  const context = useContext(noteContext)
  const { notes,addNote,deleteNote,getNotes,api } = context;
  const [transcription, setTranscription] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [response,setResponse] = useState(null);
  let recognition;

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'en-US';

      recognition.onresult = async(event) => {
        const result = event.results[event.results.length - 1][0].transcript;
        await setTranscription(result);
        sendRequest(result)
      };

      recognition.onend = () => {
        setIsRecording(false);
        
      };
    } else {
      console.log("Web Speech API not available in this browser.");
    }

    return () => {
      if (recognition) {
        recognition.stop();
        recognition.onresult = null;
        recognition.onend = null;
      }
    };
  }, []);
  const sendRequest=async(trans)=>{
      // e.preventDefault();

      console.log(trans)
      const data = await api(trans)
      // const data =await response.json();
      console.log(data.bot)
      // setResponse(data.bot)
      // document.getElementsByClassName("result").innerHTML=data.bot;
      // const resultElement = document.querySelector('.result');
      setResponse(data.bot);

// if (resultElement) {
//   resultElement.innerHTML = data.bot;
// }
  }
  const startRecording = () => {
    if (recognition && !isRecording) {
      recognition.start();
      setIsRecording(true);
    } else if (recognition && isRecording) {
      recognition.stop();
    }
  };

  return (
    <div>
      <h1>Speech Recorder</h1>
      <button onClick={startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <div id="transcription">{transcription}</div>
      {response && (
        <div className="response-container">
          <p className="response">{response}</p>
        </div>
      )}
    </div>
  );
};

export default SpeechRecorder;
