// Contact.jsx - contact form.
// Writes straight into the Supabase `messages` table (no backend server).
// Run supabase/schema.sql once to create the table + the insert-only RLS policy.
import { useState } from 'react'
import { FiSend, FiCheckCircle, FiAlertCircle, FiMail } from 'react-icons/fi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { supabase } from '../lib/supabase'
import { SOCIALS } from '../lib/profile'

const EMPTY = { name: '', email: '', message: '', company: '' } // `company` = honeypot
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  const email = SOCIALS.find(s => s.id === 'email')
  const github = SOCIALS.find(s => s.id === 'github')
  const linkedin = SOCIALS.find(s => s.id === 'linkedin')

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    // Client-side validation - the DB has matching CHECK constraints
    if (!form.name.trim()) return setError('Please add your name.')
    if (!EMAIL_RE.test(form.email.trim()))
      return setError('That email address doesn’t look right.')
    if (form.message.trim().length < 10)
      return setError('Message needs to be at least 10 characters.')

    // Honeypot: real people never fill a hidden field, bots usually do
    if (form.company) {
      setStatus('sent')
      return
    }

    setStatus('sending')

    const { error: dbError } = await supabase.from('messages').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    })

    if (dbError) {
      setStatus('error')
      setError("Couldn't send that. Try again, or email me directly.")
      return
    }

    setStatus('sent')
    setForm(EMPTY)
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        subtitle="Internships, collaborations, or a question about a project. Send it over and I'll get back to you."
      />

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* -------------------------------------------------------------- FORM */}
        <Reveal>
          <div className="card card-sheen p-6 sm:p-8">
            {status === 'sent' ? (
              <div className="flex flex-col items-center py-12 text-center">
                <div
                  className="mb-5 grid h-14 w-14 place-items-center rounded-full"
                  style={{
                    background: 'rgba(16,185,129,0.12)',
                    border: '1px solid rgba(16,185,129,0.35)',
                  }}
                >
                  <FiCheckCircle size={24} className="text-emerald-400" />
                </div>
                <h2 className="text-xl font-semibold tracking-tight text-white">
                  Message sent
                </h2>
                <p className="mt-2 max-w-sm text-[15px] text-[#a89e91]">
                  Thanks for reaching out. I&apos;ll reply as soon as I can.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="btn btn-ghost mt-7"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="text-[13px] font-medium text-[#d4c9ba]">
                      Name
                    </span>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      autoComplete="name"
                      className="field"
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="text-[13px] font-medium text-[#d4c9ba]">
                      Email
                    </span>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      autoComplete="email"
                      className="field"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-2">
                  <span className="text-[13px] font-medium text-[#d4c9ba]">
                    Message
                  </span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What's on your mind?"
                    rows={7}
                    className="field resize-y"
                  />
                </label>

                {/* Honeypot - hidden from humans, catnip for bots */}
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: '-9999px',
                    opacity: 0,
                    height: 0,
                    width: 0,
                  }}
                />

                {error && (
                  <p className="flex items-center gap-2 text-sm text-amber-400">
                    <FiAlertCircle size={15} />
                    {error}
                  </p>
                )}

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn btn-primary"
                  >
                    <FiSend size={15} />
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                  </button>
                  <span className="text-[13px] text-[#7d7365]">
                    Usually replies within a day or two.
                  </span>
                </div>
              </form>
            )}
          </div>
        </Reveal>

        {/* ----------------------------------------------------------- SIDEBAR */}
        <Reveal delay={0.1} className="flex flex-col gap-4">
          <a
            href={email?.href}
            className="card card-hover card-sheen p-6"
            style={{ textDecoration: 'none' }}
          >
            <FiMail size={20} className="text-white" />
            <p className="mt-4 text-[15px] font-semibold text-white">Email</p>
            <p className="mt-1 break-all text-sm text-[#a89e91]">
              {email?.href.replace('mailto:', '')}
            </p>
          </a>

          <a
            href={github?.href}
            target="_blank"
            rel="noopener noreferrer"
            className="card card-hover card-sheen p-6"
            style={{ textDecoration: 'none' }}
          >
            <FaGithub size={20} className="text-white" />
            <p className="mt-4 text-[15px] font-semibold text-white">GitHub</p>
            <p className="mt-1 text-sm text-[#a89e91]">Code and side projects</p>
          </a>

          <a
            href={linkedin?.href}
            target="_blank"
            rel="noopener noreferrer"
            className="card card-hover card-sheen p-6"
            style={{ textDecoration: 'none' }}
          >
            <FaLinkedin size={20} className="text-white" />
            <p className="mt-4 text-[15px] font-semibold text-white">LinkedIn</p>
            <p className="mt-1 text-sm text-[#a89e91]">
              Experience and background
            </p>
          </a>
        </Reveal>
      </div>
    </div>
  )
}

export default Contact
