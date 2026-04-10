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
            {/* Ink brushstroke — fixed width so all 5 links match */}
            <svg
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '360px',
                    height: '58px',
                    pointerEvents: 'none',
                    overflow: 'visible',
                    opacity: hovered ? 0.95 : 0.72,
                    transition: 'opacity 0.2s ease',
                }}
                viewBox="0 0 360 52"
                preserveAspectRatio="none"
            >
                <path
                    d="M3,26
                    L6,14 L13,20 L21,12 L29,19 L37,13 L45,20 L53,12 L61,19 L69,13 L77,20
                    L85,12 L93,19 L101,13 L109,20 L117,12 L125,19 L133,13 L141,20 L149,12 L157,19
                    L165,14 L173,20 L181,12 L189,19 L197,13 L205,20 L213,12 L221,19 L229,14 L237,20
                    L245,12 L253,19 L261,13 L269,20 L277,12 L285,19 L293,14 L301,20 L309,13 L317,19
                    L325,14 L333,20 L340,16 L348,21 L355,24 L357,26
                    L354,38 L347,33 L339,40 L331,34 L323,40 L315,34 L307,40 L299,34 L291,40 L283,34
                    L275,40 L267,34 L259,40 L251,34 L243,40 L235,34 L227,40 L219,34 L211,40 L203,34
                    L195,40 L187,34 L179,40 L171,34 L163,40 L155,34 L147,40 L139,34 L131,40 L123,34
                    L115,40 L107,34 L99,40 L91,34 L83,40 L75,34 L67,40 L59,34 L51,40 L43,34
                    L35,40 L27,34 L19,39 L11,34 L5,38 L3,26 Z"
                    fill="rgba(48, 48, 48, 0.88)"
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
