import { useMemo } from 'react'
import { motion } from 'framer-motion'

// 10 bubbles spread across the bottom of the screen, each rising at different speeds
// x positions are spread evenly so they cover the full width
const bubbles = [
    { id: 1,  size: 120, x: '2%',   duration: 8,  delay: 0   },
    { id: 2,  size: 90,  x: '13%',  duration: 11, delay: 1.5 },
    { id: 3,  size: 150, x: '24%',  duration: 9,  delay: 0.5 },
    { id: 4,  size: 100, x: '36%',  duration: 13, delay: 2   },
    { id: 5,  size: 130, x: '47%',  duration: 10, delay: 0.8 },
    { id: 6,  size: 80,  x: '58%',  duration: 12, delay: 1.2 },
    { id: 7,  size: 140, x: '68%',  duration: 8,  delay: 0.3 },
    { id: 8,  size: 110, x: '78%',  duration: 11, delay: 1.8 },
    { id: 9,  size: 95,  x: '87%',  duration: 9,  delay: 0.6 },
    { id: 10, size: 125, x: '93%',  duration: 13, delay: 2.5 },
]

function Bubble({ bubble }) {
    // Random horizontal drift so each bubble sways slightly as it rises
    const drift = useMemo(() => (Math.random() - 0.5) * 60, [])

    return (
        <motion.div
            initial={{ y: '110vh', opacity: 0, x: 0 }}
            animate={{
                y: [' 110vh', '60vh', '30vh', '-20vh'],
                opacity: [0, 0.7, 0.7, 0],
                x: [0, drift, drift * -0.5, drift * 0.3],
            }}
            transition={{
                duration: bubble.duration,
                delay: bubble.delay,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: Math.random() * 2,
            }}
            style={{
                position: 'absolute',
                left: bubble.x,
                bottom: 0,
                width: bubble.size,
                height: bubble.size,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                border: '2px solid rgba(255,255,255,0.25)',
                boxShadow: '0 0 20px rgba(255,255,255,0.1), inset 0 0 20px rgba(255,255,255,0.08)',
                pointerEvents: 'none',
            }}
        />
    )
}

export default function Background() {
    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 0,
        }}>
            {bubbles.map(bubble => (
                <Bubble key={bubble.id} bubble={bubble} />
            ))}
        </div>
    )
}
