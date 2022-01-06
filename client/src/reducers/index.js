/* eslint-disable default-case */


const initialState = {

    todosVideogames: [],

    videogames: [],//

    todosGenres: [],

    detalleGame: {},

    gamePlatforms: [],

    mensajeError: {},

};

function rootReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case "OBTENER_VIDEOGAMES":
            return {
                ...state,
                videogames: payload, mensajeError: {mensaje:''},
                todosVideogames: payload,
            }
        
        case "BUSCAR_VIDEOGAMES":

            if (Array.isArray(payload)) {
                debugger;

                return { ...state, videogames: payload, mensajeError: {mensaje:''} };

            } else {
                
                return { ...state, videogames: [], mensajeError: payload };
            }

        case "FILTER_GENRES":
            const games = state.todosVideogames
            const genresFiltered = payload === 'All' ? games : games.filter(e => e.genres.includes(payload));
            return {
                ...state,
                videogames: genresFiltered,
            }

        case "ORDEN_ALFABETICO":

            let ordenarAlf = payload === 'asc' ? state.videogames.sort((a, b) => {

                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            }) : state.videogames.sort((a, b) => {

                if (a.name < b.name) {
                    return 1;
                }
                if (a.name > b.name) {
                    return -1;
                }
                return 0;
            })

            return {
                ...state,
                videogames: ordenarAlf
            };


        case "ORDEN_RATING":
            let ordenarRating = payload === 'asc' ? state.videogames.sort((a, b) => {

                if (a.rating > b.rating) {
                    return 1;
                }
                if (a.rating < b.rating) {
                    return -1;
                }
                return 0;
            }) : state.videogames.sort((a, b) => {


                if (a.rating < b.rating) {
                    return 1;
                }
                if (a.rating > b.rating) {
                    return -1;
                }
                return 0;
            })
            return {
                ...state,
                videogames: ordenarRating
            };


        case "DETALLE_VIDEOGAME":
            
            return { ...state, detalleGame: payload }

        case "OBTENER_GENRES":

            return { ...state, todosGenres: payload }

        case "GET_PLATFORMS":

            return { ...state, gamePlatforms: payload }

        case "CREAR_VIDEOGAME":

            return { ...state, videogames: payload}
        default:
            return { ...state}
    }
}
export default rootReducer;