import React from 'react';
import { ResizableBox } from 'react-resizable';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { Undo, Redo } from 'lucide-react';
import { undo, redo } from '@codemirror/commands';
import { autocompletion } from '@codemirror/autocomplete';
import { lintGutter } from '@codemirror/lint';
import LessonMedia from './LessonMedia';

const RightPanel = ({
  stage,
  code,
  setCode,
  runPython,
  editorRef,
  isMaximized,
  setIsMaximized,
  currentLesson,
  output,
  hasError,
  provideHint,
  resetInactivityTimer,
  className,
}) => {
  const isCodingStage = ['practice', 'test', 'project'].includes(stage);

  return (
    <ResizableBox
      width={isMaximized ? window.innerWidth : window.innerWidth / 2}
      height={window.innerHeight}
      axis="x"
      className={`bg-white ${className}`}
    >
      <div className="p-6 flex flex-col h-full">
        {isCodingStage ? (
          <>
            <div className="flex justify-between mb-4">
              <div className="flex space-x-4">
                <Undo
                  onClick={() => editorRef.current?.view && undo(editorRef.current.view)}
                  className="cursor-pointer"
                />
                <Redo
                  onClick={() => editorRef.current?.view && redo(editorRef.current.view)}
                  className="cursor-pointer"
                />
              </div>
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="bg-gray-700 text-white px-3 py-1 rounded"
              >
                {isMaximized ? 'Exit Fullscreen' : '⛶'}
              </button>
            </div>
            <CodeMirror
              value={code}
              height="700px"
              theme={vscodeDark}
              extensions={[python(), autocompletion(), lintGutter()]}
              onChange={(value) => {
                setCode(value);
                resetInactivityTimer();
              }}
              ref={editorRef}
              className="code-editor"
            />
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => {
                  runPython();
                  resetInactivityTimer();
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Run Code ▶
              </button>
              <button
                onClick={provideHint}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
              >
                Hint 💡
              </button>
              <button
                onClick={() => {
                  setCode('');
                  setOutput('Output will appear here...');
                  setHasError(false);
                  resetInactivityTimer();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Clear Code 🧹
              </button>
            </div>
            <pre
              className={`mt-4 p-4 rounded ${hasError ? 'bg-red-100 text-red-700' : 'bg-gray-100'}`}
            >
              {output}
            </pre>
          </>
        ) : (
          <LessonMedia
            media={
              currentLesson.stages && currentLesson.stages[stage]?.media
                ? currentLesson.stages[stage].media
                : { text: 'Lesson content coming soon!' }
            }
          />
        )}
      </div>
    </ResizableBox>
  );
};

export default RightPanel;