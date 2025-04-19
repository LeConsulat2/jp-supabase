// src/components/Navbar.tsx
import { useState } from 'react';

interface NavbarProps {
  setPage: (page: string) => void;
}

export const Navbar = ({ setPage }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (page: string) => {
    setPage(page);
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-xl font-bold text-indigo-600">We-Create</div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 text-sm font-medium">
            <button
              onClick={() => handleClick('home')}
              className="hover:text-indigo-600"
            >
              Home
            </button>
            <button
              onClick={() => handleClick('create')}
              className="hover:text-indigo-600"
            >
              Create Post
            </button>
            <button
              onClick={() => handleClick('communities')}
              className="hover:text-indigo-600"
            >
              Communities
            </button>
            <button
              onClick={() => handleClick('community/create')}
              className="hover:text-indigo-600"
            >
              Create Community
            </button>
          </div>

          {/* Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl text-gray-700 focus:outline-none"
            >
              {menuOpen ? '✖' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <button
            onClick={() => handleClick('home')}
            className="block w-full text-left py-2 text-gray-700 hover:text-indigo-600"
          >
            Home
          </button>
          <button
            onClick={() => handleClick('create')}
            className="block w-full text-left py-2 text-gray-700 hover:text-indigo-600"
          >
            Create Post
          </button>
          <button
            onClick={() => handleClick('communities')}
            className="block w-full text-left py-2 text-gray-700 hover:text-indigo-600"
          >
            Communities
          </button>
          <button
            onClick={() => handleClick('community/create')}
            className="block w-full text-left py-2 text-gray-700 hover:text-indigo-600"
          >
            Create Community
          </button>
        </div>
      )}
    </nav>
  );
};
