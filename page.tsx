'use client'

import { useEffect, useState, useRef } from 'react'
import useWordle from '@/hooks/useWordle'
import Grid from '@/components/Grid'
import Keyboard from '@/components/Keyboard'
import Login from '@/components/Login'
import Leaderboard from '@/components/Leaderboard'
import { getRandomWord } from '@/lib/words'
import { saveGame, User } from '@/lib/storage'

export default function Home() {
  const { currentGuess, guesses, turn, isCorrect, usedKeys, handleKeyup, solution, setSolution } = useWordle()
  const [showModal, setShowModal] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timer, setTimer] = useState(0)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const random = getRandomWord()
    setSolution(random)
  }, [setSolution])

  useEffect(() => {
    if (isPlaying && !showModal) {
      timerRef.current = setInterval(() => {
        setTimer((t) => t + 1)
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, showModal])

  useEffect(() => {
    if (isCorrect) {
      if (user) {
        saveGame({
          user,
          word: solution,
          guesses: turn + 1,
          timeSeconds: timer,
          timestamp: Date.now(),
          status: 'won'
        })
      }
      setIsPlaying(false)
      setTimeout(() => setShowModal(true), 2000)
    }
    if (turn > 5 && !isCorrect) {
      if (user) {
        saveGame({
          user,
          word: solution,
          guesses: 6,
          timeSeconds: timer,
          timestamp: Date.now(),
          status: 'lost'
        })
      }
      setIsPlaying(false)
      setTimeout(() => setShowModal(true), 2000)
    }
  }, [isCorrect, turn, user, timer, solution])

  const handleStart = () => {
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleLogout = () => {
    setUser(null)
    setIsPlaying(false)
    setTimer(0)
    setShowLeaderboard(false)
    window.location.reload()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!user) {
    return <Login onLogin={setUser} />
  }

  if (showLeaderboard) {
    return (
      <div className="min-h-screen bg-[#121213] p-4 text-white">
        <button onClick={() => setShowLeaderboard(false)} className="mb-4 text-blue-400 font-bold hover:underline">
          &larr; Back to Game
        </button>
        <Leaderboard />
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-between h-screen max-w-[600px] mx-auto p-4 bg-[#121213]">
      <header className="border-b border-[#3a3a3c] pb-2 mb-4 flex justify-between items-center">
        <h1 className="text-xl sm:text-3xl font-bold uppercase text-white">Wordle Clone</h1>
        <div className="flex gap-2 items-center">
          <div className="text-white bg-[#3a3a3c] px-3 py-1 rounded font-mono">
            {formatTime(timer)}
          </div>
          <button
            onClick={() => setShowLeaderboard(true)}
            className="text-xs sm:text-sm bg-[#538d4e] text-white px-2 py-1 rounded font-bold uppercase"
          >
            Stats
          </button>
          <button
            onClick={handleLogout}
            className="text-xs sm:text-sm text-gray-400 hover:text-white"
          >
            Logout ({user})
          </button>
        </div>
      </header>

      {/* Controls */}
      <div className="flex justify-center gap-4 mb-2">
        {!isPlaying && turn === 0 && !isCorrect && (
          <button
            onClick={handleStart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded uppercase tracking-wider"
          >
            Start Game
          </button>
        )}
        {isPlaying && (
          <button
            onClick={handlePause}
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded uppercase tracking-wider"
          >
            Pause
          </button>
        )}
        {!isPlaying && turn > 0 && !isCorrect && !showModal && (
          <button
            onClick={handleStart}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded uppercase tracking-wider"
          >
            Resume
          </button>
        )}
      </div>

      <div className="flex-grow flex flex-col items-center justify-center min-h-0 relative">
        <div className={`flex items-center justify-center flex-grow transition-opacity duration-300 ${!isPlaying && turn > 0 && !showModal ? 'opacity-0' : 'opacity-100'}`}>
          {solution && <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />}
        </div>
        {!isPlaying && turn > 0 && !showModal && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold uppercase tracking-widest">
            Paused
          </div>
        )}
        {!isPlaying && turn === 0 && !showModal && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xl text-center px-8">
            Press Start to begin tracking your time!
          </div>
        )}
      </div>

      <div className={`pb-4 sm:pb-8 flex-shrink-0 transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
        <Keyboard usedKeys={usedKeys} onKey={(key) => handleKeyup({ key, enabled: isPlaying })} />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-[#121213] p-8 rounded-lg border border-[#3a3a3c] text-center max-w-sm w-full mx-4 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-white">
              {isCorrect ? 'You Won!' : 'Game Over'}
            </h2>
            <div className="mb-6">
              <p className="text-xl text-gray-300">Time: <span className="font-mono text-white">{formatTime(timer)}</span></p>
              {!isCorrect && (
                <p className="mt-2 text-xl text-gray-300">The word was: <span className="text-[#538d4e] font-bold uppercase">{solution}</span></p>
              )}
            </div>

            <button
              onClick={() => window.location.reload()}
              className="bg-[#538d4e] text-white px-8 py-3 rounded-full font-bold uppercase hover:brightness-110 transition-all text-sm tracking-wider"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
