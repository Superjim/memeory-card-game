import React from "react";

function Card({ pokemon, handleCheck }) {
  const type = pokemon.type + " card";

  const handleClick = () => {
    handleCheck(pokemon);
  };
  return (
    <div className={type} onClick={handleClick}>
      <img src={pokemon.picture} alt={pokemon.name}></img>
      <p>{pokemon.name}</p>
    </div>
  );
}

export default Card;
