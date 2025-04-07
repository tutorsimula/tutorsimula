import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';
import Explanation from './stages/Explanation';
import Questions from './stages/Questions';
import CodingPractice from './stages/CodingPractice';
import LiveTest from './stages/LiveTest';
import MiniProject from './stages/MiniProject';
import RightPanel from './RightPanel';
import LeftPanel from './LeftPanel';
import Header from './Header';
import OnboardingModal from './OnboardingModal';
import FeedbackModal from './FeedbackModal';
import { initializePyodide } from '../pyodideLoader';
import 'react-resizable/css/styles.css';
import { lessons as lessonData } from '../data/lessonData';

const CodeEditorPage = () => {
  const lessons = lessonData;
  const [currentLesson, setCurrentLesson] = useState(lessons[0]);
  const [pyodide, setPyodide] = useState(null);
  const [isPythonLoading, setIsPythonLoading] = useState(true);
  const [pythonLoadError, setPythonLoadError] = useState(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('Loading Python runtime...');
  const [hasError, setHasError] = useState(false);
  const [avatarMessage, setAvatarMessage] = useState('Welcome to TutorSimula!');
  const [avatarExpression, setAvatarExpression] = useState('entry');
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isFullScreenCode, setIsFullScreenCode] = useState(false);
  const [leftWidth, setLeftWidth] = useState(window.innerWidth / 2);
  const [height] = useState(window.innerHeight);
  const [stage, setStage] = useState('explanation');
  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem('completedLessons');
    return saved ? JSON.parse(saved) : [];
  });
  const [isLessonStarted, setIsLessonStarted] = useState(false);
  const [isInactive, setIsInactive] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [rightScreenContent, setRightScreenContent] = useState({ image: null, text: null });
  const inactivityTimer = useRef(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [userName] = useState('User');

  // Inactivity Logic
  const startInactivityTimer = () => {
    if (stage === 'practice') {
      inactivityTimer.current = setTimeout(() => {
        setIsInactive(true);
        setAvatarMessage('Need a hint?');
        setAvatarExpression('thinking');
      }, 15000);
    }
  };

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer.current);
    setIsInactive(false);
    setShowHint(false);
    startInactivityTimer();
  };

  const handleNoHint = () => {
    setIsInactive(false);
    setAvatarMessage('Okay, take your time!');
    setAvatarExpression('happy');
    clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      setIsInactive(true);
      setAvatarMessage('Need a hint?');
      setAvatarExpression('thinking');
    }, 30000);
  };

  useEffect(() => {
    startInactivityTimer();
    return () => clearTimeout(inactivityTimer.current);
  }, [stage]);

  // Pyodide Initialization
  useEffect(() => {
    const loadPyodide = async () => {
      console.log('Initializing Pyodide...');
      try {
        const py = await initializePyodide();
        setPyodide(py);
        setIsPythonLoading(false);
        setOutput('Python is ready!');
        setAvatarMessage('Python is loaded! Ready to code?');
        setAvatarExpression('happy');
      } catch (error) {
        setPythonLoadError(error.message);
        setOutput(`❗ Failed to load Python runtime: ${error.message}`);
        setHasError(true);
        setAvatarMessage('Python failed to load. Please refresh.');
        setAvatarExpression('sad');
      }
    };
    loadPyodide();
  }, []);

  // Lesson Start Logic
  useEffect(() => {
    if (!isLessonStarted) {
      if (completedLessons.includes(currentLesson.id)) {
        setAvatarMessage(`Welcome back, ${userName}! So far in "${currentLesson.title}", you've learned its history. Today, let’s dive deeper. Ready?`);
        setAvatarExpression('happy');
      } else {
        setAvatarMessage(`Welcome, ${userName}! You've selected "${currentLesson.title}". In this lesson, you’ll learn Python’s origins and importance—key foundations for coding mastery. Ready to start?`);
        setAvatarExpression('entry');
      }
    }
  }, [currentLesson, completedLessons, userName, isLessonStarted]);

  const startLesson = () => {
    setIsLessonStarted(true);
    setAvatarMessage('Let’s begin the lesson!');
    setAvatarExpression('happy');
  };

  useEffect(() => {
    localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  // Python Execution
  const runPython = async () => {
    setAvatarMessage('Running your code...');
    setAvatarExpression('thinking');
    if (!pyodide) {
      if (pythonLoadError) {
        setOutput(`❗ Python failed to load: ${pythonLoadError}`);
        setHasError(true);
        setAvatarExpression('sad');
        setAvatarMessage('Python couldn’t load. Please refresh.');
      } else {
        setOutput('Python is still loading...');
        setAvatarExpression('thinking');
        setAvatarMessage('Please wait, Python is loading...');
      }
      return;
    }
    if (!code.trim()) {
      setOutput('❗ Error: Empty code provided');
      setHasError(true);
      setAvatarExpression('sad');
      setAvatarMessage('Oops! No code to run.');
      return;
    }
    setOutput('⏳ Running code...');
    setHasError(false);
    try {
      let fullOutput = '';
      pyodide.setStdout({ batched: (text) => (fullOutput += text + '\n') });
      await pyodide.runPythonAsync(code);
      const result = fullOutput || '✅ Done';
      setOutput(result);
      setAvatarMessage('Great job! Your code worked!');
      setAvatarExpression(result ? 'dancing' : 'happy');
    } catch (err) {
      setOutput(`❗ Error: ${err.message}`);
      setHasError(true);
      setAvatarMessage('Oops! There’s an error in your code.');
      setAvatarExpression('sad');
    }
  };

  // Stage Progression
  const nextStage = () => {
    const stages = ['explanation', 'questions', 'practice', 'test', 'project', 'completed'];
    const currentIndex = stages.indexOf(stage);
    if (currentIndex < stages.length - 1) {
      setStage(stages[currentIndex + 1]);
      setCode('');
      setOutput('Output will appear here...');
      setAvatarMessage(
        stages[currentIndex + 1] === 'practice' ? 'Time to code—let’s get started!' : `Moving to ${stages[currentIndex + 1]}!`
      );
      setAvatarExpression('happy');
    } else if (stage === 'completed') {
      setCompletedLessons([...completedLessons, currentLesson.id]);
      const nextLesson = lessons.find((l) => !completedLessons.includes(l.id));
      if (nextLesson) {
        setCurrentLesson(nextLesson);
        setStage('explanation');
      } else {
        setAvatarMessage('All lessons complete—great work!');
        setAvatarExpression('dancing');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 flex flex-col overflow-hidden">
      {/* Header */}
      <Header className="bg-gradient-to-r from-gray-800 to-gray-700 shadow-lg shadow-purple-500/20 p-4" />

      {/* Progress Bar */}
      <div className="w-full bg-gray-800 p-2">
        <div className="h-2 bg-purple-600 rounded-full" style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }}></div>
        <p className="text-gray-300 text-sm mt-1">Progress: {completedLessons.length} / {lessons.length} Lessons</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col sm:flex-row px-6 py-8 gap-6">
        {/* Left Panel */}
        <div
          className={`${
            isLeftCollapsed ? 'w-16' : 'sm:w-1/2 w-full'
          } transition-all duration-300 bg-gray-900/20 backdrop-blur-md rounded-lg p-4`}
        >
          <LeftPanel
            currentLesson={currentLesson}
            stage={stage}
            setStage={setStage}
            completedLessons={completedLessons}
            setCompletedLessons={setCompletedLessons}
            isLessonStarted={isLessonStarted}
            setIsLessonStarted={setIsLessonStarted}
            avatarMessage={avatarMessage}
            setAvatarMessage={setAvatarMessage}
            avatarExpression={avatarExpression}
            setAvatarExpression={setAvatarExpression}
            code={code}
            setCode={setCode}
            runPython={runPython}
            navigate={navigate}
            userName={userName}
            isLeftCollapsed={isLeftCollapsed}
            setIsLeftCollapsed={setIsLeftCollapsed}
            leftWidth={leftWidth}
            setLeftWidth={setLeftWidth}
            height={height}
            isFullScreenCode={isFullScreenCode}
            setIsFullScreenCode={setIsFullScreenCode}
            isInactive={isInactive}
            showHint={showHint}
            setShowHint={setShowHint}
            handleNoHint={handleNoHint}
            lessons={lessons}
            setRightScreenContent={setRightScreenContent}
          />
        </div>

        {/* Right Section */}
        {stage === 'explanation' ? (
          <div className="sm:w-1/2 w-full bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-lg shadow-blue-500/20 p-6 flex flex-col items-center justify-center">
            {rightScreenContent.image && (
              <img
                src={rightScreenContent.image}
                alt="Lesson visual"
                className="max-w-full max-h-1/2 mb-4 rounded-lg shadow-md shadow-purple-500/30"
              />
            )}
            {rightScreenContent.text && (
              <p className="text-xl font-bold text-purple-400 bg-gradient-to-r from-gray-700 to-gray-600 p-4 rounded-lg shadow-inner shadow-purple-500/10">
                {rightScreenContent.text}
              </p>
            )}
            
          </div>
        ) : (
          <div className={`sm:w-1/2 w-full ${isFullScreenCode ? 'h-full w-full' : ''} bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-lg shadow-blue-500/20 p-6 relative`}>
            <RightPanel
              stage={stage}
              code={code}
              setCode={setCode}
              runPython={runPython}
              output={output}
              hasError={hasError}
              resetInactivityTimer={resetInactivityTimer}
              currentLesson={currentLesson}
              editorRef={React.createRef()}
              isMaximized={isMaximized}
              setIsMaximized={setIsMaximized}
              provideHint={() => {
                setAvatarMessage('Try breaking your code into smaller steps!');
                setAvatarExpression('happy');
              }}
            />
            {/* Hint Button */}
            <button
              onClick={() => setShowHint(true)}
              className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-900 shadow-lg shadow-purple-500/20 transform hover:scale-105 transition-all duration-300"
            >
              Hint
            </button>
          </div>
        )}
      </div>

      {/* Floating Help Button */}
      <button
        className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-3 rounded-full shadow-lg shadow-blue-500/20 hover:from-blue-700 hover:to-blue-900 transform hover:scale-110 transition-all duration-300"
        onClick={() => alert('Help coming soon!')}
      >
        ?
      </button>
    </div>
  );
};

export default CodeEditorPage;