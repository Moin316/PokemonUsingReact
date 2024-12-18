import React from 'react'
import { NavLink } from 'react-router-dom';

const PokemonCards = ({pokemonData}) => {
  return (
    <NavLink to={`/pokemon/${pokemonData.name}`}>
      <li className="pokemon-card">
        <figure>
          <img
            src={pokemonData.sprites.other.dream_world.front_default}
            alt={pokemonData.name}
            className="pokemon-image"
          />
        </figure>
        <h2 className="pokemon-name">{pokemonData.name}</h2>
        <p className="pokemon-info pokemon-highlight">
          Type:{" "}
          {pokemonData.types.map((curType) => curType.type.name).join(" , ")}
        </p>
        <div className="grid-three-cols">
          <p className="pokemon-info">
            <span> Height:</span> {pokemonData.height}
          </p>
          <p className="pokemon-info">
            <span> Weight:</span> {pokemonData.weight}
          </p>
          <p className="pokemon-info">
            <span> speed:</span> {pokemonData.stats[5].base_stat}
          </p>
        </div>

        <div className="grid-three-cols">
          <div className="pokemon-info">
            <span> Experience:</span>
            <p>{pokemonData.base_experience}</p>
          </div>
          <div className="pokemon-info">
            <span>Attack:</span>
            <p>{pokemonData.stats[1].base_stat}</p>
          </div>
          <div className="pokemon-info">
            <p>
              <span> Abilities: </span>
              {pokemonData.abilities
                .map((abilityInfo) => abilityInfo.ability.name)
                .slice(0, 1)
                .join(", ")}
            </p>
          </div>
        </div>
      </li>
    </NavLink>
  );
}

export default PokemonCards
