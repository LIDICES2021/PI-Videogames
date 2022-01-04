import './App.css';

import React from 'react';
import {Routes, Route} from 'react-router-dom';


import Page from "./components/Page/Page.jsx";
import Home from "./components/Home/Home.jsx";
import Videogame from "./components/Videogame/Videogame.jsx";
import CrearVideogame from "./components/CrearVideogame/CrearVideogame.jsx";



function App() {
    
  return (  
  <Routes>
    <Route path="/" element={<Page/>} />
    <Route path="home" element={<Home/>} />
    <Route path="/videogame/:id" element={<Videogame/>} />
    <Route path="crearVideogame" element={<CrearVideogame/>} />
  
  </Routes>
  );

}

export default App;
