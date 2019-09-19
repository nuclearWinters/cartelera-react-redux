import { FETCH_PELICULAS, CarteleraTypes, Pelicula } from "../actions/types"

interface CarteleraPeliculasTypes {
  items: Pelicula[],
}

const initialState: CarteleraPeliculasTypes = {
    items: [],
}

export default function posts(state = initialState, action: CarteleraTypes ) {
    console.log(action.type, action.payload)
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