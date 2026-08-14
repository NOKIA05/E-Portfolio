// About.jsx — bio cards, a short timeline, and social links.
// All the text lives in src/lib/profile.js (ABOUT_SECTIONS, TIMELINE).
import { FiArrowUpRight, FiMail } from 'react-icons/fi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { ABOUT_SECTIONS, TIMELINE, SOCIALS, PROFILE } from '../lib/profile'

const socialMeta = {
  github: { Icon: FaGithub, blurb: 'Code, commits, and side projects' },
  linkedin: { Icon: FaLinkedin, blurb: 'Experience and professional history' },
  email: { Icon: FiMail, blurb: 'The fastest way to reach me' },
}

function About() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
      <PageHeader
        eyebrow="About"
        title="A bit about me"
        subtitle={`${PROFILE.role} · ${PROFILE.location}`}
      />

      {/* Bio cards — two up on desktop */}
      <div className="grid gap-5 sm:grid-cols-2">
        {ABOUT_SECTIONS.map((section, i) => (
          <Reveal key={section.label} delay={i * 0.07} className="h-full">
            <div className="card card-sheen h-full p-6 sm:p-7">
              <p className="eyebrow mb-3">{section.label}</p>
              <p className="text-[15px] leading-relaxed text-[#d4c9ba]">
                {section.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Timeline */}
      <Reveal className="mt-16">
        <p className="eyebrow mb-6">Timeline</p>
        <ol className="relative border-l border-white/10 pl-7">
          {TIMELINE.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={i * 0.08}
              className="relative pb-9 last:pb-0"
            >
              {/* Node on the rail */}
              <span
                className="absolute -left-[calc(1.75rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full"
                style={{
                  background: i === 0 ? '#e5a854' : '#373026',
                  boxShadow:
                    i === 0 ? '0 0 0 4px rgba(209,142,63,0.18)' : 'none',
                }}
              />
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#7d7365]">
                {item.period}
              </p>
              <h3 className="mt-1.5 text-base font-semibold tracking-tight text-white">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-[#a89e91]">
                {item.detail}
              </p>
            </Reveal>
          ))}
        </ol>
      </Reveal>

      {/* Social cards */}
      <Reveal className="mt-16">
        <p className="eyebrow mb-6">Elsewhere</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {SOCIALS.map((s, i) => {
            const meta = socialMeta[s.id]
            const Icon = meta.Icon
            return (
              <Reveal key={s.id} delay={i * 0.07} className="h-full">
                <a
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="card card-hover card-sheen group flex h-full flex-col p-5"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="flex items-center justify-between">
                    <Icon size={20} className="text-white" />
                    <FiArrowUpRight
                      size={16}
                      className="text-[#7d7365] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                    />
                  </div>
                  <p className="mt-4 text-[15px] font-semibold text-white">
                    {s.label}
                  </p>
                  <p className="mt-1 text-sm text-[#a89e91]">{meta.blurb}</p>
                </a>
              </Reveal>
            )
          })}
        </div>
      </Reveal>
    </div>
  )
}

export default About
