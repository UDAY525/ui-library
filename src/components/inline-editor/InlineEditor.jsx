import React, { useEffect, useRef, useState } from "react";
import { FaPen } from "react-icons/fa";
import "./style.css";

const InlineEditor = () => {
  const initialLines = ["Line 1", "Line 2", "Line 3"];
  const [textLines, setTextLines] = useState(initialLines);
  const [editingIndex, setEditingIndex] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editingIndex !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingIndex]);

  const handleTextChange = (e, idx) => {
    const newLines = [...textLines];
    newLines[idx] = e.target.value;
    setTextLines(newLines);
  };

  const finishEditing = () => {
    setEditingIndex(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      finishEditing();
    }
  };

  return (
    <div id="inlineEditSection">
      <h3>Inline Editable Input</h3>
      <div>
        {textLines.map((text, idx) =>
          editingIndex === idx ? (
            <input
              key={idx}
              value={text}
              ref={inputRef}
              onChange={(e) => handleTextChange(e, idx)}
              onBlur={finishEditing}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <p
              key={idx}
              onClick={() => setEditingIndex(idx)}
              className="editable-line"
            >
              {text} <FaPen />
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default InlineEditor;
