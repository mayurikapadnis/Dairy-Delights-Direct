import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAnchorClick = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close menu on click
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

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="flex items-center justify-between px-6 md:px-8 py-4">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="FreshDairy Logo" className="w-10 h-10" />
          <span className="font-bold text-xl text-gray-800">FreshDairy</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li>
            <a href="/#about" onClick={e => handleAnchorClick(e, 'about')} className="cursor-pointer">
              About
            </a>
          </li>
          <li>
            <a href="/#contact" onClick={e => handleAnchorClick(e, 'contact')} className="cursor-pointer">
              Contact
            </a>
          </li>
        </ul>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="text-gray-700">Login</Link>
          <Link
            to="/signup"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition font-medium"
          >
            Sign Up
          </Link>
          <Link to="/cart" className="relative flex items-center">
            <ShoppingCart className="h-6 w-6 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <Link to="/cart" className="relative flex items-center mr-2">
            <ShoppingCart className="h-6 w-6 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-4">
          <ul className="flex flex-col space-y-4 text-gray-700 font-medium">
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="/products" onClick={() => setIsMenuOpen(false)}>Products</Link></li>
            <li>
              <a href="/#about" onClick={e => handleAnchorClick(e, 'about')} className="cursor-pointer">
                About
              </a>
            </li>
            <li>
              <a href="/#contact" onClick={e => handleAnchorClick(e, 'contact')} className="cursor-pointer">
                Contact
              </a>
            </li>
          </ul>
          <div className="border-t pt-4 flex flex-col space-y-4">
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-gray-700">Login</Link>
            <Link
              to="/signup"
              onClick={() => setIsMenuOpen(false)}
              className="bg-green-600 text-white px-4 py-2 rounded text-center hover:bg-green-700 transition font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
