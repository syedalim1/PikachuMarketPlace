import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <Link to={"/"} aria-label="Home">
          <img src="/logo.png" width={150} height={100} alt="Logo" />
        </Link>

        {/* Navigation for larger screens */}
        <nav className="hidden md:flex gap-8">
          <Link
            to={"/"}
            className="font-medium hover:scale-105 transition-transform hover:text-primary"
          >
            Home
          </Link>
          <Link
            to={"/contact"}
            className="font-medium hover:scale-105 transition-transform hover:text-primary"
          >
            Contact Us
          </Link>
        </nav>

        {/* Hamburger Menu for mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            className="text-2xl"
          >
            {menuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>

        {/* Sign In/Sign Out and UserButton */}
        <div className="hidden md:flex items-center gap-4">
          <SignedIn>
            <UserButton />
            <Link to={"/profile"}>
              <Button className="hover:scale-110 hover:text-black hover:bg-white transition-transform text-white bg-black">
                Profile
              </Button>
            </Link>
            <Link to={"/add-listing"}>
              <Button className="hover:scale-110 hover:text-black hover:bg-white transition-transform text-white bg-black">
                Submit Listing
              </Button>
            </Link>
            <SignOutButton>
              <Button className="hover:scale-110 hover:text-black hover:bg-white transition-transform text-white bg-black">
                Sign Out
              </Button>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button className="hover:scale-110 hover:text-black hover:bg-white transition-transform text-white bg-black">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col gap-4 p-4">
            <Link
              to={"/"}
              className="font-medium hover:scale-105 transition-transform hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to={"/searching"}
              className="font-medium hover:scale-105 transition-transform hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              Searching
            </Link>
          
            <Link
              to={"/contact"}
              className="font-medium hover:scale-105 transition-transform hover:text-primary"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>
            <SignedIn>
              <Link to={"/profile"}>
                <Button className="w-full hover:scale-105 hover:text-black hover:bg-white transition-transform text-white bg-black">
                  Profile
                </Button>
              </Link>
              <Link to={"/add-listing"}>
                <Button className="w-full hover:scale-105 hover:text-black hover:bg-white transition-transform text-white bg-black">
                  Submit Listing
                </Button>
              </Link>
              <SignOutButton>
                <Button className="w-full hover:scale-105 hover:text-black hover:bg-white transition-transform text-white bg-black">
                  Sign Out
                </Button>
              </SignOutButton>
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button className="w-full hover:scale-105 hover:text-black hover:bg-white transition-transform text-white bg-black">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
