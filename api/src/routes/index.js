require("dotenv").config();
require("dotenv").config();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;

const router = require("express").Router();

//------------------------------------------------------------------------------

const detalleId = require('./detalleId');

const genres = require('./genres');

const addVideogames = require('./addvideogames');

const platforms = require('./platforms');

const searchGames = require('./searchGames'); 

const videoGames = require('./videoGamesN');

// const videogames = require('./videogames');

//---------------------------------------------------------------------------

// router.use('/videogames', videogames);

router.get('/videogame/:id', detalleId);

router.get('/genres', genres);

router.post('/videogame', addVideogames);

router.get('/platforms', platforms);

// router.get('/videogames', videogames);


//----------------------------------------------------------------------------------

router.get('/videogames', async (req, res) => {
    
    const {name} = req.query;
    if (name) {
        let searchName = await searchGames(name);

        let videoNames = searchName.filter(a => a.name.toUpperCase().includes(name.toUpperCase()));

        videoNames.length ?
            res.status(200).send(videoNames) :
            res.status(200).json({mensaje:'No existe el Videojuego'});
    }
    else {
        var todosGames = await videoGames();
        res.status(200).send(todosGames);
    } 
})


//---------------------------------------------------------------------------------------------



module.exports = router;
