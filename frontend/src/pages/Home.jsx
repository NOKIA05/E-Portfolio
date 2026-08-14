// Home.jsx — the landing page.
// Sections: hero → stats → featured projects (live from Supabase) → stack → CTA.
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiMapPin } from 'react-icons/fi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

import Reveal from '../components/Reveal'
import ProjectCard from '../components/ProjectCard'
import { supabase } from '../lib/supabase'
import { PROFILE, STATS, SOCIALS } from '../lib/profile'

// The logos strip under the hero
const STACK = [
  'React',
  'Tailwind',
  'Supabase',
  'PostgreSQL',
  'Python',
  'Flask',
  'Vercel',
  'Linux',
]

function Home() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  // Pull the three newest projects for the "Selected work" section
  useEffect(() => {
    let alive = true
    supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (!alive) return
        setProjects(data || [])
        setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [])

  const github = SOCIALS.find(s => s.id === 'github')
  const linkedin = SOCIALS.find(s => s.id === 'linkedin')

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      {/* ------------------------------------------------------------------ HERO */}
      <section className="flex flex-col items-start pb-20 pt-20 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full py-1.5 pl-2 pr-3.5"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[12px] font-medium text-[#a89e91]">
            {PROFILE.status}
          </span>
        </motion.div>

        {/* Terminal prompt — a small cybersecurity wink above the headline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.04 }}
          className="mb-4 font-mono text-[13px] tracking-tight"
          aria-hidden="true"
        >
          <span style={{ color: '#d18e3f' }}>abood@memphis</span>
          <span className="text-[#7d7365]">:~$ </span>
          <span className="text-[#d4c9ba]">whoami</span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl text-[2.75rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          style={{ letterSpacing: '-0.025em' }}
        >
          <span className="text-white">{PROFILE.name}</span>
          <br />
          <span className="text-gradient">builds secure software.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-2xl text-[17px] leading-relaxed text-[#a89e91] sm:text-lg"
        >
          {PROFILE.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Link to="/projects" className="btn btn-primary">
            View projects
            <FiArrowRight size={16} />
          </Link>
          <Link to="/contact" className="btn btn-ghost">
            Get in touch
          </Link>
          <div className="ml-1 flex items-center gap-2">
            <a
              href={github?.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid h-11 w-11 place-items-center rounded-[10px] text-[#a89e91] transition-all hover:-translate-y-0.5 hover:text-white"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <FaGithub size={17} />
            </a>
            <a
              href={linkedin?.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid h-11 w-11 place-items-center rounded-[10px] text-[#a89e91] transition-all hover:-translate-y-0.5 hover:text-white"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <FaLinkedin size={17} />
            </a>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 inline-flex items-center gap-2 text-sm text-[#7d7365]"
        >
          <FiMapPin size={14} />
          {PROFILE.location} · {PROFILE.school}
        </motion.p>
      </section>

      {/* ----------------------------------------------------------------- STATS */}
      <Reveal as="section" className="grid gap-4 sm:grid-cols-3">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="card card-sheen p-6">
            <p className="font-display text-2xl font-bold tracking-tight text-white">
              {s.value}
            </p>
            <p className="mt-1.5 text-sm text-[#a89e91]">{s.label}</p>
          </Reveal>
        ))}
      </Reveal>

      {/* ----------------------------------------------------------------- STACK */}
      <Reveal as="section" className="py-16" delay={0.05}>
        <p className="eyebrow mb-5">Working with</p>
        <div className="flex flex-wrap gap-2.5">
          {STACK.map(t => (
            <span key={t} className="pill">
              {t}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="hairline" />

      {/* -------------------------------------------------------------- PROJECTS */}
      <section className="py-16">
        <Reveal className="mb-9 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-3">Selected work</p>
            <h2
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
              style={{ letterSpacing: '-0.02em' }}
            >
              Things I&apos;ve built
            </h2>
          </div>
          <Link
            to="/projects"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-[#a89e91] transition-colors hover:text-white sm:inline-flex"
            style={{ textDecoration: 'none' }}
          >
            All projects
            <FiArrowRight size={15} />
          </Link>
        </Reveal>

        {loading && (
          // Skeletons while Supabase responds
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map(i => (
              <div key={i} className="card h-48 animate-pulse p-6" />
            ))}
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="card p-10 text-center">
            <p className="text-white">Projects are on their way.</p>
            <p className="mt-2 text-sm text-[#a89e91]">
              Add a row to the `projects` table in Supabase and it&apos;ll appear
              here.
            </p>
          </div>
        )}

        {!loading && projects.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.id ?? p.title} delay={i * 0.08} className="h-full">
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        )}

        <Reveal className="mt-8 sm:hidden">
          <Link to="/projects" className="btn btn-ghost w-full">
            All projects
            <FiArrowRight size={15} />
          </Link>
        </Reveal>
      </section>

      {/* ------------------------------------------------------------------- CTA */}
      <Reveal as="section" className="pb-8">
        <div
          className="card card-sheen relative overflow-hidden p-9 text-center sm:p-14"
          style={{
            background:
              'linear-gradient(140deg, rgba(209,142,63,0.16), rgba(255,255,255,0.02) 55%)',
          }}
        >
          <h2
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            style={{ letterSpacing: '-0.02em' }}
          >
            Let&apos;s build something
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[17px] leading-relaxed text-[#a89e91]">
            Internships, collaborations, or just a question about one of the
            projects. My inbox is open.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn btn-primary">
              Send a message
              <FiArrowRight size={16} />
            </Link>
            <Link to="/resume" className="btn btn-ghost">
              View resume
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

export default Home
