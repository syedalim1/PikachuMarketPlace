import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../../configs"; // Adjust the path to your database configuration
import { MobilesListing, MobilesImages } from "../../../../configs/schema"; // Adjust paths to schema
import { eq } from "drizzle-orm";
import Header from "@/Common/Header";
import ImageGallery from "./ImageGallery";

import Footer from "@/Common/Footer";
import MobileDescription from "./MobileDescription";
import MobileHeaders from "./MobileHeaders";
import Pricing from "./Pricing";
import MostSearchedMobile from "@/MostSearch/MostSearchedMobile";
import OwnerDetails from "./OwnerDetails";

const MobileDetails = () => {
  const { id } = useParams(); // Get car ID from the URL
  const [mobile, setMobile] = useState(null);

  useEffect(() => {
    fetchMobileDetails();
  }, [id]);

  const fetchMobileDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MobilesListing)
        .innerJoin(
          MobilesImages,
          eq(MobilesListing.id, MobilesImages.mobilelistingId)
        )
        .where(eq(MobilesListing.id, id));

      if (result.length > 0) {
        setMobile(result[0]);
        console.log(mobile,"Mobile   123" );
      } else {
        console.error("Mobile not found!");
      }
    } catch (error) {
      console.error("Error fetching car details:", error);
    }
  };

  if (!mobile) {
    return <p>Loading car details...</p>;
  }

  return (
    <div className="bg-white ">
      <Header />
      <ImageGallery mobile={mobile} />
      <MobileHeaders mobile={mobile} />
      <Pricing mobile={mobile}/>
      <MobileDescription mobile={mobile}/>
      <OwnerDetails mobile={mobile}/>
      {/* <div className="sm:p-10 md:px-20 bg-white  sm:mt-5">
        <ImageGallery mobile={mobile} />
        <div className="0">
          <Pricing mobile={mobile} />
          <DetailHeaders mobile={mobile} />
        </div>

        <CarDescription mobile={mobile} /> */}

  
      {/* <Features features={car.CarListing.features} /> */}
      {/* <Specification mobile={mobile} />
        <OwnerDetails mobile={mobile} /> */}

      {/* Right section (Pricing, Specification, Owner Details) */}
      <div className="bg-white sm:p-6 "></div>

      <MostSearchedMobile />
        <br />
        <br />
        <br />
      {/* </div> */}
      <Footer />
    </div>
  );
};

export default MobileDetails;
