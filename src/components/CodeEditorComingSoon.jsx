import React, { useState } from 'react';

const CodeEditorComingSoon = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback:', feedback); // Placeholder—add API later
    alert('Thanks for your input!');
    setFeedback('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-purple-400 mb-4 animate-pulse">
        Code Editor Coming Soon...
      </h1>
      <p className="text-lg text-gray-200 text-center max-w-md mb-6">
        Get ready to code with TutorSimula! Our AI-powered Code Editor is being crafted for an interactive Python experience. Stay tuned!
      </p>
      <button
        className="bg-gradient-to-r from-green-600 to-green-800 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-green-900 shadow-lg shadow-green-500/20 transform hover:scale-105 transition-all duration-300"
        onClick={() => window.location.href = '/'}
      >
        Back to Home
      </button>
      <form onSubmit={handleSubmit} className="mt-8 w-full max-w-md">
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="What would you like to see in our Code Editor?"
          className="w-full p-3 rounded-lg bg-gray-800/50 text-gray-200 border border-gray-700 focus:outline-none focus:border-purple-500"
          rows="3"
        />
        <button
          type="submit"
          className="mt-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-900 shadow-lg shadow-purple-500/20 transform hover:scale-105 transition-all duration-300"
        >
          Send Feedback
        </button>
      </form>
      <p className="text-sm text-gray-400 mt-8">
        © 2025 TutorSimula | Empowering Global Learners
      </p>
    </div>
  );
};

export default CodeEditorComingSoon;