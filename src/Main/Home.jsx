import { SignedIn } from "@clerk/clerk-react";
import Header from "../Common/Header";

import Category from "./Category";
import MostSearchedCar from "../MostSearch/MostSearchedCar";
import Footer from "../Common/Footer";
import MostSearchedMobile from "../MostSearch/MostSearchedMobile";
import MostSearchedBikes from "@/MostSearch/MostSearchedBikes";
import MostSearchedJobs from "@/MostSearch/MostSearchedJobs";
import MostSearchedElectronics from "@/MostSearch/MostSearchedElectronics";

function Home() {
  return (
    // Header
    <div>
      <Header />

      {/* <Map/> */}
      <Category />
      <div className="h-[]">
        <MostSearchedCar />
        <MostSearchedMobile />
        <MostSearchedJobs />
        <MostSearchedBikes />
      </div>

      {/* <MostSearchedElectronics/> */}
      <div className="h-20 bg-white"></div>
      <Footer />
      <SignedIn />
    </div>
    // Hero
  );
}

export default Home;
