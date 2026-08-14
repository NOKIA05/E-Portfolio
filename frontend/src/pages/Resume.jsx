// Resume.jsx - resume preview + download.
// Both files are served straight from /public (no backend involved):
//   public/resume.pdf and public/resume-preview-1.png
// If the resume grows to two pages again: add resume-preview-2.png and put 2 in PAGES.
import { FiDownload, FiExternalLink } from 'react-icons/fi'

import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'

const PDF_PATH = '/resume.pdf'
const PAGES = [1]

function Resume() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          eyebrow="Resume"
          title="Resume"
          subtitle="Grab the PDF, or read it right here."
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

      <div
        className={
          PAGES.length > 1
            ? 'grid gap-6 md:grid-cols-2'
            : 'mx-auto max-w-3xl'
        }
      >
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
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export default Resume
