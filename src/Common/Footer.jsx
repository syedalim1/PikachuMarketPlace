import { useUser } from "@clerk/clerk-react";
import React from "react";
import { FaHome, FaComments, FaTag, FaAd, FaUserCircle } from "react-icons/fa"; // Importing Font Awesome icons
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const { user } = useUser();
  const location = useLocation();

  // Safely retrieve username or fallback to a default value
  const username = user?.username || "guest";

   return (
     <div className="fixed bottom-0 left-0 w-full bg-white py-2 flex justify-between items-center text-black px-5 shadow-lg border-t">
       {/* Home */}
       <Link to={"/"}>
         <div
           className={`flex flex-col items-center cursor-pointer hover:text-blue-500 ${
             location.pathname === "/" ? "text-red-500" : ""
           }`}
         >
           <FaHome className="text-xl mb-1" />
           <span>Home</span>
         </div>
       </Link>

       {/* Chats */}
       <Link to={`/chats/${username}`}>
         <div
           className={`flex flex-col items-center cursor-pointer hover:text-blue-500 ${
             location.pathname === `/chats/${username}` ? "text-red-500" : ""
           }`}
         >
           <FaComments className="text-xl mb-1" />
           <span>Chats</span>
         </div>
       </Link>

       {/* Sell */}
       <Link to={"/select-category"}>
         <div
           className={`flex flex-col items-center cursor-pointer ${
             location.pathname === "/select-category" ? "text-red-500" : ""
           }`}
         >
           <div className="rounded-full flex justify-center items-center">
             <FaTag className="text-black text-xl" />
           </div>
           <span>Sell</span>
         </div>
       </Link>

       {/* My Ads */}
       <Link to={`/mylists/${username}`}>
         <div
           className={`flex flex-col items-center cursor-pointer hover:text-blue-500 ${
             location.pathname === `/mylists/${username}` ? "text-red-500" : ""
           }`}
         >
           <FaAd className="text-xl mb-1" />
           <span>My Posts</span>
         </div>
       </Link>

       {/* Account */}
       <Link to={"/profile"}>
         <div
           className={`flex flex-col items-center cursor-pointer hover:text-blue-500 ${
             location.pathname === "/profile" ? "text-red-500" : ""
           }`}
         >
           <FaUserCircle className="text-xl mb-1" />
           <span>Account</span>
         </div>
       </Link>
     </div>
   );
};



export default Footer;
