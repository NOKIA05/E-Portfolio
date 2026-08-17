// Dock.jsx - the site's navigation: a floating glass dock, fixed to the
// bottom of the viewport on every page. Replaces the old top-nav links
// (the top bar keeps only the wordmark and the contact button).
// The active page's tile glows amber; labels appear on hover.
// On phones the tiles shrink so all six fit comfortably.
import { NavLink } from 'react-router-dom'
import {
  FiHome,
  FiUser,
  FiTool,
  FiFolder,
  FiFileText,
  FiMail,
} from 'react-icons/fi'

const items = [
  { to: '/', Icon: FiHome, label: 'Home' },
  { to: '/about', Icon: FiUser, label: 'About' },
  { to: '/skills', Icon: FiTool, label: 'Skills' },
  { to: '/projects', Icon: FiFolder, label: 'Projects' },
  { to: '/resume', Icon: FiFileText, label: 'Resume' },
  { to: '/contact', Icon: FiMail, label: 'Contact' },
]

function Dock() {
  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-end gap-1.5 rounded-[22px] px-2.5 py-2.5 sm:bottom-6 sm:gap-2 sm:rounded-[26px] sm:px-4 sm:py-3"
      style={{
        background: 'rgba(255,244,230,0.07)',
        border: '1px solid rgba(255,244,230,0.16)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        boxShadow:
          '0 24px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,244,230,0.18)',
      }}
    >
      {items.map(({ to, Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          aria-label={label}
          className="group relative grid h-11 w-11 place-items-center rounded-[14px] transition-all sm:h-[54px] sm:w-[54px] sm:rounded-[16px]"
          style={({ isActive }) => ({
            background: isActive
              ? 'linear-gradient(135deg, #f0b45e, #c05a2a)'
              : 'rgba(255,244,230,0.08)',
            border: isActive
              ? '1px solid rgba(255,255,255,0.2)'
              : '1px solid rgba(255,244,230,0.13)',
            color: isActive ? '#241302' : '#d8cec0',
            boxShadow: isActive
              ? '0 10px 30px -8px rgba(224,146,60,0.8)'
              : 'none',
          })}
        >
          <Icon className="h-[19px] w-[19px] sm:h-[21px] sm:w-[21px]" />
          <span
            className="pointer-events-none absolute -top-9 hidden whitespace-nowrap rounded-md px-2 py-1 font-mono text-[11px] opacity-0 transition-opacity group-hover:opacity-100 sm:block"
            style={{
              background: 'rgba(11,9,8,0.92)',
              border: '1px solid rgba(255,244,230,0.15)',
              color: '#f6f1e9',
            }}
          >
            {label}
          </span>
        </NavLink>
      ))}
    </nav>
  )
}

export default Dock
