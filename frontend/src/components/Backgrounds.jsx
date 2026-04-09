import { useMemo } from 'react'
import { motion } from 'framer-motion'

// Each shape: type, size (px), x/y position (% from top-left), duration (base speed), delay (seconds before popping in)
// To add a shape: add a new object here. Types available: 'circle', 'diamond', 'square', 'triangle'
const shapes = [
    {id: 1, type: 'triangle', size: 70, x: '5%', y: '10%', duration: 8, delay: 0},
    {id: 2, type: 'circle', size: 80, x: '90%', y: '5%', duration: 6, delay: 0.2 },
    {id: 3, type: 'diamond', size: 90, x: '2%', y: '60%', duration: 10, delay: 0.4 },
    {id: 4, type: 'circle', size: 60, x: '92%', y: '55%', duration: 7, delay: 0.1 },
    {id: 5, type: 'triangle', size: 120, x: '85%', y: '80%', duration: 9, delay: 0.3 },
    {id: 6, type: 'diamond', size: 75, x: '45%', y: '5%', duration: 11, delay: 0.5 },
    {id: 7, type: 'square', size: 79, x: '48%', y: '85%', duration: 8, delay: 0.4 },
    {id: 8, type: 'circle', size: 103, x: '25%', y: '2%', duration: 12, delay: 0.2},
    {id: 9, type: 'square', size: 29, x: '88%', y: '35%', duration: 7, delay: 0.3},
    {id: 10, type: 'diamond', size: 48, x: '3%', y: '35%', duration: 9, delay: 0.1},
]

function Shape({ shape }) {
    const glowColor = 'rgba(255, 215, 0, 0.8)'
    const glowColorDim = 'rgba(220, 38, 38, 0.5)'

    // Base style: positions the shape absolutely on screen with a gold/red glow
    const shapeStyle = {
        position: 'absolute',
        left: shape.x,
        top: shape.y,
        filter: `drop-shadow(0 0 8px ${glowColor}) drop-shadow(0 0 20px ${glowColorDim})`,
    }

    // Random movement paths — generated once per shape mount so they don't change on re-renders
    const rand = (min, max) => Math.random() * (max - min) + min
    const { yPath, xPath } = useMemo(() => ({
        yPath: [0, rand(-80, -40), rand(20, 60), rand(-60, -20), rand(30, 70), 0],
        xPath: [0, rand(40, 100), rand(-100, -40), rand(60, 120), rand(-80, -30), 0],
    }), [])

    // floatAnimation: moves the shape around the x/y axes and spins it in 3D
    const floatAnimation = {
        opacity: 1,
        y: yPath,
        x: xPath,
        rotateX: [0, 180, 360],
        rotateY: [0, 180, 360],
        rotateZ: [0, 180, 360],
        transition: {
            y: { duration: shape.duration * 3, repeat: Infinity, ease: 'easeInOut'},
            x: { duration: shape.duration * 3.5, repeat: Infinity, ease: 'easeInOut'},
            rotateX: { duration: shape.duration * 2, repeat: Infinity, ease: 'linear'},
            rotateY: { duration: shape.duration * 2.5, repeat: Infinity, ease: 'linear'},
            rotateZ: { duration: shape.duration * 3, repeat: Infinity, ease: 'linear'},
        }
    }

    // popAnimation: makes shapes scale in from nothing, stay visible, then disappear — loops forever
    const popAnimation = {
        scale: [0, 1.2, 1, 1, 1, 0.8, 0],
        opacity: [0, 1, 1, 1, 1, 0.5, 0],
        transition: {
            duration: shape.duration * 2,
            repeat: Infinity,
            delay: shape.delay,
            ease: 'easeInOut',
        }
    }

    if (shape.type === 'circle') {
        return (
            <motion.div
                style={{
                    ...shapeStyle,
                    width: shape.size,
                    height: shape.size,
                    borderRadius: '50%',
                    border: '2px solid rgba(255, 215, 0, 0.6)',
                    boxShadow: '0 0 12px rgba(255, 215, 0, 0.4), inset 0 0 12px rgba(255, 215, 0, 0.1)',
                }}
                animate={{ ...floatAnimation, ...popAnimation }}
                initial={{ opacity: 0, scale: 0 }}
            />
        )
    }

    if (shape.type === 'diamond') {
        return (
            <motion.div
                style={{
                    ...shapeStyle,
                    width: shape.size,
                    height: shape.size,
                    border: '2px solid rgba(220, 38, 38, 0.7)',
                    boxShadow: '0 0 12px rgba(220, 38, 38, 0.4)',
                    transform: 'rotate(45deg)',
                }}
                animate={{ ...floatAnimation, ...popAnimation }}
                initial={{ opacity: 0, scale: 0 }}
            />
        )
    }

    if (shape.type === 'square') {
        return (
            <motion.div
                style={{
                    ...shapeStyle,
                    width: shape.size,
                    height: shape.size,
                    border: '2px solid rgba(255, 255, 255, 0.6)',
                    boxShadow: '0 0 12px rgba(255, 255, 255, 0.4), inset 0 0 12px rgba(255, 255, 255, 0.1)',
                }}
                animate={{ ...floatAnimation, ...popAnimation }}
                initial={{ opacity: 0, scale: 0 }}
            />
        )
    }

    if (shape.type === 'hexagon') {
        return (
            <motion.div
                style={{
                    ...shapeStyle,
                    width: shape.size,
                    height: shape.size * 0.866,
                    background: 'rgba(255, 215, 0, 0.08)',
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                    border: 'none',
                    boxShadow: `0 0 16px rgba(255,215,0,0.5)`,
                    backdropFilter: 'blur(2px)',
                }}
                animate={{ ...floatAnimation, ...popAnimation }}
                initial={{ opacity: 0, scale: 0 }}
            />
        )
    }

    if (shape.type === 'ring') {
        return (
            <motion.div
                style={{
                    ...shapeStyle,
                    width: shape.size,
                    height: shape.size,
                    borderRadius: '50%',
                    border: `${shape.size * 0.1}px solid rgba(220, 38, 38, 0.6)`,
                    boxShadow: '0 0 16px rgba(220,38,38,0.5), inset 0 0 16px rgba(220,38,38,0.2)',
                }}
                animate={{ ...floatAnimation, ...popAnimation }}
                initial={{ opacity: 0, scale: 0 }}
            />
        )
    }

    if (shape.type === 'cross') {
        return (
            <motion.div
                style={{
                    ...shapeStyle,
                    width: shape.size,
                    height: shape.size,
                    background: 'rgba(255,255,255,0.6)',
                    clipPath: 'polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%)',
                    boxShadow: '0 0 12px rgba(255,255,255,0.5)',
                }}
                animate={{ ...floatAnimation, ...popAnimation }}
                initial={{ opacity: 0, scale: 0 }}
            />
        )
    }

    if (shape.type === 'triangle') {
        return (
            <motion.div
                style={{
                    ...shapeStyle,
                    width: 0,
                    height: 0,
                    borderLeft: `${shape.size / 2}px solid transparent`,
                    borderRight: `${shape.size / 2}px solid transparent`,
                    borderBottom: `${shape.size}px solid rgba(255, 215, 0, 0.3)`,
                    filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 20px rgba(255, 215, 0, 0.4))',
                }}
                animate={{ ...floatAnimation, ...popAnimation }}
                initial={{ opacity: 0, scale: 0 }}
            />
        )
    }
}

// Background component — drop <Background /> at the top of any page to get the floating shapes.
// Uses pointerEvents: none so shapes never block clicks. perspective: 800px enables the 3D rotation effect.
export default function Background() {
    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            perspective: '800px',
        }}>
            {shapes.map(shape => (
                <Shape key={shape.id} shape={shape} />
            ))}
        </div>
    )
}
