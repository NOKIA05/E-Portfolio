// Navbar.jsx - the persistent top navigation on every page.
// Becomes a frosted bar once you scroll past 12px. Page links live in the Dock.
// To add a page to the nav: add it to the `items` array in Dock.jsx.
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  // Frost the bar only after the user scrolls, so the hero stays clean at rest
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
          <span className="font-display text-[15px] font-semibold tracking-tight text-white">
            Abd-alrhman Odeh
          </span>
        </Link>

        <Link to="/contact" className="btn btn-primary h-9 text-sm">
          Get in touch
        </Link>

      </nav>

    </header>
  )
}

export default Navbar
