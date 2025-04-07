import React, { useEffect, useState, useMemo } from 'react';

const Questions = ({ questions, onComplete, setAvatarMessage, setAvatarExpression }) => {
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    setAvatarMessage('Let’s see what you’ve learned!');
    setAvatarExpression('thinking');
  }, [setAvatarMessage, setAvatarExpression]);

  const handleAnswer = (index, option) => {
    setAnswers((prev) => ({ ...prev, [index]: option }));
    if (option === questions[index].correctAnswer) {
      setAvatarMessage('Correct! Great job!');
      setAvatarExpression('dancing');
    } else {
      setAvatarMessage('Not quite. Try again!');
      setAvatarExpression('thinking');
    }
  };

  // Recalculate allCorrect whenever answers or questions change
  const allCorrect = useMemo(() => {
    return questions.every((q, i) => answers[i] === q.correctAnswer);
  }, [answers, questions]);

  const allAnswered = questions.every((_, i) => answers[i] !== undefined);

  return (
    <div className="space-y-4">
      {questions.map((q, index) => (
        <div key={index}>
          <p className="text-gray-700">{q.question}</p>
          {q.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(index, option)}
              className={`block w-full p-2 mt-2 rounded ${
                answers[index] === option
                  ? option === q.correctAnswer
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      ))}
      {allAnswered && allCorrect && (
        <button
          onClick={() => {
            setAvatarMessage('Awesome! On to coding practice!');
            setAvatarExpression('happy');
            onComplete();
          }}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Next: Coding Practice
        </button>
      )}
    </div>
  );
};

export default Questions;