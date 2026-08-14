// Footer.jsx — shared footer on every page.
import { Link } from 'react-router-dom'
import { FiMail } from 'react-icons/fi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { SOCIALS } from '../lib/profile'

const socialIcons = { github: FaGithub, linkedin: FaLinkedin, email: FiMail }

function Footer() {
  return (
    <footer className="relative z-10 mt-24">
      <div className="hairline" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-5 py-9 sm:flex-row sm:px-8">
        <p className="text-sm text-[#7d7365]">
          © {new Date().getFullYear()} Abd-alrhman Odeh · Built with React,
          Tailwind &amp; Supabase
        </p>

        <div className="flex items-center gap-2">
          {SOCIALS.map(s => {
            const Icon = socialIcons[s.id]
            return (
              <a
                key={s.id}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-lg text-[#a89e91] transition-all hover:-translate-y-0.5 hover:text-white"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <Icon size={16} />
              </a>
            )
          })}
          <Link
            to="/contact"
            className="ml-2 text-sm font-medium text-[#a89e91] transition-colors hover:text-white"
            style={{ textDecoration: 'none' }}
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
