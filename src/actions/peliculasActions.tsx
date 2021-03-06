import { FETCH_PELICULAS, Pelicula } from "./types"
import axios from "axios"

export const fetchPeliculasSuccess = (peliculas: Pelicula[]) => ({
    type: FETCH_PELICULAS,
    payload: peliculas
})

export const fetchPeliculas = () => (dispatch: any) => {
    axios.get("https://cartelera-node.herokuapp.com/get-movie")
    .then(peliculas => {
        dispatch(fetchPeliculasSuccess(peliculas.data))
    })
    .catch(err => console.log(err))
}