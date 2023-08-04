import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMorePokemon, fetchPokemon } from '../store/pokemon/pokemonSlice.ts'
import { AppDispatch, RootState } from '../store/store.ts'
import cls from './App.module.scss'
import { Card } from './card/Card.tsx'

export const App = () => {
    const dispatch = useDispatch<AppDispatch>()
    const pokemon = useSelector((state: RootState) => state.pokemon.pokemon)
    const isLoading = useSelector((state: RootState) => state.pokemon.isLoading)
    const nextPageUrl = useSelector((state: RootState) => state.pokemon.nextPageUrl)
    
    useEffect(() => {
        dispatch(fetchPokemon())
    }, [])
    
    const loadMore = () => {
        if (nextPageUrl) {
            dispatch(fetchMorePokemon(nextPageUrl))
        }
    }
    
    const showMoreBtn = nextPageUrl && !isLoading
    
    return (
        <div>
            <h1 className={cls.title}>Pokedox</h1>
            
            <div className={cls.list}>
                {pokemon.map(p => (
                    <Card
                        key={p.name}
                        name={p.name}
                    />
                ))}
            </div>
            
            {isLoading && <div className={cls.loader}>Loading...</div>}
            
            {showMoreBtn && (
                <button
                    onClick={loadMore}
                    className={cls.button}
                >
                    Load More
                </button>
            )}
        </div>
    )
}
