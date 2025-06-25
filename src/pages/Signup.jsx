import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Signup = ({ onNavigate }) => {
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password);
    onNavigate('home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-3 border rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">Sign Up</button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <button onClick={() => onNavigate('login')} className="text-indigo-600 hover:underline">Login</button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
