import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { MealsProvider } from './context/MealsProvider.tsx'
import { restoreRedirect } from './restoreRedirect.ts'

// Must run before the router is created (see restoreRedirect.ts).
restoreRedirect()

// BASE_URL is '/mp2/' (from vite.config.ts), so the router knows the app is
// served from a sub-folder on GitHub Pages.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <MealsProvider>
        <App />
      </MealsProvider>
    </BrowserRouter>
  </StrictMode>,
)
