import { useUser } from "@clerk/clerk-react";
import React from "react";
import { FaHome, FaComments, FaTag, FaAd, FaUserCircle } from "react-icons/fa"; // Importing Font Awesome icons
import { Link } from "react-router-dom";

const Footer = () => {
  const { user } = useUser();

  // Safely retrieve username or fallback to a default value
  const username = user?.username || "guest";

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white p-3 flex justify-between items-center text-black px-5 shadow-lg border-t">
      {/* Home */}
      <Link to={"/"}>
        <div className="flex flex-col items-center cursor-pointer hover:text-blue-500">
          <FaHome className="text-2xl mb-1" />
          <span>Home</span>
        </div>
      </Link>

      {/* Chats */}
      <Link to={`/chats/${username}`}>
        <div className="flex flex-col items-center cursor-pointer hover:text-blue-500">
          <FaComments className="text-2xl mb-1" />
          <span>Chats</span>
        </div>
      </Link>

      {/* Sell */}
      <Link to={"/add-listing"}>
        <div className="flex flex-col items-center cursor-pointer">
          <div className="bg-red-500 border-2 border-black rounded-full h-12 w-12 flex justify-center items-center">
            <FaTag className="text-white text-xl" />
          </div>
          <span>Sell</span>
        </div>
      </Link>

      {/* My Ads */}
      <Link to={`/mylists/${username}`}>
        <div className="flex flex-col items-center cursor-pointer hover:text-blue-500">
          <FaAd className="text-2xl mb-1" />
          <span>My Ads</span>
        </div>
      </Link>

      {/* Account */}
      <Link to={"/profile"}>
        <div className="flex flex-col items-center cursor-pointer hover:text-blue-500">
          <FaUserCircle className="text-2xl mb-1" />
          <span>Account</span>
        </div>
      </Link>
    </div>
  );
};

export default Footer;
