import { useState } from "react";

import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
 const [car, setCar] = useState("");
 const [make, setMake] = useState("");
 const [price, setPrice] = useState("");

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <Link to={"/"} aria-label="Home">
          <img src="/logo.png" width={150} height={100} alt="Logo" />
        </Link>

        <Link to={`/searching?cars=${car}&make=${make}&price=${price}`}>
          <FiSearch className="text-[50px]  text-black bg-white rounded-full p-4 hover:scale-125 transition-all cursor-pointer shadow-xl hover:shadow-2xl" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
