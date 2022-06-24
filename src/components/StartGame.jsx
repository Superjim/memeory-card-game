import React from "react";

function StartGame({
  difficulty,
  setDifficulty,
  startNewGame,
  highScore,
  loading,
}) {
  return (
    <div className="start-game">
      {highScore === 0 && (
        <div className="instructions start-game">
          <h1>Memory Game</h1>
          <p>
            Get points by clicking on a Pokemon, but don't click on one more
            than once!
          </p>
        </div>
      )}

      <input
        id="difficultyInput"
        type="range"
        min="2"
        max="151"
        value={difficulty}
        onChange={(e) => setDifficulty(Number(e.target.value))}
      ></input>

      <p>Difficulty: {difficulty} Pokemon</p>
      {loading && <button disabled>Loading...</button>}
      {!loading && <button onClick={startNewGame}>New Game</button>}
    </div>
  );
}

export default StartGame;
