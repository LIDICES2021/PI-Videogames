require("dotenv").config();
const axios = require("axios");
const db = require("../db");
const { YOUR_API_KEY } = process.env;
const { Op } = require("sequelize");

const { Videogame, Genres } = require("../db");

const videogamesQuery = async (req, res, next) => {


  const { name } = req.query

  let array = [];

  try {

    const searchName = await Videogame.findOne({
      where: { name:  { [Op.iLike]: `%${name}%` } },// operador ilike para que distinga entre mayuscula y minuscula ademas %name% para que me traiga todo loq ue contenga 
      include: [Genres],
    });

    searchName.forEach((e) => { 
      array.push({
        id: e.id,
        name: e.name,
        image: e.image,
        genres: e.genres.map((genres) => genres.name),
        description: e.description,
        released: e.released,
        rating: e.rating,
        platforms: e.platforms,
        source: "db"
    });
    });
    const apiName = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${YOUR_API_KEY}`);
    
    apiName.data.results.forEach((e) => {
      array.push({
        id: e.id,
        name: e.name,
        image: e.background_image,
        genres: e.genres.map((genres) => genres.name),
        description: e.description,
        released: e.released,
        rating: e.rating,
        platforms: e.platforms.map((p) => p.platform.name),
        source: "api"
      });
    });

    res.status(200).json(array);
  } catch (err) {
    return res.status(404).json({ err });
  }

}
module.exports = videogamesQuery;
