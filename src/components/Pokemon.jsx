import React, { useEffect, useState } from 'react'
import PokemonCards from './PokemonCards';
const Pokemon = () => {
    const [pokemon,setPokemon]=useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError]=useState(null);
    const [search,setSearch] = useState("");
    const API="https://pokeapi.co/api/v2/pokemon?limit=100";
    const fetchApi=async ()=>{
        try{
            const response=await fetch(API);
            const data=await response.json();
            console.log(data);
            const detailedPokemonData=data.results.map(async (currPokemon)=>{
                const res=await fetch(currPokemon.url);
                const data=await res.json();
                return data;
            });
            const detailedResponse=await Promise.all(detailedPokemonData);
            setPokemon(detailedResponse);
            setLoading(false);
        }
        catch(error){
            setLoading(false);
            setError(error);
            console.error(error.message);
        }
    }
    useEffect(()=>{
        fetchApi();
    },[]);
    if(loading){
        return <h1>Loading...</h1>
    }
    if(error){
        return <h1>Error Occurred: {error.message}</h1>
    }
    const filteredPokemon=pokemon.filter((pokemon)=>pokemon.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <>
        <section className='container'>
            <header>
                <h1> Lets Catch Them </h1>
            </header>
            <div className='pokemon-search'>
                <input type='text' placeholder='search Pokemon' value={search} onChange={(event)=>{
                    setSearch(event.target.value);
    
                }}/>
            </div>
            <div className=''>
                <ul className='cards'>
                    {filteredPokemon.map((currPokemon)=>{
                        return <PokemonCards keys={currPokemon.id} pokemonData={currPokemon} />
                    })
                }
                </ul>
            </div>
        </section>
    </>
  )
}

export default Pokemon
