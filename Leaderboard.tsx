import React, { useEffect, useState } from 'react'
import { getStats, type GameResult } from '@/lib/storage'

export default function Leaderboard() {
    const [stats, setStats] = useState<ReturnType<typeof getStats> | null>(null)

    useEffect(() => {
        setStats(getStats())
    }, [])

    if (!stats) return null

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}m ${secs}s`
    }

    return (
        <div className="bg-[#1a1a1b] p-6 rounded-lg border border-[#3a3a3c] w-full max-w-md mx-auto mt-4">
            <h3 className="text-xl font-bold text-white mb-4 text-center border-b border-[#3a3a3c] pb-2">Team Stats</h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-[#121213] rounded cursor-default hover:bg-[#202022] transition-colors">
                    <p className="text-gray-400 text-sm uppercase tracking-wider">Combined Puzzles</p>
                    <p className="text-3xl font-bold text-[#538d4e]">{stats.combined.count}</p>
                </div>
                <div className="text-center p-4 bg-[#121213] rounded cursor-default hover:bg-[#202022] transition-colors">
                    <p className="text-gray-400 text-sm uppercase tracking-wider">Combined Time</p>
                    <p className="text-2xl font-bold text-[#b59f3b]">{formatTime(stats.combined.time)}</p>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center bg-[#121213] p-3 rounded">
                    <span className="text-blue-400 font-bold">Ariel</span>
                    <div className="text-right">
                        <span className="text-white block">{stats.ariel.count} wins</span>
                        <span className="text-gray-500 text-sm block">{formatTime(stats.ariel.time)} total</span>
                    </div>
                </div>
                <div className="flex justify-between items-center bg-[#121213] p-3 rounded">
                    <span className="text-purple-400 font-bold">Ian</span>
                    <div className="text-right">
                        <span className="text-white block">{stats.ian.count} wins</span>
                        <span className="text-gray-500 text-sm block">{formatTime(stats.ian.time)} total</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
