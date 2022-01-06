require("dotenv").config();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { Op } = require("sequelize");
const { Videogame, Genres } = require("../db");


const searchDB = async (name) => {

    let searchName = await Videogame.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },// operador ilike resuelve Mayuscula y % contenga el name
        include: {
            model: Genres,
            attribute: ['name'],
            through: {
                attribute: [],
            },
        }
    });

    let resultsGamesDB = await searchName.map(e => {
        return {
            id: e.id,
            name: e.name,
            image: e.image,
            rating: e.rating,
            genres: e.genres.map(g => g.name),

        }
    });
    
    
    return (resultsGamesDB);

}

const searchAPI = async (name) => {

    const apiName = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${YOUR_API_KEY}`);
    let gameL = apiName.data.results;

    let resultsGamesAPI = await gameL.map(e => {
        return {
            id: e.id,
            name: e.name,
            image: e.background_image,
            rating: e.rating,
            genres: e.genres.map(g => g.name),

        }
    });
return (resultsGamesAPI);
}

const searchGames = async (name) => {

    let sDb = await searchDB(name);
    let sApi = await searchAPI(name);
    let total = sDb.concat(sApi);
    return total;
}
module.exports = searchGames;