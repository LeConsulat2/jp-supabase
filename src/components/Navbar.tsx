import { useState } from 'react';
import { Link } from 'react-router';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <div>
        <div>
          <Link to="/">We-Create</Link>
          {/* Desktop Links */}
          <div>
            <Link to="/">Home</Link>
            <Link to="/create">Create Post</Link>
            <Link to="/communities">Communities</Link>
            <Link to="/community/create">Create Community</Link>
          </div>

          {/* Mobile Menu Button */}
          <div>
            <button onClick={() => setMenuOpen((prev) => !prev)}>Open</button>
          </div>

          {/* Mobile Links */}
          {menuOpen && (
            <div>
              <div>
                <Link to="/">Home</Link>
                <Link to="/create">Create Post</Link>
                <Link to="/communities">Communities</Link>
                <Link to="/community/create">Create Community</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
