import { FETCH_TOKEN, FETCH_TOKEN_MODAL } from "./types"
import axios from "axios"
import decode from "jwt-decode"
import AuthHelperMethods from "../components/funciones"

const Auth = new AuthHelperMethods()

export const fetchTokenSuccess = (Nombre: string | null, Usuario: string | null) => ({
    type: FETCH_TOKEN,
    payload: {
        Nombre,
        Usuario
    }
})

export const fetchTokenModalSuccess = (isOpenModal: boolean) => ({
    type: FETCH_TOKEN_MODAL,
    payload: isOpenModal
})

export const fetchToken = (Usuario: string, Contraseña: string) => (dispatch: any) => {
    axios.post(`https://cartelera-node.herokuapp.com/sing-in`, {userInput: {
        Usuario,
        Contraseña
    }})
    .then(token => {
        let decoded: any = decode(token.data);
        Auth.setToken(token.data)
        const Nombre = decoded.Nombre
        const Usuario = decoded.Usuario
        dispatch(fetchTokenModalSuccess(false))
        dispatch(fetchTokenSuccess(Nombre, Usuario))
    })
    .catch(err => console.log(err))
}