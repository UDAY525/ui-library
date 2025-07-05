import React from "react";
import "./style.css";
const CardFlip = () => {
  return (
    <div className="cardFlip">
      <h1>CardFlip</h1>
      <div className="flip-card-container">
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <h3>Front Side</h3>
            </div>
            <div className="flip-card-back">
              <h3>Back Side</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardFlip;
