import axios from "axios";


export const obtenerVideogames = () => {
    return async (dispatch) => {
        try {
            let response = await axios.get('http://localhost:3001/videogames')
            dispatch({
                type: "OBTENER_VIDEOGAMES",
                payload: response.data
            });
        } catch (error) {
            console.log(error)
        }


    }
}

export const buscarVideogames = (name) => {
    return async (dispatch) => {
        try {

            let response = await axios.get(`http://localhost:3001/videogames?name=${name}`)
             
            dispatch({
                type: "BUSCAR_VIDEOGAMES",
                payload: response.data
            });
        } catch (error) {
            console.log(error)
        }

    }
}

export const detalleVideogame = (id) => {
    return async (dispatch) => {

        let response = await axios.get(`http://localhost:3001/videogame/${id}`);
        dispatch({
            type: "DETALLE_VIDEOGAME",
            payload: response.data
        });

    }
}

export const addVideogame = (payload) => {
    return async (dispatch) => {
        let response = await axios.post(`http://localhost:3001/videogame`, payload);
        return response;

    }
}

export const getGenres = () => {
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:3001/genres`);
        dispatch({
            type: "OBTENER_GENRES",
            payload: response.data
        });

    }
}

export const ordenAlfabetico = (payload) => {
    return {

        type: "ORDEN_ALFABETICO",
        payload,

    }
};

export const ordenRating = (payload) => {
    return {

        type: "ORDEN_RATING",
        payload,

    }
};



export const getPlatforms = () => {
    return async (dispatch) => {

        const response = await axios.get(`http://localhost:3001/platforms`);

        dispatch({
            type: "GET_PLATFORMS",
            payload: response.data
        });

    }

}

export const filterGenres = (payload) => {
    return {
        type: "FILTER_GENRES",
        payload

    }
}
