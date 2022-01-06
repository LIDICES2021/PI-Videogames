
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {addVideogame, getGenres, getPlatforms, } from "../../actions/index";

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
    
    const [errors, setErrors] = useState({});

 //para platforms y genres
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms());
    }, [dispatch])

    let genres = useSelector(state => state.todosGenres)
    let platforms = useSelector(state => state.gamePlatforms)
       

    const handleChange = (e) => {
        e.preventDefault();
        setState({ ...state, [e.target.name]: e.target.value })
        setErrors(validateForm({...state, [e.target.name]: e.target.value}))

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
    const handleRemovePlatformsAdd = (e) => {
        setState({ 
            ...state, platforms: state.platforms.split(', ').filter(p => p !== e).join(', ')
        })

    }
    const handleRemoveGenresAdd = (e) => {
        setState({ 
            ...state, genres: state.genres.filter(g => g !== e)
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validateForm({...state, [e.target.name]: e.target.value}))

        
       
        alert("VideoGame creado");
        dispatch(addVideogame(state));
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
        <div className='formulario'>
            <h1 className='titleForm'>Crear Videojuego</h1>

            <form className="form" onSubmit={handleSubmit}>
            <label className="labelForm">Nombre:<span className="aster">*</span></label>
            <input
                    type='text' 
                    name="name" 
                    placeholder="nombre: ejemplo sonic" 
                    value={state.name} 
                    onChange={handleChange} 
                    className="inputForm"
                />{errors.name && <p className="error1">{errors.name}</p>}

            <label className="labelForm">Imagen:</label>
                <input
                    type='text'
                    name="image"
                    placeholder="url de la imagen"
                    value={state.image}
                    onChange={handleChange}
                    className="inputForm"
                /> 

                <label className="labelForm">Lanzamiento:<span className="aster">*</span></label>
                <input
                    type='date'
                    name="released"
                    value={state.released}
                    onChange={handleChange}
                    className="inputForm"
                />{errors.released && (<p className="error2">{errors.released}</p>)}

                <label className="labelForm">Descripción:<span className="aster">*</span></label>
                <input
                    type='textarea'
                    name="description"
                    placeholder="describe el videojuego"
                    rows="8"
                    cols="50"
                    value={state.description}
                    onChange={handleChange}
                    className="inputForm"
                />{errors.description && <p className="error3">{errors.description}</p>}

                <label className="labelForm" >Rating:<span className="aster">*</span></label>
                <input
                    type='number'
                    name="rating"
                    placeholder="rango válido de 0 a 5" 
                    value={state.rating}
                    onChange={handleChange}
                    className="inputForm"
                    step="0.1"
                    min="0"
                    max="5"
                />{errors.rating && (<p className="error4">{errors.rating}</p>)}
                
                <label className="labelForm" >Plataformas:</label>

                <select  className="inputForm" name="platforms" onChange={handleSelectPlatforms} >

                <option value="" hidden>seleccionar</option>

                    { platforms.map((p) => (<option key={p} value={p}>{p}</option>))}

                </select>

                {state.platforms !== "" && state.platforms.split(', ').map((p) => (
                    <div key={p} className="delete">
                        <p className="agregar">{p}</p>
                        <button className="eliminar" onClick={() => handleRemovePlatformsAdd(p)}>X</button>
                    </div>
                ))}

                <label className="labelForm" >Géneros:</label>
                <select className="inputForm" name="genres" onChange={handleSelectGenres} >
                    <option value="" hidden>seleccionar</option>
                    {
                        genres.map((g) => (
                            <option key={g.id} className="option" value={g.name}>{g.name}</option>
                        ))
                    }
                </select>
                {
                    state.genres.map(g =>
                        <div key={g} className="delete1">
                            <p className="bordeado">{g}</p>
                            <button className="eliminar1" onClick={() => { handleRemoveGenresAdd(g) }}>x</button>
                        </div>
                    )
                }

                <button className="crear" type="submit">Crear</button>
                <Link to='/home'><button className="volver">Volver</button></Link>
        </form >
    </div> 
    )
}
 
function validateForm(state) {
    let errors = {};
    
    if(!state.name) {
        
        errors.name = 'Error, campo obligatorio';
    }
    if (!state.description) {
        errors.description = "Error, campo obligatorio";
    }
    if (!state.released) {
        errors.released = "Error, campo obligatorio";
    }
    if (!state.rating) {
        errors.rating = "Error, campo obligatorio";
    }
   return errors;
}
export default CrearVideogame;


// <div className='formulario'>
// <h1 className='titleForm'>Crear Videojuego</h1>
// <form className="form" onSubmit={handleSubmit}>
    
//     <label className="labelForm">Nombre:<span className="aster">*</span></label>
//     {errors.name && <p className="error">{errors.name}</p>}
//     <input
//         type='text'
//         name="name"
//         placeholder="nombre: ejemplo sonic"
//         value={state.name}
//         onChange={handleChange}
//         className="inputForm"
//     />
//     <br /><br />
//     <label className="labelForm">Descripción:<span className="aster">*</span></label>
//     {errors.description && <p className="error">{errors.description}</p>}
//     <input
//         type='textarea'
//         name="description"
//         placeholder="describe el videojuego"
//         rows="8"
//         cols="50"
//         value={state.description}
//         onChange={handleChange}
//         className="inputForm"
//     />
//     <br /><br />
//     <label className="labelForm">Imagen:</label>
//     <input
//         type='text'
//         name="image"
//         placeholder="url de la imagen"
//         value={state.image}
//         onChange={handleChange}
//         className="inputForm"
//     />
//     <br /><br />
//     <label className="labelForm">Lanzamiento:<span className="aster">*</span></label>
//     {errors.released && (<p className="error">{errors.released}</p>)}
//     <input
//         type='date'
//         name="released"
//         value={state.released}
//         onChange={handleChange}
//         className="inputForm"
//     />
   
//     <br /><br />
//     <label className="labelForm" >Rating:<span className="aster">*</span></label>
//     {errors.rating && (<p className="error">{errors.rating}</p>)}
//     <input
//         type='number'
//         name="rating"
//         placeholder="rango válido de 0 a 5" 
//         value={state.rating}
//         onChange={handleChange}
//         className="inputForm"
//         step="0.1"
//         min="0"
//         max="5"
//     />
//     <br /><br />
//    <div className="platforms">
//     <label className="labelForm" >Plataformas:</label>

//     <select  className="inputForm" name="platforms" onChange={handleSelectPlatforms} >

//     <option value="" hidden>seleccionar</option>

//         { platforms.map((p) => (<option key={p} value={p}>{p}</option>))}

//     </select>
    
//  <br></br>
//         {
//         state.platforms !== "" && state.platforms.split(', ').map((p) => (
//                 <div key={p} className="delete">
//                      <p>{p}</p>
//                     <button className="eliminar" onClick={() => handleRemovePlatformsAdd(p)}>X</button>
//                 </div>
                
//             ))}
        
//     <div className="genre"><br></br>
//         <label className="labelForm" >Géneros:</label>
//         <select className="inputForm" name="genres" onChange={handleSelectGenres} >
//             <option value="" hidden>seleccionar</option>
//             {
//                 genres.map((g) => (
//                     <option key={g.id}  className="option" value={g.name}>{g.name}</option>
//                 ))
//             }
//         </select>
        
//     </div><br></br>
//     <div>
//             {
//                 state.genres.map(g => 
//                     <div key={g} className="bordeado">
//                     <p>{g}</p>
//                     <button className="eliminar" onClick={() => {handleRemoveGenresAdd(g)}}>x</button>
//                     </div>
//                 )
//             }
//     </div>
//     <br></br><br></br>
//     <button className="crear" type="submit">Crear</button>
//     <Link to='/home'><button className="volver">Volver</button></Link>
//     </div>
//     </form>

// </div>













// if (!state.name) {
        //     return alert("Error, el nombre no puede estar vacío")
        // }
        // else if (!state.description) {
        //     return alert("Error, describa el videojuego")
        // }
        // else if (!state.released) {
        //     return alert("Error, debe seleccionar la fecha de lanzamiento")
        // }










// const getGenreName = (genreId) => {
       
    //     let buscar = []
    //     // eslint-disable-next-line eqeqeq
    //     buscar = allGenres.find(g => g.id == genreId)
       
    //     return buscar.name;
    // }

    // state.genres.map(g => getGenreName(g)).join(', ')