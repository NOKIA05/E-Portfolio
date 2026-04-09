import { motion } from 'framer-motion'

// 8 columns x 5 rows = 40 cells, one particle per cell with random jitter
const particles = Array.from({ length: 40 }, (_, i) => {
    const col = i % 8
    const row = Math.floor(i / 8)
    return {
        id: i,
        size: Math.random() * 4 + 3,
        x: (col / 8) * 95 + Math.random() * 10 + 1,
        y: (row / 5) * 90 + Math.random() * 14 + 1,
        driftX: (Math.random() - 0.5) * 100,
        driftY: (Math.random() - 0.5) * 100,
        duration: Math.random() * 6 + 6,
        delay: Math.random() * 5,
    }
})

function Particle({ p }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{
                opacity: [0, 0.85, 0.5, 0.85, 0],
                x: [0, p.driftX * 0.5, p.driftX, p.driftX * 0.5, 0],
                y: [0, p.driftY * 0.5, p.driftY, p.driftY * 0.5, 0],
            }}
            transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
            style={{
                position: 'absolute',
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                borderRadius: '50%',
                background: 'white',
                boxShadow: '0 0 8px 2px rgba(255,255,255,0.8), 0 0 16px rgba(255,255,255,0.4)',
                pointerEvents: 'none',
            }}
        />
    )
}

export default function Background() {
    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1,
        }}>
            {particles.map(p => (
                <Particle key={p.id} p={p} />
            ))}
        </div>
    )
}
