import { FETCH_PELICULAS, CarteleraTypes, Pelicula } from "../actions/types"

interface CarteleraPeliculasTypes {
  items: Pelicula[],
}

const initialState: CarteleraPeliculasTypes = {
    items: [],
}

export default function peliculas(state = initialState, action: CarteleraTypes ) {
    switch(action.type) {
        case FETCH_PELICULAS:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state
    }
}