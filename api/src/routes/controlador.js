require("dotenv").config();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;




const queryGame = async (req, res, next) => {
  try {
    const {name} = req.query;
    const datosDeApi = await axios.get(
      `https://api.rawg.io/api/games?search=${name}&key=${YOUR_API_KEY}`
    );
    res.status(200).json(datosDeApi.data.results);
    next();
  } catch (err) {
    res.status(404).json({ err });
  }
};

const getGenre = async (req, res, next) => {
    try {
      const datosDeApi = await axios.get(
        ` https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`
      );
      res.status(200).json(datosDeApi.data.results);
      next();
    } catch (err) {
      res.status(404).json({ err });
    }
  };

  const getId = async (req, res, next) => {
    try {

      const {id} = req.params;
      const datosDeApi = await axios.get(
        ` https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`
      );
      res.status(200).json(datosDeApi.data.results.id);
      next();
    } catch (err) {
      res.status(404).json({ err });
    }
  };





module.exports = {getVideoGames, getGenre, queryGame, getId};