require("dotenv").config();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;

const { Videogame, Genres } = require("../db");

//const file = require("../../../videogames-genres.json")


const genres = async (req, res, next) => {

 
  try {

    //con api

    const apiGenres = await axios(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`);

    const data =  apiGenres.data.results

        data.forEach(async (e) => {
        await Genres.findOrCreate({
            where: {name: e.name},
        });
    });

    let results = await Genres.findAll();

    

   res.status(200).json(results);


  //sin api


  // const data =  file.results

  // data.forEach(async (e) => {
  //         await Genres.findOrCreate({
  //             where: {name: e.name},
  //         });
  //     });
  
  //     let results = await Genres.findAll();
  
  
  //     res.status(200).json(results);
  


  }catch (err) {
    res.status(404).json({ err });
  }
}

module.exports = genres;
