import React from 'react'
import type { FormattedGuess } from '@/hooks/useWordle'

type Props = {
    guess?: FormattedGuess[]
    currentGuess?: string
}

export default function Row({ guess, currentGuess }: Props) {
    if (guess) {
        return (
            <div className="grid grid-cols-5 gap-1.5 mb-1.5 justify-center">
                {guess.map((l, i) => (
                    <div
                        key={i}
                        className={`
              block w-14 h-14 border-2 flex items-center justify-center text-3xl font-bold uppercase select-none
              ${l.color === 'correct' ? 'bg-[#538d4e] border-[#538d4e]' : ''}
              ${l.color === 'present' ? 'bg-[#b59f3b] border-[#b59f3b]' : ''}
              ${l.color === 'absent' ? 'bg-[#3a3a3c] border-[#3a3a3c]' : ''}
              text-white
              animate-flip
            `}
                        style={{ animationDelay: `${i * 0.2}s` }}
                    >
                        {l.key}
                    </div>
                ))}
            </div>
        )
    }

    if (currentGuess !== undefined) {
        const letters = currentGuess.split('')

        return (
            <div className="grid grid-cols-5 gap-1.5 mb-1.5 justify-center">
                {letters.map((letter, i) => (
                    <div key={i} className="block w-14 h-14 border-2 border-gray-500 flex items-center justify-center text-3xl font-bold uppercase text-white animate-pop">
                        {letter}
                    </div>
                ))}
                {[...Array(5 - letters.length)].map((_, i) => (
                    <div key={i} className="block w-14 h-14 border-2 border-[#3a3a3c] flex items-center justify-center"></div>
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-5 gap-1.5 mb-1.5 justify-center">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="block w-14 h-14 border-2 border-[#3a3a3c] flex items-center justify-center"></div>
            ))}
        </div>
    )
}
