import React from 'react'
import type { User } from '@/lib/storage'

type Props = {
    onLogin: (user: User) => void
}

export default function Login({ onLogin }: Props) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-8">
            <h2 className="text-2xl font-bold text-white mb-4">Who is playing?</h2>
            <div className="flex gap-4">
                <button
                    onClick={() => onLogin('Ariel')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105"
                >
                    Ariel
                </button>
                <button
                    onClick={() => onLogin('Ian')}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105"
                >
                    Ian
                </button>
            </div>
        </div>
    )
}
