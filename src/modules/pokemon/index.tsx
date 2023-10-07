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

const getPokemon = async (): Promise<IPokemonResponde> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=100`);
  const pokemon = await response.json();
  return pokemon;
};

const filterPokemon = async (search: string) => {
  const pokemonList: IPokemonResponde = await getPokemon();
  const { results } = pokemonList;
  return results.filter((pokemon) => {
    return pokemon.name.includes(search);
  });
};

const Pokemon = () => {
  return <AutoComplete onChange={filterPokemon} keyExtractor="name" />;
};

export default Pokemon;
