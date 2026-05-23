import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Background from '../components/Backgrounds'
import TypeLine from '../components/TypeLine'

function Resume() {
    const [titleDone, setTitleDone] = useState(false)
    const [showCursor, setShowCursor] = useState(true)

    useEffect(() => {
        const blink = setInterval(() => setShowCursor(c => !c), 530)
        return () => clearInterval(blink)
    }, [])

    return (
        <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
            <Background />

            {/* Download button — served from public folder, no backend needed */}
            <div className="fixed top-6 right-8 z-20">
                <a
                    href="/resume.pdf"
                    download="Abd-alrhman_Odeh_resume.pdf"
                    className="text-2xl font-bold tracking-widest inline-block"
                    style={{ color: 'rgba(255,255,255,0.6)', textShadow: '0 0 10px rgba(255,255,255,0.3)', textDecoration: 'none' }}
                >
                    ↓ Download
                </a>
            </div>

            <div className="relative z-10 p-12 flex flex-col items-center">
                <div className="w-full max-w-5xl">
                    <Link
                        to="/"
                        className="text-2xl font-bold tracking-widest mb-12 inline-block"
                        style={{ color: 'rgba(255,255,255,0.6)', textShadow: '0 0 10px rgba(255,255,255,0.3)' }}
                    >
                        ← Back
                    </Link>

                    <h1
                        className="text-6xl font-black text-white tracking-widest italic mb-12"
                        style={{ textShadow: '0 0 20px rgba(255,255,255,0.7)' }}
                    >
                        <TypeLine text="Resume" onDone={() => setTitleDone(true)} />
                        {!titleDone && (
                            <span style={{ color: 'rgba(255,255,255,0.9)' }}>{showCursor ? '|' : ''}</span>
                        )}
                    </h1>

                    {titleDone && (
                        <div className="flex gap-6">
                            {[1, 2].map(n => (
                                <motion.div
                                    key={n}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: n * 0.1 }}
                                    style={{
                                        flex: 1,
                                        border: '1px solid rgba(255,255,255,0.15)',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        boxShadow: '0 0 40px rgba(255,255,255,0.06)',
                                    }}
                                >
                                    <img
                                        src={`/resume-preview-${n}.png`}
                                        alt={`Resume page ${n}`}
                                        style={{ width: '100%', display: 'block' }}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Resume
