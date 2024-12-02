import { useState } from 'react';

export const useTextToSpeech = () => {
  const [transcription, setTranscription] = useState('');
  const [recognizer, setRecognizer] = useState<SpeechRecognition | null>(null);

  const startListening = () => {
    if (window.SpeechRecognition || (window as any).webkitSpeechRecognition) {
      const recognition = new (window.SpeechRecognition || (window as any).webkitSpeechRecognition)();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        console.log("Voice recognition started");
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let result = event.results[event.resultIndex];
        if (result && result[0]) {
          const transcript = result[0].transcript;

          // Update transcription only if the result is final
          if (event.results[0].isFinal) {
            setTranscription(transcript); // Store only final result
            console.log("Final Transcription:", transcript);
          } else {
            console.log("Interim Transcription:", transcript);
          }
        }
      };

      recognition.onend = () => {
        console.log("Voice recognition stopped");
        setRecognizer(null); // Reset recognizer state
        setTranscription(''); // Clear transcription when stopping
      };

      recognition.onerror = (event) => {
        console.error("Error occurred in speech recognition:", event.error);
      };

      setRecognizer(recognition);
      recognition.start();
    } else {
      alert("Speech recognition is not supported in your browser.");
    }
  };

  const stopListening = () => {
    if (recognizer) {
      recognizer.stop();
      setRecognizer(null); // Reset recognizer state
      setTranscription(''); // Clear transcription when stopping
    }
  };

  return { transcription, startListening, stopListening };
};


