export const FETCH_PELICULAS = "FETCH_PELICULAS"
export const FETCH_TOKEN = "FETCH_TOKEN"
export const FETCH_TOKEN_MODAL = "FETCH_TOKEN_MODAL"

export interface Pelicula {
  user: {
    name: string, 
    username: string, 
    id: number
  }, 
  receiver_id: number,
  message: string,
  date?: Date
}

interface UserData {
  Nombre: string,
  Usuario: string
}

interface FetchPostsAction {
  type: typeof FETCH_PELICULAS
  payload: Pelicula[]
}

interface FetchTokenAction {
  type: typeof FETCH_TOKEN
  payload: UserData
}

interface FetchTokenModalAction {
  type: typeof FETCH_TOKEN_MODAL
  payload: boolean
}
  
export type CarteleraTypes = FetchPostsAction | FetchTokenAction | FetchTokenModalAction