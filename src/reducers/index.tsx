import { combineReducers } from "redux"
import peliculasReducers from "./peliculasReducers"
import tokenReducers from "./tokenReducers"

export const rootReducer = combineReducers({
    peliculas: peliculasReducers,
    token: tokenReducers
})

export type AppState = ReturnType<typeof rootReducer>