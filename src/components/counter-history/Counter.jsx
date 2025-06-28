import React, { useState } from "react";
import "./style.css";

const Counter = () => {
  const [history, setHistory] = useState([0]);
  const [position, setPosition] = useState(0);

  const count = history[position];

  const updateHistory = (newValue) => {
    const newHistory = history.slice(0, position + 1);
    setHistory([...newHistory, newValue]);
    setPosition((prev) => prev + 1);
  };

  const increment = () => updateHistory(count + 1);
  const decrement = () => updateHistory(count - 1);

  const backNav = () => {
    if (position > 0) setPosition(position - 1);
  };

  const forwardNav = () => {
    if (position + 1 < history.length) setPosition(position + 1);
  };

  const reset = () => {
    setHistory([0]);
    setPosition(0);
  };

  return (
    <div id="counter-history">
      <h1>Counter with History</h1>
      <p>This component displays a counter with undo/redo functionality.</p>

      <div className="controls">
        <button onClick={backNav} disabled={position === 0}>
          Back
        </button>
        <button onClick={forwardNav} disabled={position + 1 === history.length}>
          Forward
        </button>
      </div>

      <div>Current value: {count}</div>

      <div className="controls">
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>

      <div>
        Step {position + 1} / {history.length}
      </div>
    </div>
  );
};

export default Counter;
