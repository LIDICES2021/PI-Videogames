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

    const [orden, setOrden] = useState('');

    

    //mi paginado
    const [currentPage, setCurrentPage] = useState(1);// creo mi estado de pagina actual

    const [videogamesPerPage, setVideogamePerPage] = useState(15); // creo mi estado de videogame por pagina

    const indexOfLastVideogame = currentPage * videogamesPerPage;

    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;

    const currentVideogames = games.slice(indexOfFirstVideogame, indexOfLastVideogame);
   
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
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
        setCurrentPage(1);
        setOrden(`Orden ${e.target.value}`)
    }

    let handleOrdenRating= (e) => {
        e.preventDefault();
        dispatch(ordenRating(e.target.value));
        setCurrentPage(1);
        setOrden(`Orden ${e.target.value}`)
    }


    return (
        <div className="fondo">
            <div className="navbar">
                <Link to="/"><button className="pageInicial">Volver</button></Link>
                <button type="button" className="reset" onClick={handleReset}><b>Cargar juegos</b></button>
                
                <Link to="/crearVideogame"><button className="crearGame"><b>Crear</b></button></Link>
                <select className="selectorAlf" onChange={(e)=> handleGamesAlf(e)}>
                    <option value="All">Alfabético</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
                <select  className="selectorRat" onChange={(e)=> handleOrdenRating(e)}>
                    <option value="All">Buscar rating</option>
                    <option value="asc">0-5</option>
                    <option value="desc">5-0</option>
                </select>
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
           
            <Paginado videogamesPerPage = {videogamesPerPage} cantGames = {games.length} paginado = {paginado} currentPage={currentPage}/>
            

            <div className="container">
                    {
                        currentVideogames && currentVideogames.map(v => {
                            return (
                                <div key={v.id} className="key">
                                    
                                        <Card className="img" image={v.image ? v.image : img } name={v.name} genres={v.genres} rating={v.rating}/>
                                    
                                    <Link to={`/videogame/${v.id}`} ><h3 className="buscarDetalle">Ver detalles</h3></Link>
                                </div>
                            )
                        })
                    }
            </div>
            <div className="noEncontrado">
                {
                    currentVideogames.length === 0 && <h1>No se han encontrado resultados</h1>
                }
                </div>
            </div>
    )
}

export default Home
