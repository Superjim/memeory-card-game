import React from "react";

function Score({ score, highScore }) {
  return (
    <div className="score-card">
      <p>Current Score: {score}</p>
      <p>High Score: {highScore}</p>
    </div>
  );
}

export default Score;
