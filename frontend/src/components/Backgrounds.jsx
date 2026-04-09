import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

// Each bubble: size (px), x/y position (% from top-left), duration (base speed), delay
// To add more bubbles: add a new object to this array
const bubbles = [
    { id: 1,  size: 80,  x: '5%',  y: '10%', duration: 8,  delay: 0   },
    { id: 2,  size: 50,  x: '90%', y: '5%',  duration: 6,  delay: 0.2 },
    { id: 3,  size: 100, x: '2%',  y: '60%', duration: 10, delay: 0.4 },
    { id: 4,  size: 60,  x: '92%', y: '55%', duration: 7,  delay: 0.1 },
    { id: 5,  size: 120, x: '85%', y: '80%', duration: 9,  delay: 0.3 },
    { id: 6,  size: 70,  x: '45%', y: '5%',  duration: 11, delay: 0.5 },
    { id: 7,  size: 55,  x: '48%', y: '85%', duration: 8,  delay: 0.4 },
    { id: 8,  size: 90,  x: '25%', y: '2%',  duration: 12, delay: 0.2 },
    { id: 9,  size: 40,  x: '88%', y: '35%', duration: 7,  delay: 0.3 },
    { id: 10, size: 65,  x: '3%',  y: '35%', duration: 9,  delay: 0.1 },
    { id: 11, size: 45,  x: '60%', y: '70%', duration: 10, delay: 0.6 },
    { id: 12, size: 75,  x: '20%', y: '80%', duration: 8,  delay: 0.2 },
]

// Random hover color — either red or gold
const randomHoverColor = () => Math.random() > 0.5
    ? 'rgba(220, 38, 38, 0.6)'
    : 'rgba(255, 215, 0, 0.6)'

function Bubble({ bubble }) {
    const [hovered, setHovered] = useState(false)
    const [hoverColor, setHoverColor] = useState('rgba(220,38,38,0.6)')

    function handleMouseEnter() {
        setHoverColor(randomHoverColor())
        setHovered(true)
    }

    // Random float paths — stable per bubble mount
    const rand = (min, max) => Math.random() * (max - min) + min
    const { yPath, xPath } = useMemo(() => ({
        yPath: [0, rand(-60, -30), rand(20, 50), rand(-50, -20), rand(30, 60), 0],
        xPath: [0, rand(30, 80), rand(-80, -30), rand(50, 100), rand(-70, -20), 0],
    }), [])

    const animate = {
        scale: [0, 1.1, 1, 1, 1, 0.9, 0],
        opacity: [0, 1, 1, 1, 1, 0.5, 0],
        y: yPath,
        x: xPath,
    }

    const transition = {
        scale: { duration: bubble.duration * 2, repeat: Infinity, delay: bubble.delay, ease: 'easeInOut' },
        opacity: { duration: bubble.duration * 2, repeat: Infinity, delay: bubble.delay, ease: 'easeInOut' },
        y: { duration: bubble.duration * 3, repeat: Infinity, ease: 'easeInOut' },
        x: { duration: bubble.duration * 3.5, repeat: Infinity, ease: 'easeInOut' },
    }

    return (
        <motion.div
            animate={animate}
            transition={transition}
            initial={{ opacity: 0, scale: 0 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: 'absolute',
                left: bubble.x,
                top: bubble.y,
                width: bubble.size,
                height: bubble.size,
                borderRadius: '50%',
                // Glass effect: transparent background with blur and a subtle border
                background: hovered
                    ? hoverColor
                    : 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: hovered
                    ? `1.5px solid ${hoverColor}`
                    : '1.5px solid rgba(255, 255, 255, 0.2)',
                boxShadow: hovered
                    ? `0 0 24px ${hoverColor}, inset 0 0 16px rgba(255,255,255,0.1)`
                    : '0 0 12px rgba(255,255,255,0.08), inset 0 0 12px rgba(255,255,255,0.05)',
                transition: 'background 0.3s ease, box-shadow 0.3s ease, border 0.3s ease',
                pointerEvents: 'auto',
                cursor: 'default',
            }}
        />
    )
}

// Background component — drop <Background /> at the top of any page to get the floating bubbles.
// perspective: 800px keeps the depth effect on motion elements
export default function Background() {
    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            perspective: '800px',
        }}>
            {/* pointerEvents auto on each bubble so hover works, none on the container so clicks pass through */}
            {bubbles.map(bubble => (
                <Bubble key={bubble.id} bubble={bubble} />
            ))}
        </div>
    )
}
