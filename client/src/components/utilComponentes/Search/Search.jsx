import React, {useState}from 'react';
import {useDispatch} from 'react-redux';
import {buscarVideogames, obtenerVideogames } from '../../../actions/index';
import './Search.css';

const Search = () => {

    const dispatch = useDispatch();
    const [name, setName] = useState('');


    let handleChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }
 


    let handleSubmit = (e) => {
        e.preventDefault();
        if(handleChange.length > 0) {
            dispatch(buscarVideogames(name));
        }
        else {
            dispatch(obtenerVideogames());
        }

    }

    return (
        <div className="search">
            <input
            type="text"
            placeholder="Busque el videojuego"
            onChange={(e) => handleChange(e)}
            />
            <button type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}

export default Search
