import express, { Request, Response } from 'express';

const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//----------------------- ROTA DA LISTA DO POKEMON -----------------------\\

app.get('/', async (request: Request, response: Response) => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
  const data = await res.json();

 //----------------------- ROTA DA LISTA DO POKEMON -----------------------\\

  const pokemonsWithImages = await Promise.all(
    data.results.map(async (pokemon: { name: string; url: string }) => {
      const pokemonRes = await fetch(pokemon.url);
      const pokemonData = await pokemonRes.json();
      return {
        name: pokemon.name,
        image: pokemonData.sprites.versions['generation-v']['black-white'].animated.front_default
  };
  })
  );
  response.render('index', { pokemons: pokemonsWithImages });
});

//----------------------- ROTA DOS DETALHES DO POKEMON -----------------------\\
app.get('/detalhes/:name', async (req: Request, res: Response) => {
  const name = req.params.name;

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) {
    return res.status(500).send('Failed to fetch data from API');
  }

  //----------------------- DETALHES DO POKEMON -----------------------\\

  const pokemonData = await response.json();
  res.render('detalhes', {
    name: pokemonData.name,
    detalhes: pokemonData.stats, 
    types: pokemonData.types,
    abilities: pokemonData.abilities,
    image: pokemonData.sprites.front_default,
    image2: pokemonData.sprites.front_shiny

  });
});


//----------------------- LOCALHOST -----------------------\\

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
