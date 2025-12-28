# Wordle Clone

A fully functional, offline-capable Wordle clone built with Next.js, Tailwind CSS, and TypeScript.

## Features

- **Offline Play**: All game logic and word lists are bundled locally. No internet connection required after loading.
- **Classic Gameplay**: Standard Wordle rules (6 guesses, 5-letter words).
- **Responsive Design**: Works on desktop and mobile.
- **Animations**: Smooth flip and pop animations for a premium feel.
- **Dark Mode**: Sleek dark interface by default.

## Getting Started

1.  Navigate to the project directory:
    ```bash
    cd wordle-clone
    ```

2.  Install dependencies (if not already installed):
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript

## How to Play

- Guess the hidden 5-letter word in 6 tries.
- The color of the tiles will change to show how close your guess was to the word.
    - **Green**: Letter is in the word and in the correct spot.
    - **Yellow**: Letter is in the word but in the wrong spot.
    - **Gray**: Letter is not in the word in any spot.
