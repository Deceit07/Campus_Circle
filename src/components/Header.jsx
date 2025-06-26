import React from 'react';
import { ShoppingBag } from 'lucide-react';

const Header = ({ setPage, logout, isLoggedIn, setAuthPage }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => setPage('home')}>
            <ShoppingBag className="h-8 w-8 text-indigo-600" />
            <span className="ml-3 text-2xl font-bold text-gray-800">CampusCircles</span>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => setPage('home')} className="text-gray-700 hover:text-indigo-600 font-medium">
              Browse Items
            </button>
            <button onClick={() => setPage('addItem')} className="text-gray-700 hover:text-indigo-600 font-medium">
              List an Item
            </button>
            <button onClick={() => setPage('dashboard')} className="text-gray-700 hover:text-indigo-600 font-medium">
              My Profile
            </button>

            {isLoggedIn ? (
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md font-medium"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => setAuthPage('login')}
                  className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-md font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => setAuthPage('signup')}
                  className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-md font-medium"
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
