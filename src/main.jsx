import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./Main/Home";
import { ClerkProvider } from "@clerk/clerk-react";
import SeachBycategory from "./search/[category]";
import { Toaster } from "@/components/ui/toaster";
import SearchByTarget from "./SearchByTarget";
import CarDetails from "./PostDetails/CarDetails/components/CarDetails";
import Profile from "./profile";
import ContactSeller from "./Main/contact";
import Inbox from "./profile/components/Inbox";
import MyListing from "./profile/components/MyListing";
import Selectcategorypost from "./SelectCategory/Selectcategorypost";
import CarAddListing from "./add-listing/CarAddListing";
import BikeAddListing from "./add-listing/BikeAddListing";
import CommercialAddListing from "./add-listing/CommercialAddListing";
import ElectronicsAddListing from "./add-listing/ElectronicsAddListing";
import FashionAddlisting from "./add-listing/FashionAddlisting";
import FurnitureAddlisting from "./add-listing/FurnitureAddlisting";
import JobsAddListing from "./add-listing/JobsAddListing";
import MobileAddListing from "./add-listing/MobileAddListing";
import PetsAddlisting from "./add-listing/PetsAddlisting";
import SportsAddlisting from "./add-listing/SportsAddlisting";
import MostSearchedMobile from "./MostSearch/MostSearchedMobile";
import MobileDetails from "./PostDetails/MobileDetails/components/MobileDetails";
import JobDetails from "./PostDetails/JobDetails/JobDetails";
import BikeDetails from "./PostDetails/BikeDetails/BikeDetails";

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
          <Route path="/mobile-details/:id" element={<MobileDetails />} />
          <Route path="/Jobs-details/:id" element={<JobDetails />} />
          <Route path="/bikes-details/:id" element={<BikeDetails />} />
          <Route path="/chats/:username" element={<Inbox />} />
          <Route path="/mylists/:username" element={<MyListing />} />

          <Route path="/add-listing/Cars" element={<CarAddListing />} />
          <Route path="/add-listing/Bikes" element={<BikeAddListing />} />
          <Route
            path="/add-listing/Commercial"
            element={<CommercialAddListing />}
          />
          <Route
            path="/add-listing/Electronics"
            element={<ElectronicsAddListing />}
          />
          <Route path="/add-listing/Fashion" element={<FashionAddlisting />} />
          <Route
            path="/add-listing/Furniture"
            element={<FurnitureAddlisting />}
          />
          <Route path="/add-listing/Mobiles" element={<MobileAddListing />} />
          <Route path="/add-listing/Jobs" element={<JobsAddListing />} />
          <Route path="/add-listing/Pets" element={<PetsAddlisting />} />
          <Route path="/add-listing/Sports" element={<SportsAddlisting />} />
          {/* <Route path="/search/Mobiles" element={<MostSearchedMobile />} /> */}
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ClerkProvider>
  </StrictMode>
);
