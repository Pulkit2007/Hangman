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

    const wrongGuessCount = guessLetters.filter(letter => !currentWord.includes(letter)).length
    console.log(wrongGuessCount)

    const isGameWon = currentWord.split('').every(letter => guessLetters.includes(letter))
    const isGameLost = wrongGuessCount >= languages.length - 1
    const isGameOver = isGameWon || isGameLost


    // all the static valuesa
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

    const chips = languages.map((chip, index) => {
        const isLanguagelost = index < wrongGuessCount
        return <div
            className={clsx("chips", isLanguagelost && "chips-lost")}
            key={chip.name}
            style={{
                backgroundColor: chip.backgroundColor,
                color: chip.color
            }}
        >
            {chip.name}
        </div>
    })

    const classname = clsx("status",
        {
            won: isGameWon,
            lost: isGameLost

        }
    )

    return (
        <main className="game">
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word in under 8 attempts to
                    keep the programming world safe from Assembly
                </p>
            </header>



            <section >
                <div className={classname}>
                    {isGameOver ? (
                        isGameWon ? (
                            <>
                                <p>Game Won</p>
                                <p>Well Done!</p>
                            </>

                        ) : (<> <p>You Lose!</p>
                            <p>Better learn Assembly Now!</p>

                        </>)

                    ) : null}

                </div>
            </section>


            <div className="chips-container">
                {chips}
            </div>

            <div className="boxes-container">
                {boxes}
            </div>

            <div className="keyboard">
                {letters}
            </div>
            {isGameOver && <div className="new-game">
                <button className="new-game-btn">New Game</button>
            </div>}
        </main>


    )

}