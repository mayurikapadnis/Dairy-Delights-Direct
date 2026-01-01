import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

async function registerUser({ name, email, password }) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  if (!response.ok) {
    throw new Error('Registration failed');
  }
  return await response.json();
}

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await registerUser({ name, email, password });
      // Optionally: localStorage.setItem('token', data.token);
      navigate('/'); // change to '/products' if you want after signup
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center py-20 bg-gray-50 min-h-screen">
        <div className="bg-white rounded p-10 shadow-lg w-full max-w-md">
          <div className="flex space-x-2 mb-8">
            <button className="w-1/2 py-2 rounded bg-gray-100">Login</button>
            <button className="w-1/2 py-2 rounded bg-green-600 text-white">Sign Up</button>
          </div>
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
            <input
              type="text"
              className="w-full mb-4 px-4 py-3 rounded bg-gray-100"
              required
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="email"
              className="w-full mb-4 px-4 py-3 rounded bg-gray-100"
              required
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full mb-6 px-4 py-3 rounded bg-gray-100"
              required
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700">
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Signup;
