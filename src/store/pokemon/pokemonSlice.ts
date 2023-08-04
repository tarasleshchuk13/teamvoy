import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPokemon = createAsyncThunk<PokemonResponse, void, { rejectValue: void }>(
    'pokemon/fetchPokemon',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon/?limit=12')
            return response.data
        } catch (e) {
            return rejectWithValue()
        }
    },
)

export const fetchMorePokemon = createAsyncThunk<PokemonResponse, string, { rejectValue: void }>(
    'pokemon/fetchMorePokemon',
    async (url: string, { rejectWithValue }) => {
        try {
            const response = await axios.get<PokemonResponse>(url)
            return response.data
        } catch (e) {
            return rejectWithValue()
        }
    },
)

const initialState: PokemonState = {
    pokemon: [],
    isLoading: false,
}

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPokemon.pending, state => {
            state.isLoading = true
        })
        builder.addCase(fetchPokemon.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = false
            state.pokemon = action.payload.results
            state.nextPageUrl = action.payload.next
        })
        builder.addCase(fetchPokemon.rejected, (state, ) => {
            state.isLoading = false
            state.error = true
        })
        builder.addCase(fetchMorePokemon.pending, state => {
            state.isLoading = true
        })
        builder.addCase(fetchMorePokemon.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = false
            state.pokemon = [...state.pokemon, ...action.payload?.results]
            state.nextPageUrl = action.payload.next
        })
        builder.addCase(fetchMorePokemon.rejected, (state) => {
            state.isLoading = false
            state.error = true
        })
    },
})
