import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa"; // Importing social media icons

const Footer = () => {
  return (
    <div className="mt-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-10">
      <div className="container mx-auto px-4 text-center">
        {/* Footer Top Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold">Connect with Us</h3>
          <div className="flex justify-center gap-6 mt-4">
            {/* Social Media Icons */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xl hover:text-blue-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xl hover:text-blue-300"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xl hover:text-pink-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-xl hover:text-blue-300"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
         


        
           
    

          <div>
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <p className="mt-4">Coimbatore</p>
            <p className="mt-2">Email: SyedSyed3777@gmail.com</p>
            <p className="mt-2">Phone: +918300904920</p>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-400 pt-4 text-gray-300 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Syed Ali M Created This Website .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
