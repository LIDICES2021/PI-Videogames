
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


    let addGenr = await Genres.findAll({ 
      where: {name: genres}
    })
    await addgames.addGenres(addGenr);
    
    res.send('Creado el Videogames');

  } catch (err) {
    res.status(404).json({ err });
  }
}

module.exports = addVideogames;
