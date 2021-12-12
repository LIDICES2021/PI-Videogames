var aventura = Videogame.create({
     
    name: 'MineCraft',
    descripcion: 'Markus Persson',
    fechaDeLanzamiento: '2011-11-18',
    rating: '8',
    plataformas: 'PC, PS4'
  });
  var educativo = Videogame.create({
   
    name: 'Civilization',
    descripcion: 'Construir un imperio',
    fechaDeLanzamiento: '2016-10-21',
    rating: '5.8',
    plataformas: 'PS5, PS4, Xbox, PC'
  });
  var accion = Videogame.create({
    name: 'Sonic',
    descripcion: 'Construir un imperio',
    fechaDeLanzamiento: '2021-10-20',
    rating: '9',
    plataformas: 'Android,PS4, Xbox, PC'
  });

  db.forEach((e) => {
    array.push({
      id: e.id,
      name: e.name,
      image: e.background_image,
      description: e.description,
      released: e.released,
      rating: e.rating,
      platforms: e.platforms.map((platform) => platform.platform.name),
      genres: e.genres.map((genre) => genre.name),
      source: "db",
    });
  });



  for (let i = 1; i <= 5; i++) {
    let datosDeApi = await axios.get(api, {
      responseType: "json",
    });
    api = datosDeApi.data.next;
    datosDeApi.data.results.forEach((e) => {
      array.push({
        id: e.id,
        name: e.name,
        image: e.background_image,
        description: e.description,
        released: e.released,
        rating: e.rating,
        platforms: e.platforms.map((platform) => platform.platform.name),
        genres: e.genres.map((genre) => genre.name),
        source: "api",
      });
    });
  }





  var aventura = Videogame.create({
    id:587,
    name: 'MineCraft',
    image: `https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg`,
    description: 'Markus Persson',
    released: '2011-11-18',
    rating: '8',
    platforms: 'PC, PS4',
    source: "db",
  });

  var educativo = Videogame.create({
    id:598,
    name: 'Civilization',
    description: 'Construir un imperio',
    image: `https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg`,
    released: '2016-10-21',
    rating: '5.8',
    plataforms:'PS5, PS4, Xbox, PC'
  });
  var accion = Videogame.create({
    id: 587,
    name: 'Sonic',
    description: 'Construir un imperio',
    image: `https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg`,
    released:'2021-10-20',
    rating: '9',
    plataforms: 'Android,PS4, Xbox, PC'
  });

  var educativo = Genres.create({
    id: 500,
    name: 'Sonic'
  });
  Promise.all([aventura, educativo, accion])
  .then(res => {
    console.log("Videogames y genres precargados");
  })
  .catch(err => console.log(err))