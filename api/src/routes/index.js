require("dotenv").config();
const axios = require("axios");
const db = require("../db");
const { YOUR_API_KEY } = process.env;

const router = require("express").Router();

const { Videogame, Genres } = require("../db");

const videogames = require('./videogames');

const videogamesQuery = require('./videogamesQuery');

const detalleId = require('./detalleId');

const genres = require('./genres');

const addvideogames = require('./addvideogames');







router.use('/videogames', videogames);

router.use('/videogames?name=', videogamesQuery);

router.use('/videogame', detalleId);

router.use('/genres', genres);

router.use('/videogame', addvideogames);











module.exports = router;
