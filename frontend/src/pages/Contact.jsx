// Contact.jsx — the contact form page. Submits to the Flask backend which emails you via SendGrid.
// The form is rate limited to 3 submissions per minute per IP (set in backend/app/routes/contact.py).
// After deployment: replace https://e-portfolio-l09x.onrender.com with your Render backend URL
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Background from '../components/Backgrounds'
import TypeLine from '../components/TypeLine'

function Contact() {
    // form: tracks what the user has typed in each field
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    // status: shows feedback to the user ("Sending...", "Message sent!", or an error)
    const [status, setStatus] = useState('')
    // titleDone: controls when the form appears (after "Contact" finishes typing)
    const [titleDone, setTitleDone] = useState(false)
    const [showCursor, setShowCursor] = useState(true)

    useEffect(() => {
        const blink = setInterval(() => setShowCursor(c => !c), 530)
        return () => clearInterval(blink)
    }, [])

    // Updates the form state whenever the user types in any field
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    // Sends the form data to the backend as JSON on submission
    function handleSubmit(e) {
        e.preventDefault()
        setStatus('Sending...')

        fetch('https://e-portfolio-l09x.onrender.com/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) setStatus('Message sent!')
                else setStatus(data.error)
            })
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
            <Background />
            <div className="relative z-10 p-12 flex flex-col items-center">
                <div className="w-full max-w-xl">
                    {/* Back button — same style used on every inner page */}
                    <Link
                        to="/"
                        className="text-2xl font-bold tracking-widest mb-12 inline-block"
                        style={{ color: 'rgba(255,255,255,0.6)', textShadow: '2px 2px 0px rgba(220,38,38,0.6), 4px 4px 0px rgba(255,215,0,0.4)' }}
                    >
                        ← Back
                    </Link>

                    <h1
                        className="text-6xl font-black text-white tracking-widest italic mb-12"
                        style={{ textShadow: '0 0 20px rgba(255,255,255,0.7)' }}
                    >
                        <TypeLine text="Contact" onDone={() => setTitleDone(true)} />
                        {!titleDone && (
                            <span style={{ color: 'rgba(255,255,255,0.9)' }}>{showCursor ? '|' : ''}</span>
                        )}
                    </h1>

                    {/* Form fades in after the title finishes typing */}
                    {titleDone && (
                        <motion.form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <input
                                name="name"
                                placeholder="Your Name"
                                value={form.name}
                                onChange={handleChange}
                                className="p-4 rounded-lg text-white text-xl tracking-widest"
                                style={{
                                    background: 'rgba(255,255,255,0.08)',
                                    border: '1px solid rgba(255,255,255,0.25)',
                                    backdropFilter: 'blur(12px)',
                                    outline: 'none',
                                }}
                            />
                            <input
                                name="email"
                                placeholder="Your Email"
                                value={form.email}
                                onChange={handleChange}
                                className="p-4 rounded-lg text-white text-xl tracking-widest"
                                style={{
                                    background: 'rgba(255,255,255,0.08)',
                                    border: '1px solid rgba(255,255,255,0.25)',
                                    backdropFilter: 'blur(12px)',
                                    outline: 'none',
                                }}
                            />
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={form.message}
                                onChange={handleChange}
                                className="p-4 rounded-lg text-white text-xl tracking-widest h-40"
                                style={{
                                    background: 'rgba(255,255,255,0.08)',
                                    border: '1px solid rgba(255,255,255,0.25)',
                                    backdropFilter: 'blur(12px)',
                                    outline: 'none',
                                }}
                            />
                            {/* Send button — red to gold gradient */}
                            <button
                                type="submit"
                                className="p-4 rounded-lg text-xl font-black tracking-widest"
                                style={{
                                    background: 'rgba(255,255,255,0.9)',
                                    color: '#000',
                                    textShadow: 'none',
                                }}
                            >
                                Send
                            </button>
                            {/* Shows submission status below the button */}
                            {status && (
                                <p className="text-xl tracking-widest text-center"
                                    style={{ color: 'rgba(255,255,255,0.7)' }}>
                                    {status}
                                </p>
                            )}
                        </motion.form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Contact
