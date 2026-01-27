import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { ShoppingCart, Menu, X, User, Package, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleAnchorClick = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const targetPath = '/' + (id ? `#${id}` : '');

    if (location.pathname !== '/') {
      navigate(targetPath);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-white via-green-50/30 to-white backdrop-blur-sm shadow-md border-b border-green-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-green-400 rounded-full blur-sm opacity-30 group-hover:opacity-50 transition"></div>
            <img src={logo} alt="FreshDairy Logo" className="w-11 h-11 relative filter drop-shadow-sm" />
          </div>
          <span className="font-extrabold text-2xl bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent tracking-tight">
            FreshDairy
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-1">
          {[
            { to: '/', label: 'Home' },
            { to: '/products', label: 'Products' }
          ].map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isActive(to)
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                  }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="/#about"
              onClick={e => handleAnchorClick(e, 'about')}
              className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 cursor-pointer"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/#contact"
              onClick={e => handleAnchorClick(e, 'contact')}
              className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 cursor-pointer"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Right Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2 rounded-lg hover:bg-green-50 transition-all duration-200 group"
          >
            <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-green-600 transition" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold shadow-lg animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-green-50 transition-all duration-200 group focus:outline-none"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-700 font-medium group-hover:text-green-700">{user.name}</span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200">
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center px-4 py-3 hover:bg-green-50 transition-colors text-gray-700 hover:text-green-700"
                  >
                    <User className="w-4 h-4 mr-3" />
                    <span className="font-medium">My Profile</span>
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center px-4 py-3 hover:bg-green-50 transition-colors text-gray-700 hover:text-green-700"
                  >
                    <Package className="w-4 h-4 mr-3" />
                    <span className="font-medium">My Orders</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsProfileOpen(false);
                      navigate('/');
                    }}
                    className="w-full flex items-center px-4 py-3 border-t border-gray-100 hover:bg-red-50 transition-colors text-red-600 hover:text-red-700"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link
                to="/login"
                className="px-5 py-2 text-green-700 font-semibold hover:bg-green-50 rounded-lg transition-all duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-green-700 hover:to-green-800 transition-all duration-200"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden p-2 rounded-lg hover:bg-green-50 transition">
          {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <ul className="flex flex-col space-y-1 p-4">
            {[
              { to: '/', label: 'Home' },
              { to: '/products', label: 'Products' }
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition ${isActive(to)
                      ? 'bg-green-600 text-white'
                      : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                    }`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/#about"
                onClick={e => handleAnchorClick(e, 'about')}
                className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition cursor-pointer"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/#contact"
                onClick={e => handleAnchorClick(e, 'contact')}
                className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition cursor-pointer"
              >
                Contact
              </a>
            </li>
            <li>
              <Link
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
              >
                Cart {cartCount > 0 && `(${cartCount})`}
              </Link>
            </li>
            {user ? (
              <>
                <li className="border-t border-gray-100 pt-2 mt-2">
                  <div className="px-4 py-2 text-sm text-gray-500">
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs">{user.email}</p>
                  </div>
                </li>
                <li>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orders"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                  >
                    My Orders
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                      navigate('/');
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg text-center shadow-md"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
