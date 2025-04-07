import React, { useState, useEffect } from 'react';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';
import Avatar from './Avatar';
import Explanation from './stages/Explanation';
import Questions from './stages/Questions';
import CodingPractice from './stages/CodingPractice';
import LiveTest from './stages/LiveTest';
import MiniProject from './stages/MiniProject';
import { getRandomQuestions, getRandomMiniProject } from '../utils/utils';

const LeftPanel = ({
  currentLesson,
  stage,
  setStage,
  completedLessons,
  setCompletedLessons,
  isLessonStarted,
  setIsLessonStarted,
  avatarMessage,
  setAvatarMessage,
  avatarExpression,
  setAvatarExpression,
  code,
  setCode,
  runPython,
  navigate,
  userName,
  isLeftCollapsed,
  setIsLeftCollapsed,
  leftWidth,
  setLeftWidth,
  height,
  isFullScreenCode,
  setIsFullScreenCode,
  isInactive,
  showHint,
  setShowHint,
  handleNoHint,
  lessons,
  setRightScreenContent
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // New state
  const [speechRate, setSpeechRate] = useState(1.0);
  const [sliderValue, setSliderValue] = useState(0);
  const [speedChangeTrigger, setSpeedChangeTrigger] = useState(0);
  const totalLines = currentLesson.stages.explanation.text.split('\n').filter(Boolean).length;

  const startLesson = () => {
    setIsLessonStarted(true);
    setIsPlaying(true);
    setIsPaused(false);
    setSliderValue(0);
    setAvatarMessage('Let’s begin the lesson!');
    setAvatarExpression('happy');
  };

  const nextStage = () => {
    const stages = ['explanation', 'questions', 'practice', 'test', 'project', 'completed'];
    const currentIndex = stages.indexOf(stage);
    if (currentIndex < stages.length - 1) {
      setStage(stages[currentIndex + 1]);
      setCode('');
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

  const getStageStep = () => {
    const stages = ['explanation', 'questions', 'practice', 'test', 'project', 'completed'];
    return stages.indexOf(stage) + 1;
  };

  const handlePauseResume = () => {
    if (isPlaying && !isPaused) {
      console.log('Pausing - Rate:', speechRate);
      window.speechSynthesis.pause();
      setIsPaused(true);
      setAvatarMessage('Paused.');
      setAvatarExpression('thinking');
    } else if (!isPlaying || isPaused) {
      console.log('Resuming - Rate:', speechRate);
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      setAvatarMessage('Resuming...');
      setAvatarExpression('happy');
    }
  };

  const handleSpeedChange = (direction) => {
    const step = 0.25;
    let newRate;
    if (direction === 'decrease') {
      newRate = Math.max(0.25, speechRate - step);
    } else if (direction === 'increase') {
      newRate = Math.min(2.0, speechRate + step);
    } else {
      newRate = 1.0;
    }
    console.log('Speed change - Old Rate:', speechRate, 'New Rate:', newRate);
    setSpeechRate(newRate);
    setAvatarMessage(`Speed set to ${newRate}x`);
    setAvatarExpression('happy');
    if (isPlaying && !isPaused) {
      setSpeedChangeTrigger(prev => prev + 1);
    }
  };

  return (
    <div>
      {!isFullScreenCode ? (
        <ResizableBox
          width={isLeftCollapsed ? 50 : leftWidth}
          height={height}
          axis="x"
          minConstraints={[50, 100]}
          maxConstraints={[window.innerWidth - 50, height]}
          resizeHandles={['e']}
          onResize={(e, data) => setLeftWidth(data.size.width)}
          className="bg-blue-50 p-4 border-r border-blue-200 relative sm:w-1/2 w-full sm:h-full h-auto"
        >
          <button
            onClick={() => setIsLeftCollapsed(!isLeftCollapsed)}
            className="absolute top-2 right-2 bg-gray-500 text-white px-2 py-1 rounded z-10"
          >
            {isLeftCollapsed ? '➕' : '➖'}
          </button>
          {!isLeftCollapsed && (
            <div className="h-full flex flex-col">
              <div className="sm:h-[70%] h-[200px] flex justify-center items-center border-b border-blue-300 relative">
                <Avatar expression={avatarExpression} />
                {avatarMessage && (
                  <div className="absolute top-4 bg-white p-2 rounded shadow border max-w-xs text-sm">
                    {avatarMessage}
                  </div>
                )}
              </div>
              {isLessonStarted && stage === 'explanation' && (
                <div className="mt-2 p-2 bg-gray-100 rounded flex flex-col items-center justify-between">
                  <div className="flex items-center justify-between w-full">
                    <button
                      onClick={handlePauseResume}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      {isPaused ? 'Resume' : 'Pause'}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max={totalLines - 1}
                      value={sliderValue}
                      onChange={(e) => {
                        window.speechSynthesis.cancel();
                        setSliderValue(parseInt(e.target.value));
                        setIsPlaying(true);
                        setIsPaused(false);
                      }}
                      className="w-1/3"
                    />
                    <div className="flex items-center gap-1">
                      <span className="text-sm">Speed:</span>
                      <button
                        onClick={() => handleSpeedChange('decrease')}
                        className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => handleSpeedChange('normal')}
                        className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                      >
                        Normal
                      </button>
                      <button
                        onClick={() => handleSpeedChange('increase')}
                        className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                      >
                        ↑
                      </button>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 mt-1">{speechRate}x</span>
                </div>
              )}
              <div className="sm:h-[30%] h-auto flex flex-col justify-between p-2 overflow-y-auto">
                {isLessonStarted ? (
                  <>
                    <div className="text-sm font-semibold mb-2">
                      Step {getStageStep()}/6: {stage.charAt(0).toUpperCase() + stage.slice(1)}
                    </div>
                    {stage === 'explanation' && (
                      <Explanation
                        explanation={currentLesson.stages.explanation}
                        onComplete={nextStage}
                        setAvatarMessage={setAvatarMessage}
                        setAvatarExpression={setAvatarExpression}
                        setRightScreenContent={setRightScreenContent}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        isPaused={isPaused} // Pass new state
                        speechRate={speechRate}
                        setSpeechRate={setSpeechRate}
                        sliderValue={sliderValue}
                        setSliderValue={setSliderValue}
                        speedChangeTrigger={speedChangeTrigger}
                      />
                    )}
                    {stage === 'questions' && (
                      <Questions
                        questions={getRandomQuestions(currentLesson.stages.questions, 3)}
                        onComplete={nextStage}
                      />
                    )}
                    {stage === 'practice' && (
                      <CodingPractice
                        practice={currentLesson.stages.codingPractice}
                        onComplete={nextStage}
                        code={code}
                        setCode={setCode}
                        runPython={runPython}
                        setAvatarMessage={setAvatarMessage}
                        setAvatarExpression={setAvatarExpression}
                      />
                    )}
                    {stage === 'test' && (
                      <LiveTest
                        test={currentLesson.stages.liveTest}
                        onComplete={nextStage}
                        code={code}
                        setCode={setCode}
                        runPython={runPython}
                      />
                    )}
                    {stage === 'project' && (
                      <MiniProject
                        project={getRandomMiniProject(currentLesson.stages.miniProject.tasks)}
                        onComplete={nextStage}
                        code={code}
                        setCode={setCode}
                        runPython={runPython}
                      />
                    )}
                    {stage === 'completed' && (
                      <div className="space-y-4">
                        <p className="text-gray-700">Lesson complete! Ready for the next one?</p>
                        <button
                          onClick={nextStage}
                          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                          Next Lesson
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-700 text-sm">{avatarMessage}</p>
                    <div className="flex justify-between">
                      <button
                        onClick={startLesson}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        {completedLessons.includes(currentLesson.id) ? 'Yes' : 'Start'}
                      </button>
                      <button
                        onClick={() => navigate('/profile')}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                      >
                        Back to Profile
                      </button>
                    </div>
                  </div>
                )}
                <div className="text-gray-500 text-sm mt-2 italic">Additional content coming soon...</div>
              </div>
            </div>
          )}
        </ResizableBox>
      ) : (
        <Draggable bounds="parent">
          <div className="absolute w-24 h-24 bg-blue-50 p-2 rounded shadow z-10 cursor-move">
            <Avatar expression={avatarExpression} onClick={() => setIsFullScreenCode(false)} />
            <div className="text-xs text-center mt-1">{avatarMessage.slice(0, 20)}...</div>
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default LeftPanel;