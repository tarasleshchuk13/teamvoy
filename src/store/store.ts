import { configureStore } from '@reduxjs/toolkit'
import { pokemonSlice } from './pokemon/pokemonSlice.ts'
import { pokemonDetailedSlice } from './pokemonDetailed/pokemonDetailedSlice.ts'

export const store = configureStore({
    reducer: {
        pokemon: pokemonSlice.reducer,
        pokemonDetailed: pokemonDetailedSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
