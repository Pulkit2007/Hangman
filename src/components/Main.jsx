import { languages } from "./languages"
import { useState } from "react"
import { clsx } from "clsx"


export default function Main() {
// all the states here

    const [currentWord, setcurrentWord] = useState("react")
    const [guessLetters, setGuessLetters] = useState([])
    const arr = currentWord.split("")
    function addGuessedLetter(letter) {
        setGuessLetters(prev => prev.includes(letter) ? prev : [...prev, letter])

    }

// all the derived values here!

const wrongGuessCount = guessLetters.filter(letter=> !currentWord.includes(letter)).length
console.log(wrongGuessCount)

// all the static values
    const alphabets = "abcdefghijklmnopqrstuvwxyz".split("")


    const letters = alphabets.map((key) => {
        const isCorrect = guessLetters.includes(key) && currentWord.includes(key)
        const isWrong = guessLetters.includes(key) && !currentWord.includes(key)

        return (
            <button
                className={clsx(
                    "alphabet",
                    isCorrect && "correct",
                    isWrong && "wrong"
                )}
                onClick={() => addGuessedLetter(key)}
                key={key}
            >
                {key.toUpperCase()}
            </button>
        )
    })


    const boxes = arr.map((letter, index) => {
        return (
            <span className="dashes" key={`${letter}-${index}`}>
                {guessLetters.includes(letter) ? letter.toUpperCase() : ""}
            </span>
        )
    })

    const chips = languages.map(chip =>
        <div
            className="chips"
            key={chip.name}
            style={{
                backgroundColor: chip.backgroundColor,
                color: chip.color
            }}
        >
            {chip.name}
        </div>
    )

    return (
        <main className="game">
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word in under 8 attempts to
                    keep the programming world safe from Assembly
                </p>
            </header>

            <div className="status">
                <p>Game Over!</p>
                <p>You Lose! Better start learning assembly</p>
            </div>

            <div className="chips-container">
                {chips}
            </div>

            <div className="boxes-container">
                {boxes}
            </div>

            <div className="keyboard">
                {letters}
            </div>
        </main>


    )

}