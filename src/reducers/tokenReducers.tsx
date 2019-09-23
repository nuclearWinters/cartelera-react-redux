import { FETCH_TOKEN, FETCH_TOKEN_MODAL, CarteleraTypes } from "../actions/types"

interface CarteleraTokenTypes {
  Nombre: string | null,
  Usuario: string | null,
  isOpenModal: boolean
}

const initialState: CarteleraTokenTypes = {
    Nombre: null,
    Usuario: null,
    isOpenModal: false
}

export default function token(state = initialState, action: CarteleraTypes ) {
    switch(action.type) {
        case FETCH_TOKEN:
            return {
                ...state,
                Nombre: action.payload.Nombre,
                Usuario: action.payload.Usuario
            }
        case FETCH_TOKEN_MODAL:
            return {
                ...state,
                isOpenModal: action.payload
            }
        default:
            return state
    }
}