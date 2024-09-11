import express, { Request, Response } from 'express';

const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//----------------------- ROTA DA LISTA DO POKEMON -----------------------\\

app.get('/', async (request: Request, response: Response) => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=5');
  const data = await res.json();
  response.render('index', { pokemons: data.results });
  // image: pokemonData.sprites.front_default
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
    image: pokemonData.sprites.front_default
  });
});


//----------------------- LOCALHOST -----------------------\\

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
