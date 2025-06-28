import React, { useReducer } from "react";
import "./style.css";

const initialState = {
  history: [0],
  position: 0,
};

function reducer(state, action) {
  const { history, position } = state;
  const current = history[position];

  switch (action.type) {
    case "INCREMENT":
      return {
        history: [...history.slice(0, position + 1), current + 1],
        position: position + 1,
      };
    case "DECREMENT":
      return {
        history: [...history.slice(0, position + 1), current - 1],
        position: position + 1,
      };
    case "RESET":
      return {
        history: [0],
        position: 0,
      };
    case "BACK":
      return {
        ...state,
        position: Math.max(0, position - 1),
      };
    case "FORWARD":
      return {
        ...state,
        position: Math.min(history.length - 1, position + 1),
      };
    default:
      return state;
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { history, position } = state;
  const count = history[position];

  return (
    <div id="counter-history">
      <h1>Counter with History (useReducer)</h1>

      <div className="controls">
        <button
          onClick={() => dispatch({ type: "BACK" })}
          disabled={position === 0}
        >
          Back
        </button>
        <button
          onClick={() => dispatch({ type: "FORWARD" })}
          disabled={position === history.length - 1}
        >
          Forward
        </button>
      </div>

      <div>Current value: {count}</div>

      <div className="controls">
        <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
        <button onClick={() => dispatch({ type: "INCREMENT" })}>
          Increment
        </button>
        <button onClick={() => dispatch({ type: "DECREMENT" })}>
          Decrement
        </button>
      </div>

      <div>
        Step {position + 1} / {history.length}
      </div>
    </div>
  );
};

export default Counter;
