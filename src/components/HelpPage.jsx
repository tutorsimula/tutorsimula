import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const HelpPage = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: 'Why isn’t my code running?',
      answer:
        'Ensure you’ve written some code in the editor and clicked the “Run Code” button. If you see “Python is still loading...”, wait a few seconds for the Python runtime to initialize. Check the output panel for error messages and use the “Hint” button for guidance.',
    },
    {
      question: 'How do I track my progress?',
      answer:
        'Select a lesson from the dropdown in the left panel. When you run code successfully, the lesson will be marked as completed with a checkmark. You can see your progress bar and completed lessons below the lesson selector.',
    },
    {
      question: 'Can I reset my code?',
      answer:
        'Yes! Click the “Clear Code” button to reset the code editor and output. This will also reset the avatar’s message to encourage you to start coding again.',
    },
    {
      question: 'How do I get help while coding?',
      answer:
        'Use the “Hint” button in the code editor to get a su ggestion from the avatar. You can also visit this Help page for more detailed guidance or return to the main app to continue learning.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex flex-col pt-16">
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-5xl mx-auto">
          {/* Page Title */}
          <h1 className="text-5xl font-extrabold text-center text-purple-400 mb-8">
            Help & Support
          </h1>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white text-center mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="p-6 bg-gray-800 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 transition-all duration-300 shadow-glow-blue"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Footer (Optional) */}
      <footer className="bg-gray-900 text-gray-400 p-4 text-center">
        <p>© 2025 TutorSimula. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HelpPage;