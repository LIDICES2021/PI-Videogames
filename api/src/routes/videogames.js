require("dotenv").config();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { Op } = require("sequelize");
const { Videogame, Genres } = require("../db");



//var file = require('../../../videogames.json');


const videogames = async (req, res) => {

  const { name } = req.query;

  var arrayVideogames = [];

  try {

    if (name) {

      let searchName = await Videogame.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },// operador ilike resuelve Mayuscula y % contenga el name
        include: {
          model: Genres,
          attribute: ['name'],
          through: {
              attribute:[],
          },
      }
      });
      searchName.forEach((e) => {//hacemos un forEach  para mostrar los Datos de mi DB
        arrayVideogames.push({
          id: e.id,
          name: e.name,
          image: e.image,
          rating: e.rating,
          genres: e.genres.map((genres) => genres.name)
        });
      });

     const apiName = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${YOUR_API_KEY}`);


      
     let gameL = apiName.data.results;
        //let gameL = file.results.filter(e => e.name.toLowerCase().includes(name.toLowerCase()) );// sin api


      gameL.forEach((e) => {//hacemos un forEach  para mostrar los Datos de mi API
        arrayVideogames.push({
          id: e.id,
          name: e.name,
          image: e.background_image,
          rating: e.rating,
          genres: e.genres.map((genres) => genres.name)
        });
      });
    }
    else {

      let db = await Videogame.findAll({// me traigo todo de mi base datos incluyendo genres
        include: [Genres],
      });

      db.forEach((e) => {//guardo en mi array los datos de mi base de datos que necesito.
        arrayVideogames.push({
          id: e.id,
          name: e.name,
          image: e.image,
          rating: e.rating,
          genres: e.genres.map((genres) => genres.name)

        });
      });
      

    let apiGames = `https://api.rawg.io/api/games?key=${YOUR_API_KEY}`;// mi api

     for (let i = 1; i <= 5; i++) {//me traigo 100 videogames de mi api y lo guardo en mi array con los datos que necesito


       let datosDeApi = await axios.get(apiGames);
       apiGames = datosDeApi.data.next;

      let source = datosDeApi.data.results

      //let source = file.results;//sin api

      source.forEach((e) => {
        arrayVideogames.push({
          id: e.id,
          name: e.name,
          rating: e.rating,
          image: e.background_image,
          genres: e.genres.map((genres) => genres.name)
        });
      });
      }
    }

    return res.status(200).json(arrayVideogames);
  
  } catch (err) {
    res.status(404).json({ err });
  }
}

module.exports = videogames;
