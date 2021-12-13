require("dotenv").config();
const axios = require("axios");
const db = require("../db");
const { YOUR_API_KEY } = process.env;

const router = require("express").Router();

const { Videogame, Genres } = require("../db");

router.post("/", async (req, res) => {
  try {
    const { name, description, released, rating, platforms, genres } = req.body;



    const addgames = await Videogame.create({
      name: name,
      description: description,
      released: released,
      rating: rating,
      platforms: platforms,
    });

    await addgames.addGenres(genres)

    res.send('Creado el Videogames');

  } catch (err) {
    res.status(404).json({ err });
  }
});

module.exports = router;
