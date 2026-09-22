import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import HomePage from './home/pages/HomePage'
import InventoryPage from './inventory/pages/InventoryPage'
import AmenitiesPage from './amenities/pages/AmenitiesPage'
import GalleryPage from './gallery/pages/GalleryPage'
import MapPage from './maps/pages/MapPage'
import AboutPage from './about/pages/AboutPage'
import TheProject from './about/components/TheProject'
import Location from './about/components/Location'
import Developer from './about/components/Developer'
import ContactPage from './contact/pages/ContactPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/amenities" element={<AmenitiesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/maps" element={<MapPage />} />
        <Route path="/about" element={<AboutPage />}>
          <Route index element={<Navigate to="project" replace />} />
          <Route path="project" element={<TheProject />} />
          <Route path="location" element={<Location />} />
          <Route path="developer" element={<Developer />} />
        </Route>
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
