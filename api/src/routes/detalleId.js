require("dotenv").config();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;

const router = require("express").Router();

const { Videogame, Genres } = require("../db");

router.get("/", async (req, res) => {
  const { id } = req.params;

  try {

    


   



  }catch (err) {
    res.status(404).json({ err });
  }
});

module.exports = router;
