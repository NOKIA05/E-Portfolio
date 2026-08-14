// ProjectCard.jsx - one project tile, shared by the home page and /projects.
// Reads a row from the Supabase `projects` table. Only `title` is required;
// every other column is optional and simply doesn't render if it's empty.
//
// Recognised columns: title, description, github_url, live_url,
//                     tech (text[] or comma-separated text), featured (bool)
import { FiArrowUpRight, FiGithub } from 'react-icons/fi'

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
  const primary = project.live_url || project.github_url

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

      {(project.github_url || project.live_url) && (
        <div className="mt-6 flex items-center gap-4 border-t border-white/[0.06] pt-4">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#a89e91] transition-colors hover:text-white"
              style={{ textDecoration: 'none' }}
            >
              <FiGithub size={15} />
              Source
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#e5a854] transition-colors hover:text-white"
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
