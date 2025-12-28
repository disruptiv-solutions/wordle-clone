import { useState } from 'react'
import { getRandomWord } from '@/lib/words'

export type FormattedGuess = {
    key: string
    color: 'correct' | 'present' | 'absent' | 'default'
}

type TurnState = {
    turn: number
    currentGuess: string
    guesses: (FormattedGuess[] | null)[] // 6 rows
    history: string[] // strings
    isCorrect: boolean
    usedKeys: { [key: string]: string }
    solution: string
}

const useWordle = () => {
    const [solution, setSolution] = useState<string>('')
    const [turn, setTurn] = useState<number>(0)
    const [currentGuess, setCurrentGuess] = useState<string>('')
    const [guesses, setGuesses] = useState<(FormattedGuess[] | null)[]>([...Array(6)])
    const [history, setHistory] = useState<string[]>([])
    const [isCorrect, setIsCorrect] = useState<boolean>(false)
    const [usedKeys, setUsedKeys] = useState<{ [key: string]: string }>({})

    // Format a guess into an array of objects
    const formatGuess = () => {
        const solutionArray: (string | null)[] = [...solution]
        const formattedGuess: FormattedGuess[] = [...currentGuess].map((l) => {
            return { key: l, color: 'absent' }
        })

        // Find any green letters
        formattedGuess.forEach((l, i) => {
            if (solutionArray[i] === l.key) {
                formattedGuess[i].color = 'correct'
                solutionArray[i] = null
            }
        })

        // Find any yellow letters
        formattedGuess.forEach((l, i) => {
            if (l.color !== 'correct' && solutionArray.includes(l.key)) {
                formattedGuess[i].color = 'present'
                solutionArray[solutionArray.indexOf(l.key)] = null
            }
        })

        return formattedGuess
    }

    // Add a new guess to the state
    const addNewGuess = (formatted: FormattedGuess[]) => {
        if (currentGuess === solution) {
            setIsCorrect(true)
        }

        setGuesses((prevGuesses) => {
            const newGuesses = [...prevGuesses]
            newGuesses[turn] = formatted
            return newGuesses
        })

        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })

        setTurn((prevTurn) => {
            return prevTurn + 1
        })

        setUsedKeys((prevUsedKeys) => {
            const newKeys = { ...prevUsedKeys }

            formatted.forEach((l) => {
                const currentColor = newKeys[l.key]

                if (l.color === 'correct') {
                    newKeys[l.key] = 'correct'
                    return
                }
                if (l.color === 'present' && currentColor !== 'correct') {
                    newKeys[l.key] = 'present'
                    return
                }
                if (l.color === 'absent' && currentColor !== 'correct' && currentColor !== 'present') {
                    newKeys[l.key] = 'absent'
                    return
                }
            })

            return newKeys
        })

        setCurrentGuess('')
    }

    // Handle keyup event
    const handleKeyup = ({ key, enabled = true }: { key: string; enabled?: boolean }) => {
        if (!enabled) return

        if (key === 'Enter') {
            // Validation
            if (turn > 5) {
                console.log('used all guesses')
                return
            }
            if (history.includes(currentGuess)) {
                console.log('already tried that word')
                return
            }
            if (currentGuess.length !== 5) {
                console.log('word must be 5 chars long')
                return
            }

            const formatted = formatGuess()
            addNewGuess(formatted)
        }

        if (key === 'Backspace') {
            setCurrentGuess((prev) => prev.slice(0, -1))
            return
        }

        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => prev + key.toLowerCase())
            }
        }
    }

    return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup, solution, setSolution }
}

export default useWordle
