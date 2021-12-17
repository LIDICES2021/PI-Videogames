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


  "name": "MineCraft",
  "description": "desarrolar la mentalidad",
  "image": "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
  "released": "2016-10-21",
  "rating": 5.8,
  "platforms": "PS5, PS4, Xbox, PC",
  "genres": 14

  "name": "Civilization",
  "description": "Construir un imperio",
  "image": "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
  "released": "2011-11-18",
  "rating": 8,
  "platforms": "PC, PS4",
  "genres": 1



  "name": "Sonic",
  "description": "luchar",
  "image": "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
  "released": "2021-10-20",
  "rating": 9.5,
  "platforms": "Android,PS4, Xbox, PC",
  "genres": 18



  { "author": "author", "title": "title", "contents": "hello" },
  { "author": "author", "title": "title", "contents": "hey there" },




  "name": "Sonic",
  "description": "LUCHAR",
  "image": "`https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg`",
  "released": "2021-10-20",
  "rating": 9,
  "platforms": "Android,PS4, Xbox, PC",
  "genres": 15
















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





  var vAventura =  Videogame.create({

    name: 'MineCraft',
    description: 'Markus Persson',
    released: '2011-11-18',
    rating: 8,
    platforms: 'PC, PS4'
  });
 
 
  var gAventura =  Genres.create({
    name: 'aventura'
  });


  Promise.all([vAventura, gAventura])
          .then(res => {
            console.log("Videogames y Genres precargados");
          })
          .catch(err => console.log(err))