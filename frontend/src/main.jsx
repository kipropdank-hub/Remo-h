import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import App from './App.jsx'
import './index.css'

// Local development uses the Vite /api proxy (empty base URL). On Render,
// VITE_API_URL is baked into the build and points at the Django service.
const apiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
if (apiUrl) {
  axios.defaults.baseURL = apiUrl
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
