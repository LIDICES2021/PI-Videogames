/* eslint-disable no-sequences */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { obtenerVideogames, buscarVideogames } from '../../actions/index';
import './Home.css';


function Home(props) {

    // Para traerme los videogames
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(obtenerVideogames())
    }, [dispatch])

    let games = useSelector(state => state.getVideogames)

 

    //Para buscar un Videogame
    const [state, setState] = useState({// creando variable en el state (name)
        name: ""
    })

    let handleChange = (e) => {// guardar en state.name el valor de mi input.
        setState({ name: e.target.value });
    }

    let handleSubmit = (e) => {//
        e.preventDefault();
        props.bGames(state.name)
       
    }

    let isFilter = useSelector(state => state.estaFiltrado)

    return (
        <div>
            <div className="navbar">
                <div className="pageInicial"><Link to="/">Page Inicial</Link></div>
                <div className="crearGame"><Link to="crearVideogame" >Add Videogame</Link></div>
                <div className="buscar">
                    <form className="form" onSubmit={(e) => handleSubmit(e)}>
                        <input
                            type="text"
                            placeholder="Buscar VideoGames"
                            className="input"
                            autoComplete="off"
                            value={state.name}
                            onChange={(e) => handleChange(e)} />
                        <button type="submit">Buscar</button>
                    </form>
                </div>
            </div>

            <div className="card">
                {
                    props.search && props.search.map(v => (

                        <div key={v.id} className="key">

                            <Link to={`/videogame/${v.id}`} >
                                <img className="img" src={v.image} alt={v.name} />
                                <h3 className="name">{v.name}</h3>
                            </Link>

                            <h4 className="genres">{(v.genres).join(', ')}</h4>

                        </div>

                    ))
                }
                </div>
                <div className="card">
                    {
                    !isFilter && games.map(i => (
                        <div key={i.id} className="key">

                            <img className="img" src={i.image} alt={i.name} />

                            <h3 className="name">{i.name}</h3>

                            <h4 className="genres">{(i.genres).join(', ')}</h4>

                        </div>
                    ))
                    }
                    </div>
        </div>
    )
}
//para la Busqueda de videogame
let mapStateToProps = (state) => {
    return {
        search: state.gameSearch
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
             bGames: name => dispatch(buscarVideogames(name))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
