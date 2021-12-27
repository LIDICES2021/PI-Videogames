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
        <>
            <div >
                <h1>Detalle del VideoGames</h1>
            </div>
            <div key={params.id} className="text">
                <div>
                <h1> Name: {game.name}</h1>
                <img src={game.image} alt={game.name} width="500px" height="auto" />
                </div>
                <div className="container">
                <h4>Genres: {game.genres}</h4>
                <h4>Description: {game.description}</h4>
                <h4>Released: {game.released}</h4>
                <h4>Platforms: {game.platforms}</h4>
                <h4>Source: {game.source}</h4>
                </div>
                <Link to={`/home`}><button type="submit">Home</button></Link>   
            </div>
            
        </>
    );
}

export default Videogame;