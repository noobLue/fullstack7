import { useState } from "react";

export const useField = (type, name) => {
    const [input, setInput] = useState('')

    const onChange = (e) => {
        setInput(e.target.value)
    }

    const reset = () => {
        setInput('')
    }

    return { type, name, value: input, onChange, reset }
}