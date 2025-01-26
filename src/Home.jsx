
import {
  SignedIn,

} from "@clerk/clerk-react";
import Header from "./Common/Header";
import Hero from "./Hero";
import Category from "./Category";
import MostSearchedCar from "./MostSearchedCar";
import Footer from "./Common/Footer";
import Map from "./Map";


function Home() {
  return (
    // Header
    <div>
      <Header />
      <Hero />
      <Map/>
      <Category />
      <MostSearchedCar />
      {/* <InfoSection /> */}
      <Footer />
      <SignedIn />
    </div>
    // Hero
  );
}

export default Home;
