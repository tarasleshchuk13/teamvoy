import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDetailedPokemonByName } from '../../store/pokemonDetailed/pokemonDetailedSlice.ts'
import { AppDispatch, RootState } from '../../store/store.ts'
import { DetailedCard } from '../detailedCard/DetailedCard.tsx'
import cls from './Card.module.scss'

interface CardProps {
    name: string
}

export const Card = ({ name }: CardProps) => {
    const [showDetailedCard, setShowDetailedCard] = useState(false)
    
    const dispatch = useDispatch<AppDispatch>()
    const pokemonDetailed = useSelector((state: RootState) => state.pokemonDetailed.pokemon)[name]
    
    useEffect(() => {
        dispatch(fetchDetailedPokemonByName(name))
    }, [])
    
    const openDetailedCard = () => {
        setShowDetailedCard(true)
    }
    
    const closeDetailedCard = () => {
        setShowDetailedCard(false)
    }
    
    if (!pokemonDetailed) {
        return null
    }
    
    return (
        <>
            <div
                onClick={openDetailedCard}
                className={cls.card}
            >
                {pokemonDetailed.isLoading ? (
                    <div className={cls.imgPlaceholder}/>
                ) : (
                    <img src={pokemonDetailed.pokemon?.photo} alt="pokemon" className={cls.img}/>
                )}
                
                <h2 className={cls.name}>{name}</h2>
                
                {pokemonDetailed.isLoading ? (
                    <div className={cls.typePlaceholder}/>
                ) : (
                    <div className={cls.typesList}>
                        {pokemonDetailed.pokemon?.types.map((type, index) => (
                            <div
                                key={index}
                                className={cls.type}
                            >
                                {type}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {showDetailedCard && (
                <DetailedCard
                    name={name}
                    onClose={closeDetailedCard}
                />
            )}
        </>
    )
}
