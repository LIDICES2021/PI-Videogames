require("dotenv").config();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;

const { Videogame, Genres } = require("../db");

const detalleId = async (req, res, next) => {

  const { id } = req.params;

  try {
    if (!id.includes("-")) {

      const datosDeApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`);
      const data = datosDeApi.data;

      var detalle = {
        id: data.id,
        name: data.name,
        image: data.background_image,
        genres: data.genres.map((genres) => genres.name),
        description: data.description,
        released: data.released,
        rating: data.rating,
        platforms: data.platforms.map((p) => p.platform.name),
        source: "api"
      }

    } else {
      const dbId = await Videogame.findByPk(id, {
        include: [Genres]
      });
        detalle = {
        id: dbId.id,
        name: dbId.name,
        image: dbId.image,
        genres: dbId.genres.map((genres) => genres.name),
        description: dbId.description,
        released: dbId.released,
        rating: dbId.rating,
        platforms: dbId.platforms,
        source: "db"
      }
    }
    res.status(200).json(detalle);
  } catch (err) {
    return res.status(404).json({ err });
  }
}

module.exports = detalleId;
