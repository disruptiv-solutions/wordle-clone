import React, { useEffect } from 'react'
import { FormattedGuess } from '@/hooks/useWordle'

type Props = {
    usedKeys: { [key: string]: string }
    onKey: (key: string) => void
}

export default function Keyboard({ usedKeys, onKey }: Props) {
    const letters = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace']
    ]

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                onKey('Enter')
            } else if (e.key === 'Backspace') {
                onKey('Backspace')
            } else {
                const key = e.key.toLowerCase()
                if (key.length === 1 && /^[a-z]$/.test(key)) {
                    onKey(key)
                }
            }
        }
        window.addEventListener('keyup', listener)
        return () => window.removeEventListener('keyup', listener)
    }, [onKey])

    return (
        <div className="w-full max-w-[500px] mx-auto px-2">
            {letters.map((row, i) => (
                <div key={i} className="flex justify-center mb-2 gap-1.5">
                    {row.map((l) => {
                        const color = usedKeys[l]

                        let bg = 'bg-[#818384]'
                        if (color === 'correct') bg = 'bg-[#538d4e]'
                        if (color === 'present') bg = 'bg-[#b59f3b]'
                        if (color === 'absent') bg = 'bg-[#3a3a3c]'

                        const isBig = l === 'Enter' || l === 'Backspace'
                        const displayLabel = l === 'Backspace' ? 'Del' : l

                        return (
                            <button
                                key={l}
                                onClick={() => onKey(l)}
                                className={`
                  ${isBig ? 'px-3 sm:px-4 text-xs sm:text-sm' : 'flex-1 px-1 sm:px-2 text-lg sm:text-xl'} 
                  h-14 
                  flex items-center justify-center 
                  rounded 
                  font-bold 
                  cursor-pointer 
                  uppercase 
                  text-white
                  select-none
                  ${bg}
                  transition-colors
                  border-0
                `}
                            >
                                {displayLabel}
                            </button>
                        )
                    })}
                </div>
            ))}
        </div>
    )
}
