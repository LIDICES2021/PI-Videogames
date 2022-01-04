
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {addVideogame, getGenres, getPlatforms} from "../../actions/index";

import {Link} from 'react-router-dom';

import './CrearVideogame.css';


const CrearVideogame = () => {

    const [state, setState] = useState({
        name: "",
        description: "",
        image: "",
        released: "",
        rating: "",
        platforms: "",
        genres: []
    });
 //para platforms y genres
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatforms())
    }, [dispatch])

    let allGenres = useSelector(state => state.todosGenres)
    let platforms = useSelector(state => state.gamePlatforms)

    

    const handleChange = (e) => {
        e.preventDefault();
        setState({ ...state, [e.target.name]: e.target.value })

    }
    const handleSelectGenres = (e) => {
        setState({ ...state, genres: [...state.genres, e.target.value]})
  
    }
   

    const handleSelectPlatforms = (e) => {
        if(state.platforms !== ""){
            setState({ ...state, platforms: state.platforms.split(', ').concat(e.target.value).join(', ')})
        }
        else {
            setState({ ...state, platforms: e.target.value})
        }

    }

    const getGenreName = (genreId) => {
       
        let buscar = []
        // eslint-disable-next-line eqeqeq
        buscar = allGenres.find(g => g.id == genreId)
       
        return buscar.name;
  
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!state.name)  {
            return alert("Error, el nombre no puede estar vacío")
        }
        else if(!state.description) {
            return alert("Error, la descripción no es válida")
        }
        else if (!state.released) {
            return alert("Error, debe seleccionar la fecha de lanzamiento")
        }
        else if (!state.platforms) {
            return alert("Error, debe seleccionar al menos una plataforma")
        }
        else if (!state.genres) {
            return alert("Error, debe seleccionar al menos un género")
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
            genres: []
    
        })
    }
    return (
        <div className="general">
            <Link to='/home'><button className="volver">Volver</button></Link>
        <div className='formulario'>
            <h1 className='titleForm'>Crear Videojuego</h1>
            <form className="form" onSubmit={handleSubmit}>
                <label className="labelForm" htmlFor="name">Nombre:<span className="aster">*</span></label>
                <input
                    type='text'
                    name="name"
                    placeholder="nombre: ejemplo sonic"
                    autoComplete="off"
                    value={state.name}
                    onChange={handleChange}
                    className="inputForm"
                />
                <br /><br />

                <label className="labelForm" htmlFor="description">Descripción:<span className="aster">*</span></label>
                <input
                    type='textarea'
                    name="description"
                    placeholder="describe el videojuego"
                    rows="8"
                    cols="50"
                    autoComplete="off"
                    value={state.description}
                    onChange={handleChange}
                    className="inputForm"
                />
                <br /><br />

                <label className="labelForm" htmlFor="image">Imagen:</label>
                <input
                    type='text'
                    name="image"
                    placeholder="url de la imagen"
                    autoComplete="off"
                    value={state.image}
                    onChange={handleChange}
                    className="inputForm"
                />
                <br /><br />

                <label className="labelForm" htmlFor="released">Lanzamiento:<span className="aster">*</span></label>
                <input
                    type='date'
                    name="released"
                    autoComplete="off"
                    value={state.released}
                    onChange={handleChange}
                    className="inputForm"
                />
                <br /><br />

                <label className="labelForm" htmlFor="rating">Rating:<span className="aster">*</span></label>
                <input
                    type='number'
                    name="rating"
                    placeholder="rango válido de 0 a 5"
                    autoComplete="off"
                    value={state.rating}
                    onChange={handleChange}
                    className="inputForm"
                    step="0.1"
                    min="0"
                    max="5"
                />
                <br /><br />

               <div className="platforms">
                
                <label className="labelForm" >Plataformas:<span className="aster">*</span></label>
                <select className="inputForm" name="platforms" onChange={handleSelectPlatforms} >
                <option value="Android"></option>
                    {
                        platforms.map((p) => (
                            <option key={p} 
                            value={p}
                            >
                            {p}
                            </option>
                        ))
                    }
                </select>
                <div className="bordeado"><br></br>
                 <p>{state.platforms}</p>
                </div> 
                </div> 
                <div className="genre">
                    <label className="labelForm" >Géneros:<span className="aster">*</span></label>
                    <select className="inputForm" name="genres" onChange={handleSelectGenres} >
                        <option value="1"></option>
                        {
                            allGenres.map((g) => (
                                <option key={g.id}  className="option" value={g.id}>{g.name}</option>
                            ))
                        }
                    </select>
                    <div className="bordeado"><br></br>
                        {

                            state.genres.map(g => getGenreName(g)).join(', ')
                            

                        }
                    </div>
                    
                </div>
                <br></br>
                <button className="crear" type="submit">Crear</button>
                </form>
        </div>
        </div>
    )
}



export default CrearVideogame;
