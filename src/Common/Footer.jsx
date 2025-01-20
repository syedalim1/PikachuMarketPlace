import React from "react";
import { FaHome, FaComments, FaTag, FaAd, FaUserCircle } from "react-icons/fa"; // Importing Font Awesome icons
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white p-3 flex justify-between items-center   text-black px-5">
      {/* Home */}
      <div className="flex flex-col items-center cursor-pointer">
        <FaHome className="text-2xl mb-2" />
        <span>Home</span>
      </div>

      {/* Chats */}
      <div className="flex flex-col items-center cursor-pointer">
        <FaComments className="text-2xl mb-2" />
        <span>Chats</span>
      </div>

      {/* Sell */}
      <div className="flex flex-col items-center  cursor-pointer">
        {/* <FaTag className="text-3xl mb-2 h-20 w-20  rounded-full border" /> */}
        <span>Sell</span>
      </div>

      {/* My Ads */}
      <div className="flex flex-col items-center cursor-pointer">
        <FaAd className="text-2xl mb-2" />
        <span>My Ads</span>
      </div>

      {/* Account */}
      <Link to={'/profile'}>
        <div className="flex flex-col items-center cursor-pointer">
          <FaUserCircle className="text-2xl mb-2" />
          <span>Account</span>
        </div>
      </Link>
    </div>
  );
};

export default Footer;
