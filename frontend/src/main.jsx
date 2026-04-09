// main.jsx — the entry point of the entire React app.
// This is what Vite loads first. It mounts the app into the <div id="root"> in index.html.
// BrowserRouter enables React Router so pages work with URLs like /about, /projects etc.
// StrictMode helps catch bugs during development (has no effect in production).
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
