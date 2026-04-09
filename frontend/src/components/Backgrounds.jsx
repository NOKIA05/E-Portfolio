import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

// Large glass bubbles
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
    { id: 13, size: 55,  x: '70%', y: '40%', duration: 11, delay: 0.7 },
    { id: 14, size: 85,  x: '35%', y: '55%', duration: 9,  delay: 0.3 },
    { id: 15, size: 45,  x: '15%', y: '45%', duration: 7,  delay: 0.5 },
    { id: 16, size: 95,  x: '55%', y: '25%', duration: 10, delay: 0.2 },
    { id: 17, size: 60,  x: '78%', y: '60%', duration: 8,  delay: 0.4 },
    { id: 18, size: 110, x: '40%', y: '75%', duration: 12, delay: 0.1 },
    { id: 19, size: 50,  x: '10%', y: '90%', duration: 9,  delay: 0.6 },
    { id: 20, size: 70,  x: '65%', y: '15%', duration: 7,  delay: 0.3 },
    { id: 21, size: 40,  x: '30%', y: '30%', duration: 11, delay: 0.5 },
    { id: 22, size: 85,  x: '80%', y: '20%', duration: 9,  delay: 0.2 },
    { id: 23, size: 55,  x: '50%', y: '50%', duration: 8,  delay: 0.7 },
    { id: 24, size: 65,  x: '18%', y: '65%', duration: 10, delay: 0.4 },
    { id: 25, size: 75,  x: '72%', y: '88%', duration: 7,  delay: 0.1 },
]

// Small white particles
const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    size: Math.random() * 5 + 2,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 3,
}))

const randomHoverColor = () => Math.random() > 0.5
    ? 'rgba(220, 38, 38, 0.8)'
    : 'rgba(255, 215, 0, 0.8)'

function Bubble({ bubble }) {
    const [hovered, setHovered] = useState(false)
    const [hoverColor, setHoverColor] = useState('rgba(220,38,38,0.7)')

    const rand = (min, max) => Math.random() * (max - min) + min
    const { yPath, xPath } = useMemo(() => ({
        yPath: [0, rand(-60, -30), rand(20, 50), rand(-50, -20), rand(30, 60), 0],
        xPath: [0, rand(30, 80), rand(-80, -30), rand(50, 100), rand(-70, -20), 0],
    }), [])

    return (
        <motion.div
            animate={{
                scale: [0, 1.1, 1, 1, 1, 0.9, 0],
                opacity: [0, 1, 1, 1, 1, 0.6, 0],
                y: yPath,
                x: xPath,
            }}
            transition={{
                scale: { duration: bubble.duration * 2, repeat: Infinity, delay: bubble.delay, ease: 'easeInOut' },
                opacity: { duration: bubble.duration * 2, repeat: Infinity, delay: bubble.delay, ease: 'easeInOut' },
                y: { duration: bubble.duration * 3, repeat: Infinity, ease: 'easeInOut' },
                x: { duration: bubble.duration * 3.5, repeat: Infinity, ease: 'easeInOut' },
            }}
            initial={{ opacity: 0, scale: 0 }}
            onMouseEnter={() => { setHoverColor(randomHoverColor()); setHovered(true) }}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: 'absolute',
                left: bubble.x,
                top: bubble.y,
                width: bubble.size,
                height: bubble.size,
                borderRadius: '50%',
                // Glass look — visible white tint with strong border
                background: hovered
                    ? hoverColor
                    : 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                border: hovered
                    ? `2px solid ${hoverColor}`
                    : '2px solid rgba(255,255,255,0.35)',
                boxShadow: hovered
                    ? `0 0 30px ${hoverColor}, inset 0 0 20px rgba(255,255,255,0.15)`
                    : '0 0 16px rgba(255,255,255,0.15), inset 0 0 16px rgba(255,255,255,0.1)',
                transition: 'background 0.3s ease, box-shadow 0.3s ease, border 0.3s ease',
                pointerEvents: 'none',
            }}
        />
    )
}

function Particle({ particle }) {
    const [hovered, setHovered] = useState(false)

    const rand = (min, max) => Math.random() * (max - min) + min
    const { yPath, xPath } = useMemo(() => ({
        yPath: [0, rand(-40, -15), rand(10, 30), rand(-30, -10), rand(15, 40), 0],
        xPath: [0, rand(15, 50), rand(-50, -15), rand(30, 60), rand(-40, -10), 0],
    }), [])

    return (
        <motion.div
            animate={{
                opacity: [0, 1, 1, 1, 1, 0.4, 0],
                scale: [0, 1, 1, 1, 1, 0.8, 0],
                y: yPath,
                x: xPath,
            }}
            transition={{
                opacity: { duration: particle.duration * 2, repeat: Infinity, delay: particle.delay, ease: 'easeInOut' },
                scale: { duration: particle.duration * 2, repeat: Infinity, delay: particle.delay, ease: 'easeInOut' },
                y: { duration: particle.duration * 2.5, repeat: Infinity, ease: 'easeInOut' },
                x: { duration: particle.duration * 3, repeat: Infinity, ease: 'easeInOut' },
            }}
            initial={{ opacity: 0, scale: 0 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: 'absolute',
                left: particle.x,
                top: particle.y,
                width: particle.size,
                height: particle.size,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.9)',
                boxShadow: hovered
                    ? '0 0 16px rgba(255,255,255,1), 0 0 32px rgba(255,255,255,0.8)'
                    : '0 0 8px rgba(255,255,255,0.7), 0 0 16px rgba(255,255,255,0.3)',
                transition: 'box-shadow 0.2s ease',
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
            perspective: '800px',
            zIndex: 0,
        }}>
            {bubbles.map(bubble => (
                <Bubble key={bubble.id} bubble={bubble} />
            ))}
            {particles.map(particle => (
                <Particle key={particle.id} particle={particle} />
            ))}
        </div>
    )
}
