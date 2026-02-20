import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/stories', label: 'Stories' },
    { to: '/search', label: 'Search' },
    { to: '/share', label: 'Share Story' },
    { to: '/red-flags', label: 'Red Flags' },
    { to: '/resources', label: 'Resources' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🛡️</span>
            <span className="text-xl font-bold text-primary-700">ScamGuard</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-600 hover:text-primary-600 text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm"
              >
                {link.label}
              </Link>
            ))}
            {currentUser ? (
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 text-primary-600 hover:bg-primary-50 rounded-lg text-sm"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
