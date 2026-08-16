// Projects.jsx - every row from the Supabase `projects` table, as a card grid.
// Add or edit projects in the Supabase table editor; nothing here needs changing.
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiAlertCircle } from 'react-icons/fi'

import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import ProjectCard from '../components/ProjectCard'
import GitHubActivity from '../components/GitHubActivity'
import { supabase } from '../lib/supabase'

function Projects() {
  const [projects, setProjects] = useState([])
  const [state, setState] = useState('loading') // loading | ready | error

  useEffect(() => {
    let alive = true
    supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!alive) return
        if (error) {
          setState('error')
          return
        }
        setProjects(data || [])
        setState('ready')
      })
    return () => {
      alive = false
    }
  }, [])

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <PageHeader
        eyebrow="Projects"
        title="Things I've built"
        subtitle="Web apps, network tooling, and security experiments, pulled live from my Supabase database."
      />

      {state === 'loading' && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <div key={i} className="card h-52 animate-pulse p-6" />
          ))}
        </div>
      )}

      {state === 'error' && (
        <div className="card flex items-start gap-3 p-6">
          <FiAlertCircle size={18} className="mt-0.5 shrink-0 text-amber-400" />
          <div>
            <p className="font-medium text-white">Couldn&apos;t load projects</p>
            <p className="mt-1 text-sm text-[#a89e91]">
              The Supabase request failed. Check that the anon key is set and
              that the `projects` table allows public reads.
            </p>
          </div>
        </div>
      )}

      {state === 'ready' && projects.length === 0 && (
        <div className="card p-10 text-center">
          <p className="text-white">No projects yet.</p>
          <p className="mt-2 text-sm text-[#a89e91]">
            Add a row to the `projects` table in Supabase and it&apos;ll show up
            here.
          </p>
        </div>
      )}

      {state === 'ready' && projects.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.id ?? p.title} delay={(i % 3) * 0.08} className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      )}

      <GitHubActivity />

      <Reveal className="mt-14">
        <div className="hairline mb-8" />
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-[15px] text-[#a89e91]">
            Want to talk through any of these?
          </p>
          <Link to="/contact" className="btn btn-ghost">
            Get in touch
          </Link>
        </div>
      </Reveal>
    </div>
  )
}

export default Projects
