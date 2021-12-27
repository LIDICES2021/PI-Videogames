/* eslint-disable default-case */
import {
    OBTENER_VIDEOGAMES,
    BUSCAR_VIDEOGAMES,
    OBTENER_GENRES,
    ORDEN_ALFABETICO,
    ORDEN_RATING,
    DETALLE_VIDEOGAME,
    GET_PLATFORMS
} from "../actions/index.js";


const initialState = {
    getVideogames: [],
    gameSearch: [],
    genres: [],
    ordenAlfabetico: "",
    ordenRating: "",
    detalleGame: {},
    gamePlatforms: [],
    estaFiltrado: false
};

function rootReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case OBTENER_VIDEOGAMES:
            return {...state, getVideogames: payload, estaFiltrado: false}

        case BUSCAR_VIDEOGAMES:
            return {...state, gameSearch: payload, estaFiltrado: true}

        case DETALLE_VIDEOGAME:
            return {...state, detalleGame: payload}

        case OBTENER_GENRES:
            
            return {...state, genres: payload}

        case GET_PLATFORMS:
        
            return {...state, gamePlatforms: payload}

        case ORDEN_ALFABETICO:
            return {...state, 
                ordenAlfabetico: payload,
                ordenRating: ""
            }
        case ORDEN_RATING:
            return {
                ...state,
                ordenRating: payload,
                ordenAlfabetico: ""
            }
        
        default:
            return {...state}
    }

}
export default rootReducer;