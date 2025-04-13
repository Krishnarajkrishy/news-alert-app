import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavigationBar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-md w-full">
      <div className="container mx-auto flex justify-between items-center h-16 px-6">
        <Link
          to="/"
          className="text-3xl font-bold font-serif px-4 py-2 bg-white text-gray-900 rounded-xl hover:shadow-lg transition"
        >
          News Portal
        </Link>

        <div className="hidden md:flex space-x-6">
          {isAuthenticated ? (
            <>
              <Link to="/signin-home" className="hover:text-gray-300">
                Home
              </Link>
              <Link to="/news-list" className="hover:text-gray-300">
                News
              </Link>
              <Link to="/favorites" className="hover:text-gray-300">
                Favorites
              </Link>
              <Link to="/subscription" className="hover:text-gray-300">
                Subscription
              </Link>
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-green-500 hover:bg-green-600 rounded-lg shadow-md transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-white"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 p-4 flex flex-col items-center space-y-4">
          {isAuthenticated ? (
            <>
              <Link to="/news-list" className="block hover:text-gray-300">
                News
              </Link>
              <Link to="/favorites" className="block hover:text-gray-300">
                Favorites
              </Link>
              <Link to="/subscription" className="block hover:text-gray-300">
                Subscription
              </Link>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block w-full text-center py-2 bg-blue-500 hover:bg-blue-600 rounded-lg"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full text-center py-2 bg-green-500 hover:bg-green-600 rounded-lg"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
