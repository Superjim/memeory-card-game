import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/Card";
import StartGame from "./components/StartGame";
import Score from "./components/Score";
import Gameover from "./components/Gameover";

function App() {
  //array to store pokemons
  const [difficulty, setDifficulty] = useState(9);
  const [pokemon, setPokemon] = useState([]);
  const [randomPokemon, setRandomPokemon] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gamestate, setGamestate] = useState(0);
  const [loading, setLoading] = useState(true);

  //api that gets data of 151 pokemon from pokeapi
  //index, name, picture and type are stored in an array
  async function getPokemon() {
    let newPokemon = [];

    for (let i = 1; i <= 151; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      try {
        const res = await axios.get(url);
        const pokemon = res.data;
        const name = pokemon.name;
        const index = pokemon.id;
        const picture = pokemon.sprites.front_default;
        const type = pokemon.types[0].type.name;
        newPokemon.push({ index, name, picture, type });
      } catch (error) {
        console.log(error);
      }
    }
    setPokemon(newPokemon);
    setLoading(false);
  }

  //get api on page load
  useEffect(() => {
    getPokemon();
  }, []);

  //start new game
  function startNewGame() {
    const shuffled = pokemon.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, difficulty);
    setRandomPokemon(selected);
    setClicked([]);
    setScore(0);
    setGamestate(1);
  }

  //shuffle pokemon
  function shufflePokemon() {
    const shuffled = randomPokemon.sort(() => 0.5 - Math.random());
    setRandomPokemon(shuffled);
  }

  //handle check
  function handleCheck(pokemon) {
    if (clicked.includes(pokemon)) {
      setGamestate(2);
      if (highScore < score) {
        setHighScore(score);
      }
    } else if (score + 1 === difficulty) {
      setScore(score + 1);
      setClicked([...clicked, pokemon]);
      setGamestate(3);
      if (highScore < score) {
        setHighScore(score + 1);
      }
    } else {
      setScore(score + 1);
      setClicked([...clicked, pokemon]);
      shufflePokemon();
    }
  }

  if (gamestate === 0)
    return (
      <div className="App">
        <StartGame
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          startNewGame={startNewGame}
          highScore={highScore}
          loading={loading}
        />
      </div>
    );
  if (gamestate === 1)
    return (
      <>
        <div className="score-card-game">
          <Score score={score} highScore={highScore} />
        </div>
        <div className="card-container">
          {randomPokemon.map((pokemon) => (
            <Card
              key={pokemon.index}
              pokemon={pokemon}
              type={pokemon.type}
              handleCheck={handleCheck}
            />
          ))}
        </div>
      </>
    );
  if (gamestate === 2)
    return (
      <Gameover
        title={"Game Over"}
        clicked={clicked}
        randomPokemon={randomPokemon}
        score={score}
        setScore={setScore}
        highScore={highScore}
        startNewGame={startNewGame}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        win={false}
      />
    );
  if (gamestate === 3)
    return (
      <Gameover
        title={"You Win!"}
        clicked={clicked}
        randomPokemon={randomPokemon}
        score={score}
        setScore={setScore}
        highScore={highScore}
        startNewGame={startNewGame}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        win={true}
      />
    );
}

export default App;
