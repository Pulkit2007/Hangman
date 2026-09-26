import { useState } from "react"
import { clsx } from "clsx"
import { languages } from "./languages"
import { getFarewellText } from "./utils"

export default function AssemblyEndgame() {
    const [currentWord, setCurrentWord] = useState("react")
    const [guessedLetters, setGuessedLetters] = useState([])

    const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
    const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
    const isGameLost = wrongGuessCount >= languages.length - 1
    const isGameOver = isGameWon || isGameLost
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)
    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    function addGuessedLetter(letter) {
        setGuessedLetters(prevLetters =>
            prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
        )
    }

    function startNewGame() {
        setCurrentWord("react")
        setGuessedLetters([])
    }

    const languageElements = languages.map((lang, index) => {
        const isLanguageLost = index < wrongGuessCount
        return (
            <span
                className={clsx("chip", isLanguageLost && "lost")}
                style={{ backgroundColor: lang.backgroundColor, color: lang.color }}
                key={lang.name}
            >
                {lang.name}
            </span>
        )
    })

    const letterElements = currentWord.split("").map((letter, index) => (
        <span key={index}>
            {guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
        </span>
    ))

    const keyboardElements = alphabet.split("").map(letter => {
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)
        return (
            <button
                className={clsx({ correct: isCorrect, wrong: isWrong })}
                key={letter}
                disabled={isGameOver}
                onClick={() => addGuessedLetter(letter)}
            >
                {letter.toUpperCase()}
            </button>
        )
    })

    const gameStatusClass = clsx("game-status", {
        won: isGameWon,
        lost: isGameLost,
        farewell: !isGameOver && isLastGuessIncorrect
    })

    function renderGameStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
            return <p className="farewell-message">{getFarewellText(languages[wrongGuessCount - 1].name)}</p>
        }
        if (isGameWon) {
            return <><h2>You win!</h2><p>Well done! 🎉</p></>
        }
        if (isGameLost) {
            return <><h2>Game over!</h2><p>You lose! Better start learning Assembly 😭</p></>
        }
        return null
    }

    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
            </header>

            <section className={gameStatusClass}>{renderGameStatus()}</section>
            <section className="language-chips">{languageElements}</section>
            <section className="word">{letterElements}</section>
            <section className="keyboard">{keyboardElements}</section>
            {isGameOver && <button className="new-game" onClick={startNewGame}>New Game</button>}
        </main>
    )
}