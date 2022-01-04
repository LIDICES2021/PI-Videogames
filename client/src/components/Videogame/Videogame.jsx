import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detalleVideogame } from '../../actions/index';
import { Link } from "react-router-dom";

import './Videogame.css';

function Videogame() {

    let params = useParams();


    const game = useSelector((store) => store.detalleGame);

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(detalleVideogame(params.id));
    }, [dispatch, params.id]);


    return (
        <div className="detalle">
            <Link to='/home'><button className="boton"><b>Volver</b></button></Link>
                <h2 className="videojuego">Detalle del Videojuego</h2>
                <h3 className="nombre"> Nombre: {game.name}</h3>
                <div className="imagen"><img src={game.image} alt={game.name} width="500px" height="auto"/></div>
                <h4 className="genero">Géneros: {game.genres}</h4>
                <h4 className="descripcion">Descripción: <div dangerouslySetInnerHTML={{__html: game.description}}></div></h4>
                <h4 className="lanzamiento">Fecha de Lanzamiento: {game.released}</h4>
                <h4 className="plataforma">Plataformas: {game.platforms}</h4>
        </div>
    );
}

export default Videogame;