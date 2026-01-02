import React from 'react';
import logo from '../assets/logo.png';

function Footer() {
  return (
    <footer className="bg-green-600 text-white px-6 md:px-16 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <img src={logo} alt="FreshDairy Logo" className="w-8 h-8" />
            <span className="font-bold text-lg">FreshDairy</span>
          </div>
          <p className="text-sm">
            Premium dairy products delivered fresh from our organic farm to your table. Quality you can trust since 1985.
          </p>
          <div className="flex mt-4 space-x-4">
            <span className="material-icons">facebook</span>
            <span className="material-icons">instagram</span>
            <span className="material-icons">twitter</span>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-2">Quick Links</h4>
          <ul className="text-sm space-y-1">
            <li>Home</li>
            <li>Products</li>
            <li>About Us</li>
            <li>Contact</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Our Products</h4>
          <ul className="text-sm space-y-1">
            <li>Fresh Milk</li>
            <li>Artisan Cheese</li>
            <li>Greek Yogurt</li>
            <li>Organic Butter</li>
            <li>Cream & More</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Contact Us</h4>
          <ul className="text-sm space-y-1">
            <li>123 Farm Road, Green Valley, NY 12345</li>
            <li>+1 (555) 123-FARM</li>
            <li>hello@freshdairy.com</li>
            <li>Mon-Fri: 6:00AM - 8:00PM</li>
            <li>Sat-Sun: 7:00AM - 6:00PM</li>
          </ul>
        </div>
      </div>
      <div className="mt-10 text-center text-xs text-green-50">
        © 2024 FreshDairy. All rights reserved. | Privacy Policy | Terms of Service
      </div>
    </footer>
  );
}
export default Footer;
