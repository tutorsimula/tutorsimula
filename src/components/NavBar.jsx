import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const NavBar = () => {
  console.log('NavBar component rendering');
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignUp = () => {
    navigate('/', { state: { showSignUp: true } });
  };

  const handleSignIn = () => {
    navigate('/', { state: { showSignIn: true } });
  };

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-br from-black to-gray-900 shadow-lg z-50" style={{display: 'block', width: '100%'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Branding */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="./tutorsimula-logo-purple.png"
                alt="TutorSimula Logo"
                className="h-6 w-auto mr-2"
                onError={(e) => { console.error('NavBar logo failed to load'); e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='; }}
              />
              <span className="text-2xl font-bold text-white">TutorSimula</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-glow-blue hover:shadow-glow-blue"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-glow-blue hover:shadow-glow-blue"
            >
              About
            </Link>
            <Link
              to="/programs"
              className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-glow-blue hover:shadow-glow-blue"
            >
              Programs
            </Link>
            <Link
              to="/help"
              className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-glow-blue hover:shadow-glow-blue"
            >
              Help
            </Link>

            {/* Conditional Buttons */}
            {user ? (
              <button
                onClick={handleSignOut}
                className="bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg hover:from-red-700 hover:to-red-900 transform hover:scale-105 transition-all duration-300 shadow-glow-red"
              >
                Sign Out
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSignIn}
                  className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 transition-all duration-300 shadow-glow-blue"
                >
                  Sign In
                </button>
                <button
                  onClick={handleSignUp}
                  className="bg-gradient-to-r from-green-600 to-green-800 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg hover:from-green-700 hover:to-green-900 transform hover:scale-105 transition-all duration-300 shadow-glow-green"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-200 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 shadow-glow-blue hover:shadow-glow-blue"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 shadow-glow-blue hover:shadow-glow-blue"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                to="/programs"
                className="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 shadow-glow-blue hover:shadow-glow-blue"
                onClick={toggleMenu}
              >
                Programs
              </Link>
              <Link
                to="/help"
                className="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 shadow-glow-blue hover:shadow-glow-blue"
                onClick={toggleMenu}
              >
                Help
              </Link>

              {/* Conditional Buttons for Mobile */}
              {user ? (
                <button
                  onClick={() => {
                    handleSignOut();
                    toggleMenu();
                  }}
                  className="bg-gradient-to-r from-red-600 to-red-800 text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:from-red-700 hover:to-red-900 transition-all duration-300 shadow-glow-red"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      handleSignIn();
                      toggleMenu();
                    }}
                    className="bg-gradient-to-r from-blue-600 to-blue-800 text-white block px-3 py-2 rounded-md text-base font-medium hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-glow-blue"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      handleSignUp();
                      toggleMenu();
                    }}
                    className="bg-gradient-to-r from-green-600 to-green-800 text-white block px-3 py-2 rounded-md text-base font-medium hover:from-green-700 hover:to-green-900 transition-all duration-300 shadow-glow-green"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;