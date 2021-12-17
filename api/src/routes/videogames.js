require("dotenv").config();
const axios = require("axios");
const db = require("../db");
const { YOUR_API_KEY } = process.env;
const { Op } = require("sequelize");
const { Videogame, Genres } = require("../db");

const videogames = async (req, res, next) => {

  const { name } = req.query;

  var llamadoQuery = [];

  try {

    if (name) {

      const searchName = await Videogame.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },// operador ilike resuelve Mayuscula y % contenga el name
        include: [Genres],
      });
        searchName.forEach((e) => {//hacemos un forEach  para mostrar los Datos de mi DB
          llamadoQuery.push({
            id: e.id,
            name: e.name,
            image: e.image,
            genres: e.genres.map((genres) => genres.name),
            source: "db"
          });
        });


        const apiName = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${YOUR_API_KEY}`);

        apiName.data.results.forEach((e) => {//hacemos un forEach  para mostrar los Datos de mi API
          llamadoQuery.push({
            id: e.id,
            name: e.name,
            image: e.background_image,
            genres: e.genres.map((genres) => genres.name),
            source: "api"
          });
        });
       var nuevo = [];
        for(let i=0; i<15; i++) {//me traigo los 15 primero videogamescon query
          nuevo.push(llamadoQuery[i]);
        }
      return res.json(nuevo);
    }
    else {

      let llamadoVideogames = [];

      let db = await Videogame.findAll({// me traigo todo de mi base datos incluyendo genres
        include: [Genres],
      });

      db.forEach((e) => {//guardo en mi array los datos de mi base de datos que necesito.
        llamadoVideogames.push({
          id: e.id,
          name: e.name,
          image: e.image,
          genres: e.genres.map((genres) => genres.name),
          source: "db",
        });
      });

      let apiGames = `https://api.rawg.io/api/games?key=${YOUR_API_KEY}`;// mi api

      for (let i = 1; i <= 5; i++) {//me traigo 100 videogames de mi api y lo guardo en mi array con los datos que necesito


        let datosDeApi = await axios.get(apiGames);
        apiGames = datosDeApi.data.next;

        datosDeApi.data.results.forEach((e) => {
          llamadoVideogames.push({
            id: e.id,
            name: e.name,
            image: e.background_image,
            genres: e.genres.map((genres) => genres.name),
            source: "api",
          });
        });
      }
      res.status(200).json(llamadoVideogames);
    }
  } catch (err) {
    res.status(404).json({ err });
  }
}

module.exports = videogames;
