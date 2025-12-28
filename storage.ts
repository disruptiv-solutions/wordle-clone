export type User = 'Ariel' | 'Ian'

export type GameResult = {
    user: User
    word: string
    guesses: number
    timeSeconds: number
    timestamp: number
    status: 'won' | 'lost'
}

const STORAGE_KEY = 'wordle_clone_data_v1'

export const getHistory = (): GameResult[] => {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
}

export const saveGame = (result: GameResult) => {
    const history = getHistory()
    history.push(result)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
}

export const getStats = () => {
    const history = getHistory()

    const arielsGames = history.filter(g => g.user === 'Ariel' && g.status === 'won')
    const iansGames = history.filter(g => g.user === 'Ian' && g.status === 'won')

    const combinedGames = arielsGames.length + iansGames.length

    const totalTimeAriel = arielsGames.reduce((acc, curr) => acc + curr.timeSeconds, 0)
    const totalTimeIan = iansGames.reduce((acc, curr) => acc + curr.timeSeconds, 0)
    const combinedTime = totalTimeAriel + totalTimeIan

    return {
        ariel: { count: arielsGames.length, time: totalTimeAriel },
        ian: { count: iansGames.length, time: totalTimeIan },
        combined: { count: combinedGames, time: combinedTime },
        history
    }
}
