import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

async function loginUser({ email, password }) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return await response.json();
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      // Optionally store the token, then redirect
      // localStorage.setItem('token', data.token); // Uncomment if you want persistent auth
      navigate('/'); // Redirect to home, or use `/products` for product page
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
            <button className="w-1/2 bg-gray-100 py-2 rounded">Login</button>
            <button
              onClick={() => navigate('/signup')}
              className="w-1/2 py-2 rounded bg-green-50 text-green-800"
            >
              Sign Up
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
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
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
