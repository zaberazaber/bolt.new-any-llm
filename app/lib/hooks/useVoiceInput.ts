import { useState } from 'react';
import { useTextToSpeech } from '~/lib/hooks/useTextToSpeech';

export const useVoiceInput = (
  input: string,
  handleInputChange: ((event: React.ChangeEvent<HTMLTextAreaElement>) => void) | undefined
) => {
  const [isListening, setIsListening] = useState(false);
  const { transcription, startListening, stopListening } = useTextToSpeech();

  const toggleListening = () => {
    if (isListening) {
      console.log("Stopping listening...");
      stopListening();
      if (transcription && handleInputChange) {
        console.log("Transcription:", transcription);
        // Append transcription to the textarea value
        handleInputChange?.({
          target: { value: input + (input ? " " : "") + transcription },
        } as React.ChangeEvent<HTMLTextAreaElement>);
      }
    } else {
      console.log("Starting listening...");
      startListening();
    }
    setIsListening(!isListening);
  };

  return {
    isListening,
    toggleListening,
    transcription,
  };
};
