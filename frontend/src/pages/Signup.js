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
  const [showSuccess, setShowSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center py-20 bg-gray-50 min-h-screen relative">
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center animate-bounce-in">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Registration Successful!</h3>
              <p className="text-gray-600">Redirecting to login...</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded p-10 shadow-lg w-full max-w-md">
          <div className="flex space-x-2 mb-8">
            <button
              onClick={() => navigate('/login')}
              className="w-1/2 py-2 rounded bg-gray-100"
            >
              Login
            </button>
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
