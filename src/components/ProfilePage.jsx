import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import NavBar from './NavBar';

const lessons = [
  { id: 1, title: 'History of Python & Its Importance', topic: 'intro', stages: { /* ... */ } },
  { id: 2, title: 'Basic Operators', topic: 'operators', stages: {} },
  { id: 3, title: 'Conditionals', topic: 'conditionals', stages: {} },
  { id: 4, title: 'Loops', topic: 'loops', stages: {} },
  { id: 5, title: 'Simple Functions', topic: 'functions', stages: {} },
];

const badges = [
  { id: 1, name: 'First Lesson Complete', description: 'Completed your first lesson!', condition: (completedLessons) => completedLessons.length >= 1 },
  { id: 2, name: 'Python Novice', description: 'Completed 3 lessons!', condition: (completedLessons) => completedLessons.length >= 3 },
];

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const totalLessons = lessons.length;

  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem('completedLessons');
    return saved ? JSON.parse(saved) : user?.completedLessons || [];
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentLessonId, setCurrentLessonId] = useState(() => {
    const saved = localStorage.getItem('currentLessonId');
    const parsedSaved = saved ? parseInt(saved, 10) : NaN;
    const nextLessonId = completedLessons.length > 0 ? Math.max(...completedLessons) + 1 : 1;
    return !isNaN(parsedSaved) && parsedSaved <= totalLessons ? parsedSaved : nextLessonId;
  });
  const [earnedBadges, setEarnedBadges] = useState(() => {
    const saved = localStorage.getItem('earnedBadges');
    return saved ? JSON.parse(saved) : user?.badges || [];
  });
  const [showWarning, setShowWarning] = useState(null);

  const currentLesson = lessons.find((l) => l.id === currentLessonId) || lessons[0];
  const isNewUser = completedLessons.length === 0;
  const nextLesson = lessons.find((l) => l.id === currentLessonId + 1);

  useEffect(() => {
    localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
    localStorage.setItem('currentLessonId', String(currentLessonId));
    localStorage.setItem('earnedBadges', JSON.stringify(earnedBadges));
  }, [completedLessons, currentLessonId, earnedBadges]);

  const handleLessonSelect = (lessonId) => {
    if (lessonId === 1 || completedLessons.includes(lessonId - 1)) {
      setCurrentLessonId(lessonId);
      navigate('/code-editor', { state: { lessonId, fromProfile: true } });
    } else {
      const missingLessons = lessons
        .filter((l) => l.id < lessonId && !completedLessons.includes(l.id))
        .map((l) => l.title);
      setShowWarning({ lessonId, missingLessons });
    }
  };

  const handleReviewLesson = (lessonId) => {
    navigate('/code-editor', { state: { lessonId, fromProfile: true, review: true } });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex flex-col pt-16">
        <NavBar />
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
          <p className="text-gray-300 text-lg mb-4">Please sign in to view your profile.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 transition-all duration-300 shadow-glow-blue"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex flex-col pt-16">
      <NavBar />
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <h1 className="text-5xl font-extrabold text-center text-purple-400 mb-4">
          Welcome, {user.name}!
        </h1>
        <p className="text-xl text-gray-300 mb-8 text-center">
          {isNewUser
            ? 'Your Python journey starts here! Learn coding, complete lessons, and earn badges.'
            : 'Continue your Python journey with TutorSimula!'}
        </p>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">Your Profile</h2>
          <div className="text-gray-300 text-lg space-y-2">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Username:</strong> {user.username}</p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">
            {isNewUser ? 'Your Progress' : `${user.name}'s Python Journey in TutorSimula`}
          </h2>
          <div className="text-gray-300 text-lg space-y-4">
            <p>
              Lessons Completed: {completedLessons.length}/{totalLessons}
            </p>
            <div className="w-full bg-gray-200 rounded h-4">
              <div
                className="bg-green-500 h-4 rounded"
                style={{ width: `${(completedLessons.length / totalLessons) * 100}%` }}
              />
            </div>
            <p>
              Badges Earned: {earnedBadges.length} {isNewUser && '(Earn your first badge by completing a lesson!)'}
            </p>
            {!isNewUser && (
              <>
                {completedLessons.length > 0 && (
                  <p className="text-green-500">
                    Congratulations {user.name}, you completed{' '}
                    {lessons.find((l) => l.id === Math.max(...completedLessons))?.title}!
                  </p>
                )}
                {nextLesson && (
                  <p>
                    Let's Dive into Next Lesson: <strong>{nextLesson.title}</strong>
                  </p>
                )}
                <p>
                  Your Ongoing Lesson: <strong>{currentLesson.title}</strong>
                </p>
                <button
                  onClick={() => navigate('/code-editor', { state: { lessonId: currentLessonId, fromProfile: true } })}
                  className="bg-gradient-to-r from-green-600 to-green-800 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-green-900 transform hover:scale-105 transition-all duration-300 shadow-glow-green"
                >
                  Continue Coding with {currentLesson.title}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">Available Lessons</h2>
          <ul className="space-y-4">
            {lessons.map((lesson) => (
              <li
                key={lesson.id}
                className="flex justify-between items-center bg-gray-700 p-4 rounded-lg shadow"
              >
                <span className="text-gray-300">
                  {lesson.title} {completedLessons.includes(lesson.id) ? '✔' : ''}
                </span>
                {completedLessons.includes(lesson.id) ? (
                  <button
                    onClick={() => handleReviewLesson(lesson.id)}
                    className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 transition-all duration-300 shadow-glow-blue"
                  >
                    Review
                  </button>
                ) : (
                  <button
                    onClick={() => handleLessonSelect(lesson.id)}
                    className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 transition-all duration-300 shadow-glow-blue"
                  >
                    {lesson.id === currentLessonId && !isNewUser ? 'Continue' : 'Start'}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center text-gray-300 mb-8">
          <p className="text-lg">
            <strong>Tip:</strong> Start with "History of Python & Its Importance" to build a strong foundation!
          </p>
        </div>

        {isNewUser && (
          <button
            onClick={() => handleLessonSelect(1)}
            className="bg-gradient-to-r from-green-600 to-green-800 text-white px-8 py-4 rounded-lg text-xl font-semibold shadow-lg hover:from-green-700 hover:to-green-900 transform hover:scale-105 transition-all duration-300 shadow-glow-green"
          >
            Start Coding Now
          </button>
        )}
      </div>

      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md text-gray-300">
            <h3 className="text-xl font-semibold text-white mb-4">Lesson Prerequisite Warning</h3>
            <p className="mb-4">
              You haven’t completed the following lessons required for{' '}
              <strong>{lessons.find((l) => l.id === showWarning.lessonId)?.title || 'this lesson'}</strong>:
            </p>
            <ul className="list-disc pl-6 mb-4">
              {showWarning.missingLessons.map((title, idx) => (
                <li key={idx}>{title}</li>
              ))}
            </ul>
            <p className="mb-4">
              Skipping these may cause confusion with concepts like{' '}
              {showWarning.missingLessons.map((t) => t.split(' ')[0].toLowerCase()).join(', ')}. If you’re familiar with these, proceed:
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowWarning(null)}
                className="text-gray-400 hover:text-gray-200"
              >
                Back
              </button>
              <button
                onClick={() => {
                  setCurrentLessonId(showWarning.lessonId);
                  navigate('/code-editor', { state: { lessonId: showWarning.lessonId, fromProfile: true } });
                  setShowWarning(null);
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300"
              >
                If You Are Familiar With Previous Lessons, Continue with{' '}
                {lessons.find((l) => l.id === showWarning.lessonId)?.title || 'this lesson'}
              </button>
            </div>
            <div className="mt-4">
              <button
                onClick={() => {
                  const nextLessonId = Math.max(...completedLessons) + 1;
                  setCurrentLessonId(nextLessonId);
                  navigate('/code-editor', { state: { lessonId: nextLessonId, fromProfile: true } });
                  setShowWarning(null);
                }}
                className="bg-gradient-to-r from-green-600 to-green-800 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-900 transition-all duration-300"
              >
                Start Your Next Lesson: {lessons.find((l) => l.id === Math.max(...completedLessons) + 1)?.title || 'Next Lesson'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;