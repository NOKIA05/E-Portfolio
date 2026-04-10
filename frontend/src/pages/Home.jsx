// Home.jsx — the main landing page of the portfolio.
// Layout: top nav (Projects, Skills) → squiggly line → name heading + About → squiggly line → bottom nav (Contact, Resume)
import { motion } from 'framer-motion'
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Background from '../components/Backgrounds'
import TypeLine from '../components/TypeLine'

// menuItems is kept here for reference but not currently used in the layout.
// The active navigation uses NavLink components directly in the JSX below.
const menuItems = [
    { label: 'About', path: '/about', rotate: 0},
    { label: 'Projects', path: '/projects', rotate: 4},
    { label: 'About', path: '/about', rotate: -4},
    { label: 'Contact', path: '/contact', rotate: 6},
    { label: 'Resume', path: 'https://e-portfolio-l09x.onrender.com/api/resume', external: true, rotate: -3},
]

// MenuItem — a glass card style nav item (not currently used in the main layout)
function MenuItem({ item, index }) {
    const [hovered, setHovered] = useState(false)

    const style = {
        textShadow: hovered
            ? '2px 2px 0px rgba(220,38,38,1), 4px 4px 0px rgba(150, 0, 0, 0.6), 0 0 32px rgba(220, 38, 38, 0.8)'
            : '2px 2px 0px rgba(255, 215, 0, 0.6), 4px 4px 0px rgba(180, 150, 0, 0.3)',
            color: hovered ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
            transition: 'all 0.3s ease',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            display: 'inline-block',
    }

    const sharedProps = {
        style,
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false),
        className:"block text-5xl font-bold tracking-widest",
    }

    return (
        <motion.div
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0, rotateZ: item.rotate }}
            transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
            style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 215, 0, 0.12) 100%)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: '12px',
                padding: '16px 48px',
                minWidth: '320px',
                textAlign: 'center',
                border: '1px solid transparent',
                backgroundClip: 'padding-box',
                boxShadow: hovered
                    ? '0 0 20px rgba(220, 38, 38, 0.4), inset 0 0 0 1px rgba(255, 215, 0, 0.8)'
                    : 'inset 0 0 0 1px rgba(255, 255, 255, 0.5), inset 0 0 0 2px rgba(255,215,0,0.3',
                transition: 'box-shadow 0.3s ease',
            }}
        >
            {item.external ? (
                <a href={item.path} download {...sharedProps}>{item.label}</a>
            ) : (
                <Link to={item.path} {...sharedProps}>{item.label}</Link>
            )}
        </motion.div>
    )
}

// NavLink — the plain text navigation link used throughout the home page.
// Changes color and scales up on hover, red glow on hover vs gold glow at rest.
// To add a new nav link: <NavLink to="/your-page" delay={0.5}>Label</NavLink>
function NavLink({ to, children, delay }) {
    const [hovered, setHovered] = useState(false)
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            style={{ position: 'relative', display: 'inline-block' }}
        >
            {/* Organic ink brushstroke — wide, thick, irregular curves */}
            <svg
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80vw',
                    maxWidth: '600px',
                    height: '80px',
                    pointerEvents: 'none',
                    overflow: 'visible',
                    opacity: hovered ? 0.95 : 0.75,
                    transition: 'opacity 0.2s ease',
                }}
                viewBox="0 0 600 80"
                preserveAspectRatio="none"
            >
                <path
                    d="M5,40
                    C6,30 10,18 22,17
                    C34,16 38,10 52,14
                    C64,18 68,8 82,13
                    C94,18 100,10 114,14
                    C126,18 130,12 144,11
                    C156,10 162,18 178,14
                    C192,10 196,20 212,15
                    C226,10 230,18 246,14
                    C260,10 264,20 280,16
                    C294,12 300,20 316,14
                    C330,8 338,18 352,13
                    C364,8 370,18 386,14
                    C400,10 404,20 420,15
                    C434,10 440,20 456,15
                    C468,10 474,18 488,14
                    C500,10 506,20 520,16
                    C532,12 538,20 552,16
                    C564,12 570,20 582,18
                    C592,16 597,24 596,40
                    C595,54 590,64 578,66
                    C566,68 560,60 546,65
                    C532,70 526,62 512,66
                    C498,70 492,62 478,66
                    C464,70 456,62 442,66
                    C428,70 422,60 408,65
                    C394,70 388,60 374,64
                    C360,68 354,60 340,65
                    C326,70 320,60 306,64
                    C292,68 286,60 272,64
                    C258,68 252,60 238,65
                    C224,70 216,62 202,66
                    C188,70 182,62 168,65
                    C154,68 148,60 134,64
                    C120,68 114,60 100,65
                    C86,70 80,62 66,65
                    C52,68 46,60 32,63
                    C20,66 10,60 6,52
                    C4,48 4,44 5,40 Z"
                    fill="rgba(44, 44, 44, 0.90)"
                />
            </svg>

            <Link
                to={to}
                className="text-5xl font-bold tracking-widest"
                style={{
                    position: 'relative',
                    zIndex: 1,
                    color: hovered ? '#ffffff' : 'rgba(255,255,255,0.7)',
                    textShadow: hovered ? '0 0 12px rgba(255,255,255,0.6)' : '0 0 10px rgba(255,255,255,0.3)',
                    transition: 'all 0.2s ease',
                    display: 'inline-block',
                    transform: hovered ? 'scale(1.08)' : 'scale(1)',
                }}
            >
                {children}
            </Link>
        </motion.div>
    )
}

function Home() {
    // line1Done: tracks when "ABD-ALRHMAN'S" finishes typing so "PORTFOLIO!" can start
    const [line1Done, setLine1Done] = useState(false)
    // showCursor: toggles the blinking | cursor on and off
    const [showCursor, setShowCursor] = useState(true)

    useEffect(() => {
        const blink = setInterval(() => setShowCursor(c => !c), 530)
        return () => clearInterval(blink)
    }, [])

return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden flex flex-col items-center">
    <Background />

    <div className="relative z-10 flex flex-col items-center w-full">

    {/* Title section at the top */}
    <div className="w-full flex flex-col items-center pt-10">

        {/* First squiggly line — above the title */}
        <motion.svg
            width="100%"
            height="30"
            viewBox="0 0 1440 30"
            preserveAspectRatio="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '1.5rem', filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.6))' }}
        >
            <motion.path
                d="M0,15 C120,0 240,30 360,15 C480,0 600,30 720,15 C840,0 960,30 1080,15 C1200,0 1320,30 1440,15"
                fill="none"
                stroke="url(#lineGrad1)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
            <defs>
                <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,1)" />
                </linearGradient>
            </defs>
        </motion.svg>

        <h1
            className="text-7xl font-black text-white tracking-widest italic text-center"
            style={{ textShadow: '0 0 20px rgba(255,255,255,0.7)' }}
        >
            <TypeLine text="ABD-ALRHMAN'S" onDone={() => setLine1Done(true)} />
            {!line1Done && (
                <span style={{ color: 'rgba(255,255,255,0.9)' }}>{showCursor ? '|' : ''}</span>
            )}
            <br />
            {line1Done && (
                <span style={{ fontSize: '6rem' }}>
                    <TypeLine text="PORTFOLIO!" />
                    <span style={{ color: 'rgba(255,255,255,0.9)' }}>{showCursor ? '|' : ''}</span>
                </span>
            )}
        </h1>

        {/* Second squiggly line — below the title */}
        <motion.svg
            width="100%"
            height="30"
            viewBox="0 0 1440 30"
            preserveAspectRatio="none"
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ marginTop: '1.5rem', filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.6))' }}
        >
            <motion.path
                d="M0,15 C120,0 240,30 360,15 C480,0 600,30 720,15 C840,0 960,30 1080,15 C1200,0 1320,30 1440,15"
                fill="none"
                stroke="url(#lineGrad2)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
            />
            <defs>
                <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,1)" />
                </linearGradient>
            </defs>
        </motion.svg>
    </div>

    {/* Nav links centered in the middle of the page */}
    <div className="flex flex-col items-center justify-center flex-1 gap-12 my-auto py-24">
        <NavLink to="/about" delay={0.1}>About</NavLink>
        <NavLink to="/skills" delay={0.25}>Skills</NavLink>
        <NavLink to="/projects" delay={0.4}>Projects</NavLink>
        <NavLink to="/resume" delay={0.55}>Resume</NavLink>
        <NavLink to="/contact" delay={0.7}>Contact</NavLink>
    </div>

    <div className="w-full">
    </div>

    </div>
    </div>
)
}


export default Home
