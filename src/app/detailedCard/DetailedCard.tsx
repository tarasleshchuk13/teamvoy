import { SyntheticEvent } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store.ts'
import cls from './DetailedCard.module.scss'

interface DetailedCardProps {
    name: string
    onClose(): void
}

export const DetailedCard = ({ name, onClose }: DetailedCardProps) => {
    const pokemon = useSelector((state: RootState) => state.pokemonDetailed.pokemon)[name].pokemon
    
    const onCardClick = (event: SyntheticEvent<HTMLDivElement>) => {
        event.stopPropagation()
    }
    
    const id = '#' + pokemon?.id.toString().padStart(4, '0')
    
    return (
        <div
            onClick={onClose}
            className={cls.overlay}
        >
            <div
                onClick={onCardClick}
                className={cls.card}
            >
                <img
                    className={cls.img}
                    src={pokemon?.photo}
                    alt="pokemon"
                />
                <h2 className={cls.name}>{pokemon?.name} {id}</h2>
                
                <ul className={cls.characteristicList}>
                    <li className={cls.characteristic}>
                        <div className={cls.name}>Type</div>
                        <div className={cls.value}>{pokemon?.types.join(', ')}</div>
                    </li>
                    <li className={cls.characteristic}>
                        <div className={cls.name}>Attack</div>
                        <div className={cls.value}>{pokemon?.attack}</div>
                    </li>
                    <li className={cls.characteristic}>
                        <div className={cls.name}>Defense</div>
                        <div className={cls.value}>{pokemon?.defense}</div>
                    </li>
                    <li className={cls.characteristic}>
                        <div className={cls.name}>HP</div>
                        <div className={cls.value}>{pokemon?.hp}</div>
                    </li>
                    <li className={cls.characteristic}>
                        <div className={cls.name}>SP Attack</div>
                        <div className={cls.value}>{pokemon?.specialAttack}</div>
                    </li>
                    <li className={cls.characteristic}>
                        <div className={cls.name}>SP Defense</div>
                        <div className={cls.value}>{pokemon?.specialDefense}</div>
                    </li>
                    <li className={cls.characteristic}>
                        <div className={cls.name}>Speed</div>
                        <div className={cls.value}>{pokemon?.speed}</div>
                    </li>
                    <li className={cls.characteristic}>
                        <div className={cls.name}>Weight</div>
                        <div className={cls.value}>{pokemon?.weight}</div>
                    </li>
                    <li className={cls.characteristic}>
                        <div className={cls.name}>Total moves</div>
                        <div className={cls.value}>{pokemon?.movesCount}</div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
