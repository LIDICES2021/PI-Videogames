/* eslint-disable no-undef */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {addVideogame, getGenres, getPlatforms} from "../../actions/index";

import './CrearVideogame.css';





const CrearVideogame = (prop) => {

    const [state, setState] = useState({
        name: "",
        description: "",
        image: "",
        released: "",
        rating: "",
        platforms: "",
        genres: ""
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatforms())
    }, [dispatch])

    let genres = useSelector(state => state.genres)
    let platforms = useSelector(state => state.gamePlatforms)

    

    function handleChange(event) {
        event.preventDefault();
        setState({ ...state, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(!state.name) {
            return alert("Please enter a name")
        }
        else if(!state.description) {
            return alert("Please enter a description")
        }
        else if (!state.platforms) {
            return alert("Please enter a platforms")
        }


        dispatch(addVideogame(state));

        alert("VideoGame creado");
    
        setState ({
            
            name: "",
            description: "",
            image: "",
            released: "",
            rating: "",
            platforms: "",
            genres: "",
    
        })
    }

   
    


    return (
        <div>
            <h2>Formulario Para Crear VideoGame</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label className="nameL" htmlFor="name">Nombre del VideoGame</label><br/>
                <input
                    type='text'
                    name="name"
                    placeholder="nombre"
                    autoComplete="off"
                    value={state.name}
                    onChange={handleChange}
                    className="nameI"
                />
                <br /><br />

                <label className="descriptionL" htmlFor="description">Description</label><br />
                <input
                    type='text'
                    name="description"
                    placeholder="Descripcion"
                    rows="8"
                    cols="50"
                    autoComplete="off"
                    value={state.description}
                    onChange={handleChange}
                    className="descriptionI"
                />
                <br /><br />

                <label className="imageL" htmlFor="image">Imagen</label><br />
                <input
                    type='text'
                    name="image"
                    placeholder="imagen"
                    autoComplete="off"
                    value={state.image}
                    onChange={handleChange}
                    className="imageI"
                />
                <br /><br />

                <label className="releasedL" htmlFor="released">Fecha de Lanzamiento</label><br />
                <input
                    type='date'
                    name="released"
                    placeholder="Fecha de Lanzamiento"
                    autoComplete="off"
                    value={state.released}
                    onChange={handleChange}
                    className="releasedI"
                />
                <br /><br />

                <label className="ratingL" htmlFor="rating">Rating</label><br />
                <input
                    type='number'
                    name="rating"
                    placeholder="rating"
                    autoComplete="off"
                    value={state.rating}
                    onChange={handleChange}
                    className="ratingI"
                />
                <br /><br />

               <div className="platforms">
                
                <label className="label" >Plataformas:</label><br /><br />
                <select name="platforms" onChange={handleChange} >

                    {
                        platforms && platforms.map((p) => (
                            <option 
                            value={p}
                            >
                            {p}
                            </option>
                        ))
                    }
                </select>
                </div> 

                <br /><br />

              <div className="genero">
                <label className="label" >Genero:</label><br />
                <select name="genres" onChange={handleChange} >

                    {
                     genres && genres.map((g) => (

                           
                            <option key={g.id} className="option"                         
                            value={g.id}
                             >
                                {g.name}
                            </option>

                        ))
                    }

                </select>
                </div>

                
                 <br /><br />
                <>
                <button className="crear" type="submit">CREAR</button>
                </>
                </form>

            
        </div>
    )
}



export default CrearVideogame;
