import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import DetailView from './pages/DetailView'
import GalleryView from './pages/GalleryView'
import ListView from './pages/ListView'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      {/* Layout has no path: it wraps every route nested inside it. */}
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/list" replace />} />
        <Route path="list" element={<ListView />} />
        <Route path="gallery" element={<GalleryView />} />
        <Route path="meal/:id" element={<DetailView />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
