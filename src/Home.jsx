import { SignedIn } from "@clerk/clerk-react";
import Header from "./Common/Header";

import Category from "./Category";
import MostSearchedCar from "./MostSearchedCar";
import Footer from "./Common/Footer";

function Home() {
  return (
    // Header
    <div>
      <Header />

      {/* <Map/> */}
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
