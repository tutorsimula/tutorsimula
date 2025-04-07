import React from 'react';

const FeedbackModal = ({
  showFeedbackModal,
  setShowFeedbackModal,
  feedbackRating,
  setFeedbackRating,
  feedbackComment,
  setFeedbackComment,
  feedbackSubmitted,
  submitFeedback,
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      {feedbackSubmitted ? (
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
          <p className="text-gray-600">Your feedback has been submitted.</p>
        </div>
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-4">We’d Love Your Feedback!</h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Rate your experience (1-5):</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setFeedbackRating(star)}
                  className={`text-2xl ${feedbackRating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Comments:</label>
            <textarea
              value={feedbackComment}
              onChange={(e) => setFeedbackComment(e.target.value)}
              className="w-full p-2 border rounded"
              rows="4"
              placeholder="Tell us about your experience..."
            />
          </div>
          <div className="flex justify-between">
            <button onClick={() => setShowFeedbackModal(false)} className="text-gray-500 hover:text-gray-700">
              Cancel
            </button>
            <button
              onClick={submitFeedback}
              disabled={feedbackRating === 0}
              className={`px-4 py-2 rounded text-white ${
                feedbackRating === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              } transition-colors`}
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  </div>
);

export default FeedbackModal;