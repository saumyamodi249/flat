import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from './home/Home'
import Inventory from './inventory/Inventory'
import Amenities from './amenities/Amenities'
import Gallery from './gallery/Gallery'
import Maps from './maps/Maps'
import About from './about/About'
import Contact from './contact/Contact'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Base Home Layout (Home Page is the persistent background across mobile/tablet/laptop) */}
        <Route element={<Home />}>
          <Route path="/home" element={null} />
          <Route path="/amenities/*" element={<Amenities />} />
          <Route path="/gallery/*" element={<Gallery />} />
          <Route path="/maps/*" element={<Maps />} />
          <Route path="/about/*" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Inventory is independent */}
        <Route path="/inventory/*" element={<Inventory />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
