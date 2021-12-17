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

const addVideogames = require('./addvideogames');





router.use('/video', videogamesQuery);

router.use('/videogames', videogames);

router.use('/videogame/:id', detalleId);

router.use('/genres', genres);

router.use('/videogame', addVideogames);











module.exports = router;
