require("dotenv").config();
const axios = require("axios");

const { YOUR_API_KEY } = process.env;
const { Op } = require("sequelize");
const { Videogame, Genres } = require("../db");




const videogames = async (req, res, next) => {

  const { name } = req.query;

 // const { page } = req.query;

  var arrayVideogames = [];

  //var nuevo = [];

  try {

    if (name) {

      const searchName = await Videogame.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },// operador ilike resuelve Mayuscula y % contenga el name
        include: [Genres],
      });
        searchName.forEach((e) => {//hacemos un forEach  para mostrar los Datos de mi DB
          arrayVideogames.push({
            id: e.id,
            name: e.name,
            image: e.image,
            genres: e.genres.map((genres) => genres.name),
            source: "db"
          });
        });
        const apiName = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${YOUR_API_KEY}`);

        apiName.data.results.forEach((e) => {//hacemos un forEach  para mostrar los Datos de mi API
          arrayVideogames.push({
            id: e.id,
            name: e.name,
            image: e.background_image,
            genres: e.genres.map((genres) => genres.name),
            source: "api"
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
          genres: e.genres.map((genres) => genres.name),
          source: "db",
        });
      });

      let apiGames = `https://api.rawg.io/api/games?key=${YOUR_API_KEY}`;// mi api

      for (let i = 1; i <= 5; i++) {//me traigo 100 videogames de mi api y lo guardo en mi array con los datos que necesito


        let datosDeApi = await axios.get(apiGames);
        apiGames = datosDeApi.data.next;

        datosDeApi.data.results.forEach((e) => {
          arrayVideogames.push({
            id: e.id,
            name: e.name,
            image: e.background_image,
            genres: e.genres.map((genres) => genres.name),
            source: "api",
          });
        });
      }
    }
    return res.status(200).json(arrayVideogames);
  
    // page = 1;
    // console.log(page);
    // //var page_size = 15;
            // for(let i= (page-1) * page_size; i<page * page_size; i++) {

        //   nuevo.push(arrayVideogames[i]);
        // }
    
  } catch (err) {
    res.status(404).json({ err });
  }
}

module.exports = videogames;
