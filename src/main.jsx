import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { NotificationProvider } from './context/NotificationContext' // 1. Import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <NotificationProvider> {/* 2. Wrap App */}
        <App />
      </NotificationProvider>
    </ThemeProvider>
  </StrictMode>,
)