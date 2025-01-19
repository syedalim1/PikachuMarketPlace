import React from "react";
import {
  SignedIn,

} from "@clerk/clerk-react";
import Header from "./Common/Header";
import Hero from "./Hero";
import Category from "./Category";
import MostSearchedCar from "./MostSearchedCar";
import InfoSection from "./components/ui/InfoSection";
import Footer from "./Common/Footer";


function Home() {
  return (
    // Header
    <div>
      <Header />
      <Hero />
      <Category />
      <MostSearchedCar />
      <InfoSection />
      <Footer />
      <SignedIn />
    </div>
    // Hero
  );
}

export default Home;
