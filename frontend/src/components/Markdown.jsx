// Markdown.jsx - a small, SAFE markdown renderer for case studies.
// Everything is built as React elements (never dangerouslySetInnerHTML), so
// content from the database cannot inject HTML or scripts.
//
// Supported syntax:
//   ## Heading        -> h2          ### Heading -> h3
//   - item            -> bulleted list
//   1. item           -> numbered list
//   ```...```         -> code block
//   **bold**  `code`  [text](https://...)   (http/https links only)
//   blank line        -> paragraph break

function renderInline(text, keyPrefix) {
  const parts = []
  // Split on: **bold**, `code`, [text](url)
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\((https?:\/\/[^\s)]+)\))/g
  let last = 0
  let match
  let i = 0
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    const token = match[0]
    if (token.startsWith('**')) {
      parts.push(
        <strong key={`${keyPrefix}-b${i}`} className="font-semibold text-white">
          {token.slice(2, -2)}
        </strong>,
      )
    } else if (token.startsWith('`')) {
      parts.push(
        <code
          key={`${keyPrefix}-c${i}`}
          className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-[#e5a854]"
        >
          {token.slice(1, -1)}
        </code>,
      )
    } else {
      const label = token.slice(1, token.indexOf(']'))
      const url = match[2]
      parts.push(
        <a
          key={`${keyPrefix}-a${i}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#e5a854] underline decoration-[#8a5a1c] underline-offset-2 hover:text-white"
        >
          {label}
        </a>,
      )
    }
    last = match.index + token.length
    i++
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

function Markdown({ content }) {
  if (!content) return null

  const blocks = []
  const lines = content.split('\n')
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.trim() === '') {
      i++
      continue
    }

    // Code block
    if (line.trim().startsWith('```')) {
      const code = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        code.push(lines[i])
        i++
      }
      i++ // closing fence
      blocks.push(
        <pre
          key={key++}
          className="my-5 overflow-x-auto rounded-xl border border-white/[0.08] bg-black/40 p-4 font-mono text-[13px] leading-relaxed text-[#d8cec0]"
        >
          {code.join('\n')}
        </pre>,
      )
      continue
    }

    // Headings
    if (line.startsWith('### ')) {
      blocks.push(
        <h3
          key={key++}
          className="mb-3 mt-8 text-lg font-semibold tracking-tight text-white"
        >
          {renderInline(line.slice(4), `h${key}`)}
        </h3>,
      )
      i++
      continue
    }
    if (line.startsWith('## ')) {
      blocks.push(
        <h2
          key={key++}
          className="mb-4 mt-10 text-2xl font-bold tracking-tight text-white"
          style={{ letterSpacing: '-0.02em' }}
        >
          {renderInline(line.slice(3), `h${key}`)}
        </h2>,
      )
      i++
      continue
    }

    // Bulleted list
    if (line.trim().startsWith('- ')) {
      const items = []
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2))
        i++
      }
      blocks.push(
        <ul key={key++} className="my-4 flex list-disc flex-col gap-2 pl-5 marker:text-[#d18e3f]">
          {items.map((item, j) => (
            <li key={j} className="text-[15px] leading-relaxed text-[#c9c0b4]">
              {renderInline(item, `li${key}-${j}`)}
            </li>
          ))}
        </ul>,
      )
      continue
    }

    // Numbered list
    if (/^\d+\.\s/.test(line.trim())) {
      const items = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ''))
        i++
      }
      blocks.push(
        <ol key={key++} className="my-4 flex list-decimal flex-col gap-2 pl-5 marker:text-[#d18e3f]">
          {items.map((item, j) => (
            <li key={j} className="text-[15px] leading-relaxed text-[#c9c0b4]">
              {renderInline(item, `ol${key}-${j}`)}
            </li>
          ))}
        </ol>,
      )
      continue
    }

    // Paragraph: gather consecutive non-empty, non-special lines
    const para = []
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('#') &&
      !lines[i].trim().startsWith('- ') &&
      !/^\d+\.\s/.test(lines[i].trim()) &&
      !lines[i].trim().startsWith('```')
    ) {
      para.push(lines[i])
      i++
    }
    blocks.push(
      <p key={key++} className="my-4 text-[15px] leading-relaxed text-[#c9c0b4]">
        {renderInline(para.join(' '), `p${key}`)}
      </p>,
    )
  }

  return <div>{blocks}</div>
}

export default Markdown
