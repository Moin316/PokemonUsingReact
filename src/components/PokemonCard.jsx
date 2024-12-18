import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PokemonCard = () => {
  const { name } = useParams();
  const API = "https://pokeapi.co/api/v2/pokemon?limit=100";
  
  const [pokemonDetail, setPokemonDetail] = useState(null);  // For storing the fetched Pokémon detail
  const [error, setError] = useState("");  // To handle errors (e.g., Pokémon not found)

  const fetching = async () => {
    try {
      // Fetch the list of Pokémon
      const response = await fetch(API);
      const data = await response.json();
      const pokemons = data.results;

      // Find the Pokémon URL by name
      const pokemon = pokemons.find(item => item.name === name);

      if (!pokemon) {
        setError("Pokémon not found!");
        return;
      }

      // Fetch details of the specific Pokémon
      const pokemonDetailResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonDetailResponse.json();

      setPokemonDetail(pokemonData);  // Store Pokémon details in state
    } catch (error) {
      console.error(error.message);
      setError("Something went wrong while fetching the Pokémon data.");
    }
  };

  useEffect(() => {
    fetching();
  }, [name]);  // Re-fetch data when the 'name' changes

  if (error) {
    return <div>{error}</div>;  // Display error message if there is any
  }

  return (
    <div>
      {pokemonDetail ? (
        <div>
          <h2>{pokemonDetail.name}</h2>
          <img 
            src={pokemonDetail.sprites.front_default} 
            alt={pokemonDetail.name} 
            style={{ width: '150px', height: '150px' }}
          />
          <p>Height: {pokemonDetail.height} decimeters</p>
          <p>Weight: {pokemonDetail.weight} hectograms</p>
          <h3>Abilities:</h3>
          <ul>
            {pokemonDetail.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading Pokémon details...</p>
      )}
    </div>
  );
};

export default PokemonCard;
