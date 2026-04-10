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
            {/* Grunge brushstroke background */}
            <svg
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '135%',
                    height: '340%',
                    pointerEvents: 'none',
                    overflow: 'visible',
                    transition: 'opacity 0.25s ease',
                    opacity: hovered ? 1 : 0.35,
                }}
                viewBox="0 0 400 100"
                preserveAspectRatio="none"
            >
                <defs>
                    <filter id="grunge" x="-10%" y="-30%" width="120%" height="160%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.065 0.08" numOctaves="4" seed="8" result="noise"/>
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" xChannelSelector="R" yChannelSelector="G"/>
                    </filter>
                </defs>
                {/* Base thick stroke — rough outer shape */}
                <path
                    d="M6,52 C4,34 18,16 40,18 C56,19 68,13 86,16 C106,19 122,12 142,14 C162,16 180,10 200,12 C220,14 238,9 258,12 C276,15 292,10 310,14 C326,18 340,14 355,20 C368,26 374,36 372,50 C370,62 360,70 344,68 C328,66 312,72 294,70 C276,68 258,73 240,71 C222,69 204,73 186,71 C168,69 150,73 132,71 C114,69 96,73 78,71 C60,69 42,72 26,66 C12,60 6,62 6,52 Z"
                    fill="white"
                    filter="url(#grunge)"
                />
                {/* Thinner inner stroke for layered paint look */}
                <path
                    d="M18,50 C16,38 28,24 50,26 C70,28 90,22 112,24 C134,26 154,20 176,22 C198,24 218,19 238,22 C256,25 272,21 288,24 C302,27 314,24 326,30 C336,36 338,46 334,54 C330,62 318,66 302,64 C284,62 264,66 244,64 C224,62 204,66 184,64 C164,62 144,66 124,64 C104,62 84,66 64,64 C48,62 30,64 20,58 C14,54 16,54 18,50 Z"
                    fill="white"
                    opacity="0.5"
                    filter="url(#grunge)"
                />
            </svg>

            <Link
                to={to}
                className="text-5xl font-bold tracking-widest"
                style={{
                    position: 'relative',
                    zIndex: 1,
                    color: hovered ? '#0a0a0a' : 'rgba(255,255,255,0.7)',
                    textShadow: hovered ? 'none' : '0 0 10px rgba(255,255,255,0.3)',
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
