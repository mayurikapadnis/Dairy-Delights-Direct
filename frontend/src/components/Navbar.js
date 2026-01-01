import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext'; // Import the cart hook

function Navbar() {
  const { cartCount } = useCart(); // Get cart count from global state
  const location = useLocation();
  const navigate = useNavigate();

  // Custom handler for About and Contact navigation to home with scroll
  const handleAnchorClick = (e, id) => {
    e.preventDefault();
    const targetPath = '/' + (id ? `#${id}` : '');

    if (location.pathname !== '/') {
      // Navigate to home with hash, scroll handled in Home component
      navigate(targetPath);
    } else {
      // Already on home, scroll to section
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white flex items-center justify-between px-8 py-4 shadow">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="FreshDairy Logo" className="w-10 h-10" />
        <span className="font-bold text-xl text-gray-800">FreshDairy</span>
      </div>
      <ul className="flex space-x-8 text-gray-700 font-medium">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li>
          <a
            href="/#about"
            onClick={e => handleAnchorClick(e, 'about')}
            className="cursor-pointer"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="/#contact"
            onClick={e => handleAnchorClick(e, 'contact')}
            className="cursor-pointer"
          >
            Contact
          </a>
        </li>
      </ul>
      <div className="flex items-center space-x-4">
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
    </nav>
  );
}

export default Navbar;
