interface DieProps {
    value: number
    isHeld: boolean
    hold: () => void
}

export default function Die(props: DieProps) {
    return (
        <button
            className={`h-[50px] w-[50px] shadow-sm rounded-[10px] border-none text-[1.75rem] font-bold font-karla cursor-pointer ${
                props.isHeld ? "bg-held-green" : "bg-white"
            }`}
            onClick={props.hold}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}
        >{props.value}</button>
    )
}