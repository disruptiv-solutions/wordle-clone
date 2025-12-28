import React from 'react'
import Row from './Row'
import type { FormattedGuess } from '@/hooks/useWordle'

type Props = {
    currentGuess: string
    guesses: (FormattedGuess[] | null)[]
    turn: number
}

export default function Grid({ currentGuess, guesses, turn }: Props) {
    return (
        <div className="pb-6">
            {guesses.map((g, i) => {
                if (turn === i) {
                    return <Row key={i} currentGuess={currentGuess} />
                }
                return <Row key={i} guess={g || undefined} />
            })}
        </div>
    )
}
