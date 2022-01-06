require("dotenv").config();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;

const { Videogame, Genres } = require("../db");


const videoGamesDb = async () => {

    let db = await Videogame.findAll({// me traigo todo de mi base datos incluyendo genres
        include: {
            model: Genres,
            attribute: ['name'],
            through: {
                attribute: [],
            },
        }
    });

    let resultsGamesDB = await db.map(e => {
        return {
            id: e.id,
            name: e.name.toUpperCase(),
            image: e.image,
            rating: e.rating,
            genres: e.genres.map(g => g.name),

        }
    });
    return resultsGamesDB;
}

const videoGamesApi = async () => {

    var arrayVideogames = [];
    let apiGames = `https://api.rawg.io/api/games?key=${YOUR_API_KEY}`;// mi api

     for (let i = 1; i <= 5; i++) {//me traigo 100 videogames de mi api y lo guardo en mi array con los datos que necesito


       let datosDeApi = await axios.get(apiGames);
       apiGames = datosDeApi.data.next;

      let source = datosDeApi.data.results

      //let source = file.results;//sin api

      source.forEach((e) => {
        arrayVideogames.push({
          id: e.id,
          name: e.name.toUpperCase(),
          rating: e.rating,
          image: e.background_image,
          genres: e.genres.map((genres) => genres.name)
        });
      });
      }
   return (arrayVideogames);
    

}

const videoGames = async () => {

    let gamesDb = await videoGamesDb();
    let gamesApi = await videoGamesApi();
    let total = gamesDb.concat(gamesApi);
    return total;
}

module.exports = videoGames;