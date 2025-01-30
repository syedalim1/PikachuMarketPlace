import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Home from "./Home";
import { ClerkProvider } from "@clerk/clerk-react";

import SeachBycategory from "./search/[category]";
import { Toaster } from "@/components/ui/toaster";
import SearchByTarget from "./SearchByTarget";
import CarDetails from "./CarDetails/components/CarDetails";
import Profile from "./profile";
import ContactSeller from "./contact";
import Inbox from "./profile/components/Inbox";
import MyListing from "./profile/components/MyListing";
import Selectcategorypost from "./SelectCategory/Selectcategorypost";
import CarAddListing from "./add-listing/CarAddListing";
import BikeAddListing from "./add-listing/BikeAddListing";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactSeller />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/select-category" element={<Selectcategorypost />} />
          <Route path="/searching" element={<SearchByTarget />} />
          <Route path="/search/:category" element={<SeachBycategory />} />
          <Route path="/car-details/:id" element={<CarDetails />} />
          <Route path="/chats/:username" element={<Inbox />} />
          <Route path="/mylists/:username" element={<MyListing />} />
          <Route path="/add-listing/Cars" element={<CarAddListing />} />
          <Route path="/add-listing/Bikes" element={<BikeAddListing />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ClerkProvider>
  </StrictMode>
);
