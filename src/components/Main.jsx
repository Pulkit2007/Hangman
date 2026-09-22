import { languages } from "./languages"
import { useState } from "react"


export default function Main() {

    const [currentWord] = useState("react")
    const arr = currentWord.split("")

    const alphabets = "abcdefghijklmnopqrstuvwxyz".split("")

    const keys = alphabets.map((key) => (
        <span className="alphabet" key={key}>
            {key}
        </span>
    ))


    const boxes = arr.map((letter, index) => (
        <span className="dashes" key={`${letter}-${index}`}>
            {letter.toUpperCase()}
        </span>
    ))

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
                {keys}
            </div>
        </main>


    )

}