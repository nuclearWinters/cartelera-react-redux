export const FETCH_PELICULAS = "FETCH_PELICULAS"

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

interface FetchPostsAction {
  type: typeof FETCH_PELICULAS
  payload: Pelicula[]
}
  
export type CarteleraTypes = FetchPostsAction