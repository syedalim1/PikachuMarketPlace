import { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" aria-label="Home">
          <img src="/logo.png" width={150} height={100} alt="Logo" />
        </Link>

        {/* Search and Menu */}
        <div className="flex items-center gap-4">
          {/* Search Box */}
          {searchExpanded && (
            <div className="flex gap-2 animate-slide-in hidden md:flex">
              <input
                type="text"
                placeholder="Search cars..."
                className="px-4 py-2 border rounded-lg w-full"
              />
              <select className="px-2 py-2 border rounded-lg">
                <option>Price Range</option>
              </select>
            </div>
          )}

          {/* Search Icon */}
          <FiSearch
            className="text-2xl cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => setSearchExpanded(!searchExpanded)}
          />

       
        </div>
      </div>

     
    </header>
  );
};

export default Header;
