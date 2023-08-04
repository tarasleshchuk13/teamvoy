export interface PokemonDetailedState {
    pokemon: Record<string, PokemonDetailed>
}

export interface PokemonDetailed {
    pokemon?: PokemonDetailedData
    error?: boolean
    isLoading: boolean
}

export interface PokemonDetailedData {
    id: number
    name: string
    types: string[]
    weight: number
    movesCount: number
    attack: number
    defense: number
    hp: number
    specialAttack: number
    specialDefense: number
    speed: number
    photo: string
}

export interface PokemonDetailedResponse {
    id: number
    name: string
    types: Type[]
    weight: number
    moves: unknown[]
    stats: Stat[]
    sprites: Sprites
}

export interface Sprites {
    front_default: string
}

export interface Type {
    type: {
        name: string
    }
}

export interface Stat {
    base_stat: number,
}
