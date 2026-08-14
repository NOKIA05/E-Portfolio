// Resume.jsx — resume preview + download.
// All three files are served straight from /public (no backend involved):
//   public/resume.pdf, public/resume-preview-1.png, public/resume-preview-2.png
import { FiDownload, FiExternalLink } from 'react-icons/fi'

import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'

const PDF_PATH = '/resume.pdf'
const PAGES = [1, 2]

function Resume() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          eyebrow="Resume"
          title="Resume"
          subtitle="Two pages. Grab the PDF, or read it right here."
        />

        <Reveal className="flex shrink-0 gap-3 pb-12">
          <a
            href={PDF_PATH}
            download="Abd-alrhman_Odeh_Resume.pdf"
            className="btn btn-primary"
          >
            <FiDownload size={16} />
            Download
          </a>
          <a
            href={PDF_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <FiExternalLink size={16} />
            Open
          </a>
        </Reveal>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {PAGES.map((n, i) => (
          <Reveal key={n} delay={i * 0.1}>
            <figure className="card card-sheen overflow-hidden p-2">
              <img
                src={`/resume-preview-${n}.png`}
                alt={`Resume page ${n}`}
                loading="lazy"
                className="w-full rounded-[10px]"
                style={{ display: 'block' }}
              />
              <figcaption className="px-2 py-2.5 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-[#7d7365]">
                Page {n}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export default Resume
