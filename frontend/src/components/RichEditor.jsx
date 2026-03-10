import React from 'react';
import { Type, List, Code } from 'lucide-react';

function RichEditor({ value, onChange, placeholder = "Write your post content..." }) {
  const insertMarkdown = (before, after = '') => {
    const textarea = document.getElementById('editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);

    const newText =
      text.substring(0, start) + before + selectedText + after + text.substring(end);

    onChange({ target: { value: newText } });

    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + before.length;
      textarea.focus();
    }, 0);
  };

  return (
    <div className="mb-6">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Content
        </label>
        <div className="flex gap-2 mb-3 border-b pb-2">
          <button
            type="button"
            onClick={() => insertMarkdown('# ')}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Heading"
          >
            <Type size={20} />
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown('- ')}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="List"
          >
            <List size={20} />
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown('```\n', '\n```')}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Code Block"
          >
            <Code size={20} />
          </button>
          <div className="flex-1"></div>
          <span className="text-xs text-gray-500 self-center">Markdown supported</span>
        </div>
      </div>
      <textarea
        id="editor"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input font-mono h-80"
      />
    </div>
  );
}

export default RichEditor;
