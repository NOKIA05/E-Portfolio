// ProjectCard.jsx - one project tile, shared by the home page and /projects.
// Reads a row from the Supabase `projects` table. Only `title` is required;
// every other column is optional and simply doesn't render if it's empty.
//
// Recognised columns: title, description, github_url, live_url, slug,
//                     case_study, tech (text[] or comma-separated text)
// When slug + case_study exist, the card links to the /projects/:slug page.
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiArrowRight, FiGithub } from 'react-icons/fi'

// Only render links with a safe scheme. Guards against a compromised or
// misconfigured database row smuggling a javascript: URL into an href.
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

// `tech` may come back as a Postgres array, a comma-separated string, or null
function toTechList(tech) {
  if (!tech) return []
  if (Array.isArray(tech)) return tech
  return String(tech)
    .split(',')
    .map(t => t.trim())
    .filter(Boolean)
}

function ProjectCard({ project }) {
  const tech = toTechList(project.tech ?? project.tags ?? project.stack)
  const githubUrl = safeUrl(project.github_url)
  const liveUrl = safeUrl(project.live_url)
  const caseStudy = project.slug && project.case_study
  const primary = caseStudy || liveUrl || githubUrl

  return (
    <article className="card card-hover card-sheen group flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight text-white">
          {project.title}
        </h3>
        {primary && (
          <FiArrowUpRight
            size={18}
            className="mt-1 shrink-0 text-[#7d7365] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
          />
        )}
      </div>

      {project.description && (
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#a89e91]">
          {project.description}
        </p>
      )}

      {tech.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {tech.map(t => (
            <span key={t} className="pill">
              {t}
            </span>
          ))}
        </div>
      )}

      {(caseStudy || githubUrl || liveUrl) && (
        <div className="mt-6 flex items-center gap-4 border-t border-white/[0.06] pt-4">
          {caseStudy && (
            <Link
              to={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#e5a854] transition-colors hover:text-white"
              style={{ textDecoration: 'none' }}
            >
              Case study
              <FiArrowRight size={15} />
            </Link>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#a89e91] transition-colors hover:text-white"
              style={{ textDecoration: 'none' }}
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
              className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-white ${
                caseStudy ? 'text-[#a89e91]' : 'text-[#e5a854]'
              }`}
              style={{ textDecoration: 'none' }}
            >
              Live site
              <FiArrowUpRight size={15} />
            </a>
          )}
        </div>
      )}
    </article>
  )
}

export default ProjectCard
