import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Inventory', path: '/inventory' },
  { label: 'Amenities', path: '/amenities' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Maps', path: '/maps' },
  { label: 'About', path: '/about' },
  { label: 'Contact Us', path: '/contact' },
]

function BottomNav() {
  return (
    <nav className="flex justify-center gap-2 p-3 bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/'}
          className={({ isActive }) =>
            `px-3 py-1.5 rounded-md text-sm text-gray-700 no-underline transition-colors ${
              isActive ? 'bg-[#f5f0e8] font-semibold' : 'hover:bg-gray-100'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav
