import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = ({ setPage }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => setPage('home')}>
            <ShoppingBag className="h-8 w-8 text-indigo-600" />
            <span className="ml-3 text-2xl font-bold text-gray-800">Campus Circles</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <button onClick={() => setPage('home')} className="text-gray-600 hover:text-indigo-600 font-medium px-3 py-2 rounded-md">Browse</button>
                <button onClick={() => setPage('addItem')} className="text-gray-600 hover:text-indigo-600 font-medium px-3 py-2 rounded-md">List</button>
                <button onClick={() => setPage('dashboard')} className="text-gray-600 hover:text-indigo-600 font-medium px-3 py-2 rounded-md">Dashboard</button>
                <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 font-medium">Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => setPage('login')} className="text-gray-600 hover:text-indigo-600 font-medium px-3 py-2 rounded-md">Login</button>
                <button onClick={() => setPage('signup')} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 font-medium">Sign Up</button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
