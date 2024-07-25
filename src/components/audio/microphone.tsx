"use client";
import "regenerator-runtime";
import React, { useState, useEffect } from "react";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface MicrophoneComponentProps {
    className:string;
    disabled:boolean;
    setText:(text:string)=>void;
    onSubmitt:()=>void;
}

export const MicrophoneComponent = ({className, disabled, setText, onSubmitt}: MicrophoneComponentProps) => {
  const [isBrowser, setIsBrowser] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    setText(transcript)
  }, [transcript]);

  if (!isBrowser) {
    return null; // or a loading indicator
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support speech to text feature</span>;
  }
  const handleRecording = () => {
    if (listening) {
        SpeechRecognition.stopListening();
        onSubmitt()
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  return (
      <button disabled={disabled} className={className} type="button" onClick={() => handleRecording()}>
        {listening ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20" strokeWidth={1.25} fill="currentColor" className="w-6 h-6">
                <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
            </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.25} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
            </svg>
        )}
      </button>
  );
};
