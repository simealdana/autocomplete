import { FC } from "react";
import AutoComplete from "../../ui/AutoComplete/autocomplete";

interface IPokemon {
  name: string;
  url: string;
}

interface IPokemonResponde {
  count: number;
  next: string;
  previous: string;
  results: IPokemon[];
}

const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon/?limit=100";

const getPokemon = async (): Promise<IPokemonResponde> => {
  const response = await fetch(POKEMON_URL);
  const pokemon = await response.json();
  return pokemon;
};

const filterPokemon = async (search: string) => {
  const pokemonList: IPokemonResponde = await getPokemon();
  const { results } = pokemonList;
  return results.filter((pokemon) => {
    return pokemon.name.toLocaleLowerCase().includes(search);
  });
};

const Pokemon: FC = () => {
  const onSelected = (pokemonName: string) => {
    console.log(pokemonName);
  };
  return (
    <AutoComplete
      onFetchOptions={filterPokemon}
      keyField="name"
      onSelected={onSelected}
    />
  );
};

export default Pokemon;
