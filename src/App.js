import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/Card";

function App() {
  //array to store pokemons
  const [difficulty, setDifficulty] = useState(9);
  const [pokemon, setPokemon] = useState([]);

  //api to get data of pokemon stored in difficulty
  async function getPokemon() {
    let newPokemon = [];

    for (let i = 1; i <= difficulty; i++) {
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

  //start game on page load
  useEffect(() => {
    getPokemon();
  }, []);

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
      <button onClick={getPokemon}>New Game</button>

      <div className="card-container">
        {pokemon.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} type={pokemon.type} />
        ))}
      </div>
    </div>
  );
}

export default App;
