
const db = require("../db");

const { Videogame, Genres } = require("../db");

const addVideogames = async (req, res, next) => {


  try {
    const { name, description, image, released, rating, platforms, genres } = req.body;
    const addgames = await Videogame.create({
      name: name,
      description: description,
      image: image,
      released: released,
      rating: rating,
      platforms: platforms
    });

    

    await addgames.addGenres(genres)

    res.send('Creado el Videogames');

  } catch (err) {
    res.status(404).json({ err });
  }
}

module.exports = addVideogames;
