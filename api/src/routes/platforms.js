require("dotenv").config();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;

const file = require("../../../videogames.json");

const platforms = async (req, res, next) => {

  var filtrado = []

  try {

   

  //   //con api


  let apiGames = `https://api.rawg.io/api/games?key=${YOUR_API_KEY}`;

  let datosDeApi = await axios.get(apiGames);
  apiGames = datosDeApi.data.next;
  let data =  datosDeApi.data.results

  data.forEach( e => e.platforms.forEach( platform => { filtrado.push(platform) }))

 let filterName = filtrado.map((e) => e.platform.name);

 let resultado = [];

 for(let i = 0; i < filterName.length; i++) {

  if (resultado.includes(filterName[i])) {
    //console.log(filterName[i])
  }
  else {
    resultado.push(filterName[i]);

  }

 }
res.status(200).json(resultado.sort());




// sin api

//     let data = file.results
//     data.forEach(e => e.platforms.forEach(platform => { filtrado.push(platform) }))
    
//     let filterName = filtrado.map((e) => e.platform.name);

//     let resultado = [];

//     for (let i = 0; i < filterName.length; i++) {

//       if (resultado.includes(filterName[i])) {
//         //console.log(filterName[i])
//       }
//       else {
//         resultado.push(filterName[i]);

//       }
//     }

//res.status(200).json(resultado.sort());
   

  } catch (err) {
    res.status(404).json({ err });
  }
}

module.exports = platforms;

