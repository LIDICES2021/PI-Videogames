import React, {useState, useEffect}from 'react';
import {useDispatch} from 'react-redux';
import {buscarVideogames, obtenerVideogames} from '../../../actions/index';
import './Search.css';

const Search = () => {

    const dispatch = useDispatch();

    const [name, setName] = useState('');

    useEffect(() => {
        if(name.length > 0) {
            dispatch(buscarVideogames(name));
        } else {
            dispatch(obtenerVideogames)
        }
        
    }, [dispatch, name])

    let handleChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
       
    }

      let handleSubmit = (e) => {
        e.preventDefault();
        dispatch(buscarVideogames(name));

        
    }

    return (
        <div className="search">
            <input
            type="text"
            placeholder="Busque el videojuego"
            onChange={(e) => handleChange(e)}
            className="inputSearch"
            />
           
            <button  type="submit" className="botonSearch" onClick={handleSubmit}><b>Buscar</b></button>
           </div>
    )
}

export default Search
