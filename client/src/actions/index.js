import axios from "axios";

export const OBTENER_VIDEOGAMES = "OBTENER_VIDEOGAMES";
export const BUSCAR_VIDEOGAMES = "BUSCAR_VIDEOGAMES";
export const OBTENER_GENRES = "OBTENER_GENRES";
export const ORDEN_ALFABETICO = "ORDEN_ALFABETICO";
export const ORDEN_RATING = "ORDEN_RATING";
export const DETALLE_VIDEOGAME = "DETALLE_VIDEOGAME";
export const CREAR_VIDEOGAME = "CREAR_VIDEOGAME";
export const GET_PLATFORMS = "GET_PLATFORMS"



export const obtenerVideogames = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3001/videogames')
            dispatch({
                type: OBTENER_VIDEOGAMES,
                payload: response.data
            });
        } catch (err) {
            console.log(err);
        }
    }
}

export const buscarVideogames = (name) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            dispatch({
                type: BUSCAR_VIDEOGAMES,
                payload: response.data
            });
        } catch (err) {
            console.log(err);
        }
    }
}

export const getGenres = () => {
    return async (dispatch) => {
        try {

            const response = await axios.get(`http://localhost:3001/genres`);
            dispatch({
                type: OBTENER_GENRES,
                payload: response.data
            });
        } catch (err) {
            console.log(err);
        }
    }
}



export const ordenAlfabetico = (payload) => {
    return (dispatch) => {
        dispatch({
            type: ORDEN_ALFABETICO,
            payload
        });
    }
};

export const ordenRating = (payload) => {
    return (dispatch) => {
        dispatch({
            type: ORDEN_RATING,
            payload
        });
    }
};




export const detalleVideogame = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/videogame/${id}`);
            dispatch({
                type: DETALLE_VIDEOGAME,
                payload: response.data
            });
        } catch (err) {
            console.log(err);
        }
    }
}

export const addVideogame = (payload) => {
    return async (dispatch) => {
        const response = await axios.post(`http://localhost:3001/videogame`, payload);
        console.log(response);

    }
}

export const getPlatforms = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/platforms`);

            dispatch({
                type: GET_PLATFORMS,
                payload: response.data
            });
        } catch (err) {
            console.log(err);
        }
    }

}
