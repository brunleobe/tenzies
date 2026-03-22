import { useState, useRef, useEffect } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

interface DieObject {
    id: string
    value: number
    isHeld: boolean
}

export default function App() {
    const [dice, setDice] = useState<DieObject[]>(() => generateAllNewDice())
    const buttonRef = useRef<HTMLButtonElement>(null)

    const gameWon = dice.every(die => die.isHeld) &&
        dice.every(die => die.value === dice[0].value)

    useEffect(() => {
        if (gameWon) {
            buttonRef.current?.focus()
        }
    }, [gameWon])

    function generateAllNewDice(): DieObject[] {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }))
    }

    function rollDice(): void {
        if (!gameWon) {
            setDice(oldDice => oldDice.map(die =>
                die.isHeld ?
                    die :
                    { ...die, value: Math.ceil(Math.random() * 6) }
            ))
        } else {
            setDice(generateAllNewDice())
        }
    }

    function hold(id: string): void {
        setDice(oldDice => oldDice.map(die =>
            die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        ))
    }

    const diceElements = dice.map(dieObj => (
        <Die
            key={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            hold={() => hold(dieObj.id)}
        />
    ))

    return (
        <main className="bg-white rounded-2xl shadow-[0_18px_30px_rgba(0,0,0,0.2)] w-full max-w-[420px] p-10 flex flex-col justify-evenly items-center">
            {gameWon && <Confetti />}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
            <h1 className="text-[40px] m-0 font-karla">Tenzies</h1>
            <p className="font-inter font-normal mt-2 text-center text-slate-600">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="grid grid-rows-2 grid-cols-5 gap-5 my-10">
                {diceElements}
            </div>
            <button
                ref={buttonRef}
                className="h-[50px] whitespace-nowrap w-auto px-[24px] py-[8px] border-none rounded-[12px] bg-roll-purple text-white text-[1.1rem] font-karla cursor-pointer shadow-[0_8px_20px_rgba(80,53,255,0.35)] transition hover:shadow-[0_12px_28px_rgba(80,53,255,0.35)] active:scale-[0.98]"
                onClick={rollDice}
            >
                {gameWon ? "New Game" : "Roll"}
            </button>
        </main>
    )
}