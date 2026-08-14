// Skills.jsx — skills grouped into cards, each skill rendered as a pill.
// To edit: change SKILL_GROUPS in src/lib/profile.js.
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { SKILL_GROUPS } from '../lib/profile'

function Skills() {
  const total = SKILL_GROUPS.reduce((n, g) => n + g.skills.length, 0)

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <PageHeader
        eyebrow="Skills"
        title="What I work with"
        subtitle={`${total} tools and technologies across ${SKILL_GROUPS.length} areas — the ones I've actually shipped something with.`}
      />

      <div className="grid gap-5 md:grid-cols-2">
        {SKILL_GROUPS.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.07} className="h-full">
            <div className="card card-sheen h-full p-6 sm:p-7">
              <div className="mb-5 flex items-baseline justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold tracking-tight text-white">
                    {group.label}
                  </h2>
                  <p className="mt-1 text-[13px] text-[#7d7365]">{group.hint}</p>
                </div>
                <span className="font-mono text-[11px] text-[#7d7365]">
                  {String(group.skills.length).padStart(2, '0')}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map(skill => (
                  <span key={skill} className="pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export default Skills
