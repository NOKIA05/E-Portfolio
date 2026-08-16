// GitHubActivity.jsx - live section fed by the public GitHub API.
// Shows your most recently pushed repos, stars, and languages. Zero
// maintenance: push code to GitHub and this updates by itself.
// If the API is unreachable or rate-limited, the section renders nothing.
import { useEffect, useState } from 'react'
import { FiStar, FiGitBranch, FiArrowUpRight } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'

import Reveal from './Reveal'

const USERNAME = 'NOKIA05'
const MAX_REPOS = 4

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Ruby: '#701516',
  'C#': '#178600',
  C: '#555555',
  'Jupyter Notebook': '#DA5B0B',
  Shell: '#89e051',
}

// "3 days ago" style formatting without a library
function timeAgo(iso) {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  const units = [
    [31536000, 'year'],
    [2592000, 'month'],
    [604800, 'week'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
  ]
  for (const [size, label] of units) {
    const count = Math.floor(seconds / size)
    if (count >= 1) return `${count} ${label}${count > 1 ? 's' : ''} ago`
  }
  return 'just now'
}

function GitHubActivity() {
  const [repos, setRepos] = useState(null)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    let alive = true
    Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`).then(r =>
        r.ok ? r.json() : Promise.reject(),
      ),
      fetch(
        `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`,
      ).then(r => (r.ok ? r.json() : Promise.reject())),
    ])
      .then(([user, allRepos]) => {
        if (!alive) return
        setProfile(user)
        setRepos(
          allRepos
            .filter(r => !r.fork)
            .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
            .slice(0, MAX_REPOS),
        )
      })
      .catch(() => {
        // API down or rate-limited: hide the section entirely
        if (alive) setRepos([])
      })
    return () => {
      alive = false
    }
  }, [])

  // Loading or failed: render nothing (the page reads fine without it)
  if (!repos || repos.length === 0) return null

  return (
    <Reveal as="section" className="mt-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-3">Live from GitHub</p>
          <h2
            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
            style={{ letterSpacing: '-0.02em' }}
          >
            Recent activity
          </h2>
        </div>
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#a89e91] transition-colors hover:text-white"
          style={{ textDecoration: 'none' }}
        >
          <FaGithub size={16} />
          {profile?.public_repos != null && (
            <span className="font-mono text-[12px]">
              {profile.public_repos} public repos
            </span>
          )}
          <FiArrowUpRight size={14} />
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {repos.map((repo, i) => (
          <Reveal key={repo.id} delay={i * 0.06} className="h-full">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover card-sheen group flex h-full flex-col p-5"
              style={{ textDecoration: 'none' }}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-mono text-[14px] font-semibold text-white">
                  {repo.name}
                </p>
                <FiArrowUpRight
                  size={15}
                  className="mt-0.5 shrink-0 text-[#7d7365] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                />
              </div>

              {repo.description && (
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#a89e91]">
                  {repo.description}
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-4 text-[12px] text-[#7d7365]">
                {repo.language && (
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        background:
                          LANGUAGE_COLORS[repo.language] || '#d18e3f',
                      }}
                    />
                    {repo.language}
                  </span>
                )}
                {repo.stargazers_count > 0 && (
                  <span className="inline-flex items-center gap-1">
                    <FiStar size={12} />
                    {repo.stargazers_count}
                  </span>
                )}
                <span className="inline-flex items-center gap-1">
                  <FiGitBranch size={12} />
                  updated {timeAgo(repo.pushed_at)}
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Reveal>
  )
}

export default GitHubActivity
