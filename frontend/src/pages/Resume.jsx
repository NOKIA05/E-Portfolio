// Resume.jsx — displays your resume as two PNG images side by side with a download button.
// Images are served from the Flask backend (backend/app/static/).
// Files needed in backend/app/static/:
//   resume.pdf          → the downloadable PDF
//   resume-preview-1.png → page 1 of your resume as an image
//   resume-preview-2.png → page 2 of your resume as an image
// After deployment: replace https://e-portfolio-l09x.onrender.com with your Render backend URL
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Background from '../components/Backgrounds'
import TypeLine from '../components/TypeLine'

function Resume() {
    // titleDone: controls when the resume images appear (after "Resume" finishes typing)
    const [titleDone, setTitleDone] = useState(false)
    const [showCursor, setShowCursor] = useState(true)

    useEffect(() => {
        const blink = setInterval(() => setShowCursor(c => !c), 530)
        return () => clearInterval(blink)
    }, [])

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            <Background />

            {/* Download button — fixed to top right, always visible while scrolling.
                download_name is set in the backend route so it saves as Abd-alrhman_Odeh_resume.pdf */}
            <div className="fixed top-6 right-8 z-20">
                <a
                    href="https://e-portfolio-l09x.onrender.com/api/resume"
                    download
                    className="text-2xl font-bold tracking-widest inline-block"
                    style={{ color: 'rgba(255,255,255,0.6)', textShadow: '2px 2px 0px rgba(255,215,0,0.6)', textDecoration: 'none' }}
                >
                    ↓ Download
                </a>
            </div>

            <div className="relative z-10 p-12 flex flex-col items-center">
                {/* max-w-5xl gives enough width to show both pages side by side */}
                <div className="w-full max-w-5xl">
                    <Link
                        to="/"
                        className="text-2xl font-bold tracking-widest mb-12 inline-block"
                        style={{ color: 'rgba(255,255,255,0.6)', textShadow: '2px 2px 0px rgba(255,215,0,0.6)' }}
                    >
                        ← Back
                    </Link>

                    <h1
                        className="text-6xl font-black text-white tracking-widest italic mb-12"
                        style={{ textShadow: '0 0 20px rgba(255,215,0,0.8)' }}
                    >
                        <TypeLine text="Resume" onDone={() => setTitleDone(true)} />
                        {!titleDone && (
                            <span style={{ color: 'rgba(255,215,0,0.9)' }}>{showCursor ? '|' : ''}</span>
                        )}
                    </h1>

                    {/* Both resume pages appear side by side after the title types out */}
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
                                        border: '1px solid rgba(255,215,0,0.2)',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        boxShadow: '0 0 40px rgba(255,215,0,0.08)',
                                    }}
                                >
                                    <img
                                        src={`https://e-portfolio-l09x.onrender.com/api/resume/preview/${n}`}
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
