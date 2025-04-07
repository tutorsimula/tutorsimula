import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import Avatar from '../Avatar';

const LiveTest = ({ test, onComplete, code, setCode, runPython }) => (
  <div className="space-y-4">
    <Avatar expression="thinking" />
    <p className="text-gray-700">{test.task}</p>
    <CodeMirror value={code || test.starterCode} height="150px" theme={vscodeDark} extensions={[python()]} onChange={setCode} />
    <button
      onClick={async () => {
        const result = await runPython();
        if (result && result.trim() === test.expectedOutput) onComplete();
      }}
      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Submit Test
    </button>
  </div>
);

export default LiveTest;