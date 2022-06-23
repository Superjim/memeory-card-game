import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/Card";

function App() {
  //array to store pokemons
  const [difficulty, setDifficulty] = useState(9);
  const [pokemon, setPokemon] = useState([]);
  const [randomPokemon, setRandomPokemon] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameover, setGameover] = useState(false);

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
  }

  //shuffle pokemon
  function shufflePokemon() {
    const shuffled = randomPokemon.sort(() => 0.5 - Math.random());
    setRandomPokemon(shuffled);
  }

  //handle check
  function handleCheck(pokemon) {
    if (clicked.includes(pokemon)) {
      setGameover(true);
      if (highScore < score) {
        setHighScore(score);
      }
    } else {
      setScore(score + 1);
      setClicked([...clicked, pokemon]);
      shufflePokemon();
    }
  }

  if (!gameover)
    return (
      <div className="App">
        <h1>Memory Game</h1>

        <p>
          Get points by clicking on a Pokemon, but don't click on one more than
          once!
        </p>

        <input
          id="difficultyInput"
          type="range"
          min="2"
          max="151"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        ></input>

        <p>Difficulty: {difficulty} Pokemon</p>
        <button onClick={startNewGame}>New Game</button>
        <p>High Score: {highScore}</p>
        <p>Current Score: {score} </p>
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
      </div>
    );
  if (gameover)
    return (
      <div className="App">
        <h1>Game Over</h1>
        <div className="card-container">
          <p>You clicked:</p>
          <div>
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
          <div>
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
        </div>
      </div>
    );
}

export default App;
