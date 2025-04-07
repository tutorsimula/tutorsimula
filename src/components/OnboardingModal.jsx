import React from 'react';

const OnboardingModal = ({ steps, currentStep, nextStep, skipTour }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
      <h3 className="text-xl font-semibold mb-2">{steps[currentStep].title}</h3>
      <p className="text-gray-600 mb-4">{steps[currentStep].description}</p>
      <div className="flex justify-between">
        <button onClick={skipTour} className="text-gray-500 hover:text-gray-700">
          Skip Tour
        </button>
        <button
          onClick={nextStep}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  </div>
);

export default OnboardingModal;