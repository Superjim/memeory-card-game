import React from "react";

function Card({ pokemon }) {
  const type = pokemon.type + " card";
  return (
    <div className={type}>
      <img src={pokemon.picture} alt={pokemon.name}></img>
      <p>{pokemon.name}</p>
    </div>
  );
}

export default Card;
