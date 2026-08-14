// Navbar.jsx — the persistent top navigation on every page.
// Becomes a frosted bar once you scroll past 12px, collapses to a sheet on mobile.
// To add a page to the nav: add it to the `links` array below.
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

const links = [
  { label: 'About', to: '/about' },
  { label: 'Skills', to: '/skills' },
  { label: 'Projects', to: '/projects' },
  { label: 'Resume', to: '/resume' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Frost the bar only after the user scrolls, so the hero stays clean at rest
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile sheet whenever the route changes
  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(12,10,8,0.72)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.07)' : 'transparent'}`,
      }}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* Wordmark */}
        <Link
          to="/"
          className="group flex items-center gap-2.5"
          style={{ textDecoration: 'none' }}
        >
          <span
            className="grid h-8 w-8 place-items-center rounded-lg text-[13px] font-extrabold"
            style={{
              color: '#221302',
              background: 'linear-gradient(140deg, #e9b063, #c07f2e)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.16) inset',
            }}
          >
            AO
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-white">
            Abd-alrhman Odeh
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className="relative rounded-lg px-3 py-2 text-sm font-medium transition-colors"
              style={({ isActive }) => ({
                color: isActive ? '#fff' : '#a89e91',
                textDecoration: 'none',
              })}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: 'rgba(255,255,255,0.07)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </>
              )}
            </NavLink>
          ))}
          <Link to="/contact" className="btn btn-primary ml-3 h-9 text-sm">
            Get in touch
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
          className="grid h-10 w-10 place-items-center rounded-lg text-white md:hidden"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {open ? <FiX size={18} /> : <FiMenu size={18} />}
        </button>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden md:hidden"
            style={{
              background: 'rgba(12,10,8,0.95)',
              backdropFilter: 'blur(14px)',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div className="flex flex-col gap-1 px-5 pb-5 pt-2">
              {[...links, { label: 'Contact', to: '/contact' }].map(l => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className="rounded-lg px-3 py-3 text-base font-medium"
                  style={({ isActive }) => ({
                    color: isActive ? '#fff' : '#a89e91',
                    background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
                    textDecoration: 'none',
                  })}
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
