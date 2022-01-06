/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './Home.css';

import {Link} from 'react-router-dom';

import {obtenerVideogames, filterGenres, ordenAlfabetico, ordenRating} from '../../actions/index';
import Card  from '../utilComponentes/Card/Card.jsx';
import Paginado from '../utilComponentes/Paginado/Paginado.jsx';
import Search from '../utilComponentes/Search/Search.jsx';
import img from '../Home/images.png';


const Home = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(obtenerVideogames());
    }, [dispatch])


    const games = useSelector((state) => state.videogames)// para traerme los videoGames

    const noEncontrado = useSelector((state) => state.mensajeError)

    const [orden, setOrden] = useState('');

    

    //mi paginado
    const [paginaActual, setPaginaActual] = useState(1);// creo mi estado de pagina actual

    const [juegosPorPagina, setJuegosPorPagina] = useState(15); // creo mi estado de videogame por pagina

    const indiceUltimoVideojuego = paginaActual * juegosPorPagina;

    const indicePrimerVideojuego = indiceUltimoVideojuego  - juegosPorPagina;

    const paginadoVideojuego = games.slice(indicePrimerVideojuego, indiceUltimoVideojuego);
   
    const paginado = (pageNumber) => {
        setPaginaActual(pageNumber)
    }

       let handleReset = (e) => {
        e.preventDefault();
        dispatch(obtenerVideogames());
    }

    let handleGenres = (e) => {
        e.preventDefault();
        dispatch(filterGenres(e.target.value));
    }

    let handleGamesAlf = (e) => {
        e.preventDefault();
        dispatch(ordenAlfabetico(e.target.value));
        setPaginaActual(1);
        setOrden(`Orden ${e.target.value}`)
    }

    let handleOrdenRating= (e) => {
        e.preventDefault();
        dispatch(ordenRating(e.target.value));
        setPaginaActual(1);
        setOrden(`Orden ${e.target.value}`)
    }


    return (
        <div className="fondo">
            <div className="navbar">
                <Link to="/"><button className="pageInicial">Volver</button></Link>
                <select className="selectorAlf" onChange={(e)=> handleGamesAlf(e)}>
                    <option value="All">Ordenar Nombre</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
                <select  className="selectorRat" onChange={(e)=> handleOrdenRating(e)}>
                    <option value="All">Ordenar Rating</option>
                    <option value="asc">0-5</option>
                    <option value="desc">5-0</option>
                </select>
               
                <button type="button" className="reset" onClick={handleReset}><b>Cargar juegos</b></button>
                <Link to="/crearVideogame"><button className="crearGame"><b>Crear</b></button></Link>
                <select  className="filtroGenres" onChange={(e) =>{handleGenres(e)}}>
                    <option value="All">Buscar géneros</option>
                    <option value="Sports">Sports</option>
                    <option value="Indie">Indie</option>
                    <option value="Action">Action</option>
                    <option value="Adventure">Adventure</option>
                    <option value="RPG">RPG</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Casual">Casual</option>
                    <option value="Simulation">Simulation</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Arcade">Arcade</option>
                    <option value="Platformer">Platformer</option>
                    <option value="Massively Multiplayer">Massively Multiplayer</option>
                    <option value="Racing">Racing</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Family">Family</option>
                    <option value="Board Games">Board Games</option>
                    <option value="Educational">Educational</option>
                    <option value="Card">Card</option>
                </select>
                <Search  />
               
            </div>
           
            <Paginado videogamesPerPage = {juegosPorPagina} cantGames = {games.length} paginado = {paginado} currentPage={paginaActual}/>
            

            <div className="container">
                    {
                        paginadoVideojuego && paginadoVideojuego.map(v => {
                            return (
                                <div key={v.id} className="key">
                                    
                                        <Card className="img" data={v.id} image={v.image ? v.image : img } name={v.name} genres={v.genres} rating={v.rating}/>
                                </div>
                            )
                        })
                    }
            </div>
                  
            <div className="noEncontrado">
                {
                      <h1>{noEncontrado.mensaje}</h1>
                }
                </div>
            </div>
    )
}

export default Home
