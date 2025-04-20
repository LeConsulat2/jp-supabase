// src/components/Navbar.tsx
import { useState } from 'react';
import { Link } from 'react-router'; // Correct import for React Router 6.x
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { signInWithGitHub, signOut, user } = useAuth();

  const displayName = user?.user_metadata.user_name || user?.email;

  console.log('Current auth state:', user);

  const handleClick = (page: string) => {
    console.log(`Link clicked: ${page}`);
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl font-semibold text-gray-800 dark:text-gray-100"
              onClick={() => handleClick('home')}
            >
              We-Create
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              onClick={() => handleClick('home')}
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="/create"
              onClick={() => handleClick('create')}
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Create Post
            </Link>
            <Link
              to="/communities"
              onClick={() => handleClick('communities')}
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Communities
            </Link>
            <Link
              to="/community/create"
              onClick={() => handleClick('community/create')}
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Create Community
            </Link>

            {user ? (
              <div className="flex items-center space-x-3">
                {user.user_metadata.avatar_url && (
                  <div className="relative">
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="avatar"
                      className="w-7 h-7 rounded-full ring-1 ring-gray-200 dark:ring-gray-700"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full ring-1 ring-white dark:ring-gray-900"></div>
                  </div>
                )}
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {displayName}
                </span>
                <button
                  onClick={signOut}
                  className="text-sm px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGitHub}
                className="text-sm px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center space-x-1.5"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>Sign in</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {menuOpen ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-200 ease-in-out ${
          menuOpen
            ? 'max-h-screen opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
          <Link
            to="/"
            onClick={() => handleClick('home')}
            className="block w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            to="/create"
            onClick={() => handleClick('create')}
            className="block w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Create Post
          </Link>
          <Link
            to="/communities"
            onClick={() => handleClick('communities')}
            className="block w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Communities
          </Link>
          <Link
            to="/community/create"
            onClick={() => handleClick('community/create')}
            className="block w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Create Community
          </Link>

          {/* Mobile Auth Section */}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
            {user ? (
              <div className="flex items-center space-x-3 px-3 py-2">
                {user.user_metadata.avatar_url && (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="avatar"
                    className="w-7 h-7 rounded-full ring-1 ring-gray-200 dark:ring-gray-700"
                  />
                )}
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {displayName}
                </span>
                <button
                  onClick={signOut}
                  className="ml-auto text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGitHub}
                className="w-full flex items-center justify-center space-x-1.5 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>Sign in with GitHub</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
