require("dotenv").config();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;

const { Videogame, Genres } = require("../db");


const genres = async (req, res, next) => {

 
  try {

    const apiGenres = await axios(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`);

    const data =  apiGenres.data.results

        data.forEach(async (e) => {
        await Genres.findOrCreate({
            where: {name: e.name},
            default: {id: e.id}
        });
    });

    let results = await Genres.findAll();

    

   res.status(200).json(results);

  }catch (err) {
    res.status(404).json({ err });
  }
}

module.exports = genres;
