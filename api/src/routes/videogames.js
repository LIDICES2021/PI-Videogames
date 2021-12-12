require("dotenv").config();
const axios = require("axios");
const db = require("../db");
const { YOUR_API_KEY } = process.env;

const router = require("express").Router();

const { Videogame, Genres } = require("../db");




router.get('/', async (req, res) => {
  try {
    
    let array = [];

    let apiGames = `https://api.rawg.io/api/games?key=${YOUR_API_KEY}`;// mi api

    let db = await Videogame.findAll({// me traigo todo de mi base datos incluyendo genres
      include: [Genres],
    });

    db.forEach((e) => {//guardo en mi array los datos de mi base de datos que necesito.
      array.push({
        id: e.id,
        name: e.name,
        image: e.background_image,
        genres: e.genres.map((genres) => genres.name),
        source: "db",
      });
    });

    for (let i = 1; i <= 5; i++) {//me traigo 100 videogames de mi api y lo guardo en mi array con los datos que necesito
     
     
      let datosDeApi = await axios.get(apiGames);
      apiGames = datosDeApi.data.next;
      
      datosDeApi.data.results.forEach((e) => {
        array.push({
          id: e.id,
          name: e.name,
          image: e.background_image,
          genres: e.genres.map((genres) => genres.name),
          source: "api",
        });
      });
    }
    res.status(200).json(array);

    
  }catch (err) {
    res.status(404).json({ err });
  }
});



module.exports = router;
