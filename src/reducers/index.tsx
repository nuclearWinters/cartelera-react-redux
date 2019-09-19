import { combineReducers } from "redux"
import peliculasReducers from "./peliculasReducers"

export const rootReducer = combineReducers({
    peliculas: peliculasReducers
})

export type AppState = ReturnType<typeof rootReducer>