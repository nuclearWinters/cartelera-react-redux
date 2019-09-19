import { FETCH_PELICULAS, Pelicula } from "./types"
import axios from "axios"

export const fetchPeliculasSuccess = (peliculas: Pelicula[]) => ({
    type: FETCH_PELICULAS,
    payload: peliculas
})

export const fetchPeliculas = () => (dispatch: any) => {
    axios.get("http://192.168.0.7:3001/get-movie")
    .then(peliculas => {
        dispatch(fetchPeliculasSuccess(peliculas.data))
        //dispatchPeliculas(peliculas.data)
        /*setDispatchnow(false)*/
    })
    .catch(err => console.log(err))
}