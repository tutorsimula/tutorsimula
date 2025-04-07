import React, { useState } from 'react';

const CodingPractice = ({ practice, onComplete, code, setCode, runPython, setAvatarMessage, setAvatarExpression }) => {
  const [localOutput, setLocalOutput] = useState('');

  const handleSubmit = async () => {
    const result = await runPython();
    if (result) { // Ensure result is not undefined
      setLocalOutput(result);
      checkOutput(result);
    }
  };

  const checkOutput = (output) => {
    const { criteria } = practice;
    const trimmedOutput = output.trim().toLowerCase();

    // Check if required value is present
    const includesKey = criteria.mustInclude.some((word) => trimmedOutput.includes(word.toLowerCase()));
    // Check for disallowed values (e.g., wrong years)
    const includesDisallowed = criteria.mustNotInclude.some((word) => trimmedOutput.includes(word.toLowerCase()));
    // Check for negative words (e.g., "not", "wrong")
    const includesNegative = criteria.negativeWords.some((word) => trimmedOutput.includes(word.toLowerCase()));
    // Check length to filter gibberish
    const isTooLong = trimmedOutput.length > criteria.maxLength;

    if (includesKey && !includesDisallowed && !includesNegative && !isTooLong) {
      setAvatarMessage('Perfect! Let’s move to the live test!');
      setAvatarExpression('dancing');
      onComplete();
    } else {
      let feedback = 'Not quite right. ';
      if (!includesKey) {
        feedback += 'Make sure to include the correct year (1991).';
      } else if (includesDisallowed) {
        feedback += 'Your answer contains an incorrect year.';
      } else if (includesNegative) {
        feedback += 'Your answer seems contradictory.';
      } else if (isTooLong) {
        feedback += 'Your answer is too long. Keep it concise.';
      }
      setAvatarMessage(feedback);
      setAvatarExpression('sad');
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-xl font-bold text-blue-600">{practice.task}</p>
      {/* No editor or button here—handled by RightPanel */}
      {localOutput && <p className="text-gray-700 text-sm">Output: {localOutput}</p>}
    </div>
  );
};

export default CodingPractice;