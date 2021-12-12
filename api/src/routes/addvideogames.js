require("dotenv").config();
const axios = require("axios");
const db = require("../db");
const { YOUR_API_KEY } = process.env;

const router = require("express").Router();

const { Videogame, Genres } = require("../db");

router.post("/", async (req, res) => {
  try {
    const { name, description, released, rating, image, id,platforms, genres } = req.body;



    const addgames = await Videogame.create({
      name: name,
      description: description,
      released: released,
      rating: rating,
      image: image,
      platforms: platforms,
    });

    genres.forEach(async (e) => {

      let resultGenres = await Genres.findOne({ where: { name: e } });
      
      await addgames.addGenre(resultGenres);
    });

    res.send('Creado el Videogames');

  } catch (err) {
    res.status(404).json({ err });
  }
});

module.exports = router;
