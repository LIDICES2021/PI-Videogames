require("dotenv").config();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;

const router = require("express").Router();

const { Videogame, Genres } = require("../db");

router.get("/", async (req, res) => {

  try {

    const apiGenres = await axios(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`);

    apiGenres.data.results.forEach(async (e) => {
        await Genres.findOrCreate({
            where: {name: e.name},
            default: {id: e.id}
        });
    });

    const results = await Genres.findAll();
    res.status(200).json(results);

  }catch (err) {
    res.status(404).json({ err });
  }
});

module.exports = router;
