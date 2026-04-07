import { useState, useEffect } from 'react'

function Blog() {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/blog')
        .then(res => res.json())
        .then(data => setBlogs(data))
    }, [])
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-6">My Blogs</h1>
            {blogs.length === 0 ? (
                <p className="text-gray-400">No Blogs yet.</p>
            ): (
                blogs.map(blog => (
                    <div key={blog.id} className="bg-gray-800 p-4 rounded mb-4">
                        <h2 className="text-xl font-bold text-white">{blog.title}</h2>
                        <p className="text-gray-300">{blog.content}</p>
                    </div>
                ))
            )}
        </div>
    )
}

export default Blog