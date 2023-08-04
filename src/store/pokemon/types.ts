interface PokemonState {
    pokemon: Pokemon[]
    isLoading: boolean
    error?: boolean
    nextPageUrl?: string
}

interface Pokemon {
    name: string
    url: string
}

interface PokemonResponse {
    next: string
    results: Pokemon[]
}
