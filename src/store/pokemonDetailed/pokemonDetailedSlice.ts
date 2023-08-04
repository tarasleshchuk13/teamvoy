import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { PokemonDetailedData, PokemonDetailedResponse, PokemonDetailedState } from './types.ts'

export const fetchDetailedPokemonByName = createAsyncThunk<PokemonDetailedData, string, { rejectValue: void }>(
    'pokemon/fetchDetailedPokemonByName',
    async (name: string, { rejectWithValue }) => {
        try {
            const response = await axios.get<PokemonDetailedResponse>(`https://pokeapi.co/api/v2/pokemon/${name}`)
            const pokemonData = response.data
            return  {
                name: pokemonData.name,
                id: pokemonData.id,
                types: pokemonData.types.map(t => t.type.name),
                weight: pokemonData.weight,
                movesCount: pokemonData.moves.length,
                hp: pokemonData.stats[0].base_stat,
                attack: pokemonData.stats[1].base_stat,
                defense: pokemonData.stats[2].base_stat,
                specialAttack: pokemonData.stats[3].base_stat,
                specialDefense: pokemonData.stats[4].base_stat,
                speed: pokemonData.stats[5].base_stat,
                photo: pokemonData.sprites.front_default
            }
        } catch (e) {
            return rejectWithValue()
        }
    },
)

const initialState: PokemonDetailedState = {
    pokemon: {}
}

export const pokemonDetailedSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDetailedPokemonByName.pending, (state, action) => {
            const pokemonName = action.meta.arg
            state.pokemon[pokemonName] = {
                isLoading: true,
            }
        })
        builder.addCase(fetchDetailedPokemonByName.fulfilled, (state, action) => {
            const pokemonName = action.meta.arg
            state.pokemon[pokemonName] = {
                isLoading: false,
                error: false,
                pokemon: action.payload
            }
        })
        builder.addCase(fetchDetailedPokemonByName.rejected, (state, action) => {
            const pokemonName = action.meta.arg
            state.pokemon[pokemonName] = {
                isLoading: false,
                error: true
            }
        })
    },
})
