import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ setShowFeedbackModal, children }) => (
  <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
    <div className="flex items-center">
      <img src="/tutorsimula-logo.png" alt="TutorSimula Logo" className="h-12 mr-4" />
      <h1 className="text-xl font-semibold">Python Code Editor</h1>
    </div>
    <div className="flex space-x-4 items-center">
      {children} {/* Add Reset Size and Full Screen Code buttons here */}
      <button
        onClick={() => setShowFeedbackModal(true)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
      >
        Give Feedback
      </button>
      <Link to="/help" className="help-button bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
        Help
      </Link>
    </div>
  </header>
);

export default Header;