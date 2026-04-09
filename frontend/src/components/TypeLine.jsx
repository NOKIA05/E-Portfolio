import { useState, useEffect } from 'react'

// Reusable typewriter component used on every page title and content block.
// Props:
//   text  — the string to type out
//   speed — milliseconds per character (default 70, higher = slower)
//   onDone — callback fired when typing finishes (used to reveal content after title types)
function TypeLine({ text = '', speed = 70, onDone }) {
    const [displayed, setDisplayed] = useState('')

    useEffect(() => {
        setDisplayed('')
        if (!text) {
            onDone?.()
            return
        }
        let i = 0
        // Adds one character every `speed` ms until the full text is shown
        const interval = setInterval(() => {
            i++
            setDisplayed(text.slice(0, i))
            if (i >= text.length) {
                clearInterval(interval)
                onDone?.() // Tell the parent that typing is done
            }
        }, speed)
        return () => clearInterval(interval) // Cleanup on unmount
    }, [text])

    return <span>{displayed}</span>
}

export default TypeLine
