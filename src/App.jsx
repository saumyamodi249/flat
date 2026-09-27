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
        <Route path="/home" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/amenities/*" element={<Amenities />} />
        <Route path="/gallery/*" element={<Gallery />} />
        <Route path="/maps/*" element={<Maps />} />
        <Route path="/about/*" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
