import React, { useState, useEffect, useRef } from 'react';

const Explanation = ({ 
  explanation, 
  onComplete, 
  setAvatarMessage, 
  setAvatarExpression, 
  setRightScreenContent,
  isPlaying,
  setIsPlaying,
  isPaused,
  speechRate,
  setSpeechRate,
  sliderValue,
  setSliderValue,
  speedChangeTrigger
}) => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPostSpeech, setIsPostSpeech] = useState(false);
  const currentUtteranceRef = useRef(null);
  const currentPositionRef = useRef(0); // Track speech position
  const lines = explanation.text.split('\n').filter(Boolean);
  const rightScreenContent = explanation.rightScreenContent || [];
  const maxLines = 3;

  // Sync sliderValue with currentIndex
  useEffect(() => {
    if (sliderValue !== currentIndex) {
      window.speechSynthesis.cancel();
      currentUtteranceRef.current = null;
      setCurrentIndex(sliderValue);
      const newLines = lines.slice(Math.max(0, sliderValue - maxLines + 1), sliderValue + 1);
      setDisplayedLines(newLines);
      const currentRightContent = rightScreenContent[sliderValue] || {};
      setRightScreenContent({ 
        image: currentRightContent.image || null, 
        text: currentRightContent.text || null 
      });
      if (isPlaying && !isPaused) {
        setIsComplete(false);
        setIsSpeaking(false);
        setIsPostSpeech(false);
        currentPositionRef.current = 0;
        speakAndAdvance(sliderValue);
      }
    }
  }, [sliderValue, isPlaying, isPaused, lines, rightScreenContent, setRightScreenContent]);

  // Auto-advance when playing and not paused
  useEffect(() => {
    console.log('useEffect - Playing:', isPlaying, 'Paused:', isPaused, 'Complete:', isComplete, 'Index:', currentIndex, 'Speaking:', isSpeaking, 'PostSpeech:', isPostSpeech, 'Trigger:', speedChangeTrigger);
    if (!isComplete && isPlaying && !isPaused && currentIndex < lines.length && !isSpeaking) {
      setIsSpeaking(true);
      setIsPostSpeech(false);
      currentPositionRef.current = 0;
      speakAndAdvance(currentIndex);
    } else if (currentIndex >= lines.length && !isComplete) {
      setIsComplete(true);
    }
  }, [currentIndex, isPlaying, isPaused, isComplete, lines.length, speedChangeTrigger]);

  // Handle speed change mid-speech
  useEffect(() => {
    if (speedChangeTrigger > 0 && isSpeaking && currentUtteranceRef.current) {
      const currentText = currentUtteranceRef.current.text;
      const currentOnEnd = currentUtteranceRef.current.onend;
      const position = currentPositionRef.current;
      window.speechSynthesis.cancel();
      const remainingText = position > 0 ? currentText.slice(position).trim() : currentText;
      if (remainingText) {
        const newUtterance = new SpeechSynthesisUtterance(remainingText);
        newUtterance.rate = speechRate;
        newUtterance.pitch = 1.0;
        newUtterance.volume = 1.0;
        newUtterance.onend = currentOnEnd;
        newUtterance.onboundary = (event) => {
          currentPositionRef.current = event.charIndex;
          console.log('Boundary - Position:', event.charIndex, 'Text:', remainingText);
        };
        currentUtteranceRef.current = newUtterance;
        window.speechSynthesis.speak(newUtterance);
        console.log('Speed adjusted mid-speech:', remainingText, 'at', speechRate, 'PostSpeech:', isPostSpeech, 'Position:', position);
      }
    }
  }, [speedChangeTrigger, speechRate]);

  // Handle completion
  useEffect(() => {
    if (isComplete) {
      localStorage.removeItem(`lesson_${explanation.text}_index`);
      setAvatarMessage('Lesson complete! What next?');
      setAvatarExpression('dancing');
      setRightScreenContent({ image: null, text: null });
      setIsPlaying(false);
      const completionUtterance = new SpeechSynthesisUtterance('Lesson complete! What next?');
      completionUtterance.rate = speechRate;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(completionUtterance);
    }
  }, [isComplete, explanation.text, setAvatarMessage, setAvatarExpression, setRightScreenContent, speechRate]);

  // Save progress
  useEffect(() => {
    if (!isComplete) {
      localStorage.setItem(`lesson_${explanation.text}_index`, currentIndex.toString());
    }
  }, [currentIndex, explanation.text, isComplete]);

  const speakAndAdvance = (index) => {
    console.log('speakAndAdvance - Index:', index, 'Rate:', speechRate, 'Speaking:', isSpeaking, 'Paused:', isPaused);
    if (index >= lines.length) {
      setIsComplete(true);
      setIsSpeaking(false);
      setIsPostSpeech(false);
      return;
    }

    if (!isPlaying || isPaused) {
      setIsSpeaking(false);
      setIsPostSpeech(false);
      return;
    }

    const currentLine = lines[index];
    const currentRightContent = rightScreenContent[index] || {};

    setDisplayedLines((prev) => {
      const newLines = prev.filter((line) => lines.indexOf(line) < index);
      if (!newLines.includes(currentLine)) newLines.push(currentLine);
      return newLines.slice(-maxLines);
    });

    setAvatarMessage('Keep reading!');
    setAvatarExpression('happy');
    setRightScreenContent({ 
      image: currentRightContent.image || null, 
      text: currentRightContent.text || null 
    });

    const lineUtterance = new SpeechSynthesisUtterance(currentLine);
    lineUtterance.rate = speechRate;
    lineUtterance.pitch = 1.0;
    lineUtterance.volume = 1.0;
    lineUtterance.onboundary = (event) => {
      currentPositionRef.current = event.charIndex;
      console.log('Boundary - Position:', event.charIndex, 'Text:', currentLine);
    };
    currentUtteranceRef.current = lineUtterance;

    lineUtterance.onend = () => {
      setIsSpeaking(false);
      currentUtteranceRef.current = null;
      currentPositionRef.current = 0;
      console.log('Speech ended - Index:', index, 'Playing:', isPlaying, 'Paused:', isPaused);
      if (!isPlaying || isPaused) return;
      if (currentRightContent.postSpeech) {
        const postSpeech = Array.isArray(currentRightContent.postSpeech)
          ? currentRightContent.postSpeech
          : [currentRightContent.postSpeech];
        
        let postIndex = 0;
        const speakPostSpeech = () => {
          if (postIndex >= postSpeech.length || !isPlaying || isPaused) {
            setRightScreenContent({ image: null, text: null });
            setCurrentIndex(index + 1);
            setSliderValue(index + 1);
            setIsPostSpeech(false);
            return;
          }

          const { text, image } = postSpeech[postIndex];
          setRightScreenContent({ image: image || null, text: text || null });

          const postUtterance = new SpeechSynthesisUtterance(text);
          postUtterance.rate = speechRate;
          postUtterance.pitch = 1.0;
          postUtterance.volume = 1.0;
          postUtterance.onboundary = (event) => {
            currentPositionRef.current = event.charIndex;
            console.log('Boundary - Position:', event.charIndex, 'Text:', text);
          };
          currentUtteranceRef.current = postUtterance;
          postUtterance.onend = () => {
            setIsSpeaking(false);
            currentPositionRef.current = 0;
            postIndex++;
            speakPostSpeech();
          };
          window.speechSynthesis.speak(postUtterance);
          setIsSpeaking(true);
          setIsPostSpeech(true);
          console.log('Speaking postSpeech:', text, 'at', speechRate);
        };
        speakPostSpeech();
      } else {
        setRightScreenContent({ image: null, text: null });
        setCurrentIndex(index + 1);
        setSliderValue(index + 1);
      }
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(lineUtterance);
    console.log('Speaking:', currentLine, 'at', speechRate);
  };

  return (
    <div className="space-y-2">
      {displayedLines.map((line, index) => (
        <div key={index}>
          {index === displayedLines.length - 1 ? (
            <p className="text-2xl font-bold text-blue-600">{line}</p>
          ) : (
            <p className="text-gray-700 text-sm">{line}</p>
          )}
        </div>
      ))}
      {isComplete && (
        <div className="mt-4 space-y-2">
          <p className="text-gray-700 text-sm">Do you want to listen to the lesson again or move on?</p>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                window.speechSynthesis.cancel();
                setDisplayedLines([]);
                setCurrentIndex(0);
                setSliderValue(0);
                setIsComplete(false);
                setIsPlaying(true);
                setIsPostSpeech(false);
                currentPositionRef.current = 0;
                setAvatarMessage('Let’s go through it again!');
                setAvatarExpression('happy');
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Listen Again
            </button>
            <button
              onClick={() => {
                window.speechSynthesis.cancel();
                onComplete();
                setRightScreenContent({ image: null, text: null });
              }}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Next Step
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explanation;