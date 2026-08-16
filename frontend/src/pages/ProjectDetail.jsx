// ProjectDetail.jsx - the case study page for one project.
// Route: /projects/:slug. Loads the row from Supabase by slug and renders its
// `case_study` column (markdown) with the safe renderer.
// To write a case study: Supabase Table Editor -> projects -> edit the
// case_study cell. Markdown supported: ## headings, lists, **bold**, `code`.
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiArrowLeft, FiArrowUpRight, FiGithub } from 'react-icons/fi'

import Reveal from '../components/Reveal'
import Markdown from '../components/Markdown'
import { supabase } from '../lib/supabase'

// Same scheme guard as ProjectCard
function safeUrl(url) {
  if (!url) return null
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
      ? url
      : null
  } catch {
    return null
  }
}

function toTechList(tech) {
  if (!tech) return []
  if (Array.isArray(tech)) return tech
  return String(tech)
    .split(',')
    .map(t => t.trim())
    .filter(Boolean)
}

function ProjectDetail() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [state, setState] = useState('loading') // loading | ready | missing

  useEffect(() => {
    let alive = true
    setState('loading')
    supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!alive) return
        if (error || !data) {
          setState('missing')
          return
        }
        setProject(data)
        setState('ready')
      })
    return () => {
      alive = false
    }
  }, [slug])

  if (state === 'loading') {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="card h-10 w-40 animate-pulse" />
        <div className="card mt-8 h-64 animate-pulse" />
      </div>
    )
  }

  if (state === 'missing') {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-5 text-center">
        <p className="eyebrow mb-3">Not found</p>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          This project doesn&apos;t exist
        </h1>
        <Link to="/projects" className="btn btn-ghost mt-7">
          <FiArrowLeft size={15} />
          All projects
        </Link>
      </div>
    )
  }

  const githubUrl = safeUrl(project.github_url)
  const liveUrl = safeUrl(project.live_url)
  const tech = toTechList(project.tech ?? project.tags ?? project.stack)

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#a89e91] transition-colors hover:text-white"
          style={{ textDecoration: 'none' }}
        >
          <FiArrowLeft size={15} />
          All projects
        </Link>

        <p className="eyebrow mb-4 mt-10">Case study</p>
        <h1
          className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
          style={{ letterSpacing: '-0.02em' }}
        >
          {project.title}
        </h1>

        {project.description && (
          <p className="mt-5 text-[17px] leading-relaxed text-[#a89e91]">
            {project.description}
          </p>
        )}

        {(tech.length > 0 || githubUrl || liveUrl) && (
          <div className="mt-7 flex flex-wrap items-center gap-2">
            {tech.map(t => (
              <span key={t} className="pill">
                {t}
              </span>
            ))}
            <span className="flex-1" />
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost h-9 text-sm"
              >
                <FiGithub size={15} />
                Source
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary h-9 text-sm"
              >
                Live site
                <FiArrowUpRight size={15} />
              </a>
            )}
          </div>
        )}
      </Reveal>

      <Reveal delay={0.1}>
        <div className="hairline my-10" />
        {project.case_study ? (
          <Markdown content={project.case_study} />
        ) : (
          <p className="text-[15px] text-[#7d7365]">
            Full write-up coming soon.
          </p>
        )}
      </Reveal>

      <Reveal delay={0.15} className="mt-14">
        <div className="hairline mb-8" />
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-[15px] text-[#a89e91]">
            Questions about how this was built?
          </p>
          <Link to="/contact" className="btn btn-ghost">
            Get in touch
          </Link>
        </div>
      </Reveal>
    </div>
  )
}

export default ProjectDetail
