import { useState } from 'react'

function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: ''})
    const [status, setStatus] = useState('')

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        setStatus('Sending...')

        fetch('http://127.0.0.1:5000/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) setStatus('Message sent!')
                else setStatus(data.error)
        })
    }
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
            <h1 className="text-3xl font-bold text-white mb-6">Contact Me</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
                <input
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    className="p-3 rounded bg-gray-800 text-white"
                    />
                <input
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    className="p-3 rounded bg-gray-800 text-white"
                    />
                <textarea
                    name="message"
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange}
                    className="p-3 rounded bg-gray-800 text-white h-32"
                    />
                <button type="submit" className="bg-white text-black font-bold p-3 rounded">
                    Send
                </button>
                {status && <p className="text-gray-300">{status}</p>}
            </form>
        </div>
    )
}

export default Contact