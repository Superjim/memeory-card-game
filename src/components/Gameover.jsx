import React from "react";
import Card from "./Card";
import Score from "./Score";
import StartGame from "./StartGame";

function Gameover({
  title,
  clicked,
  handleCheck,
  randomPokemon,
  score,
  highScore,
  startNewGame,
  difficulty,
  setDifficulty,
}) {
  return (
    <div className="gameover">
      <h1>{title}</h1>
      <Score score={score} highScore={highScore} />
      <p>You clicked:</p>
      <div className="card-container">
        {clicked.map((pokemon) => (
          <Card
            key={pokemon.index}
            pokemon={pokemon}
            type={pokemon.type}
            handleCheck={handleCheck}
          />
        ))}
      </div>
      <p>You forgot:</p>
      <div className="card-container">
        {randomPokemon
          .filter((x) => !clicked.includes(x))
          .map((pokemon) => (
            <Card
              key={pokemon.index}
              pokemon={pokemon}
              type={pokemon.type}
              handleCheck={handleCheck}
            />
          ))}
      </div>
      <StartGame
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          startNewGame={startNewGame}
          highScore={highScore}/>
    </div>
  );
}

export default Gameover;
