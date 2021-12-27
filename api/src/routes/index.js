require("dotenv").config();
const axios = require("axios");
const db = require("../db");
const { YOUR_API_KEY } = process.env;

const router = require("express").Router();

const { Videogame, Genres } = require("../db");

const videogames = require('./videogames');



const detalleId = require('./detalleId');

const genres = require('./genres');

const addVideogames = require('./addvideogames');

const platforms = require('./platforms');







router.use('/videogames', videogames);

router.use('/videogame/:id', detalleId);

router.use('/genres', genres);

router.use('/videogame', addVideogames);

router.use('/platforms', platforms);













module.exports = router;
