
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../configs"; // Adjust the path to your database configuration
import { BikesImages, BikesListing } from "../../../configs/schema"; // Adjust paths to schema
import { eq } from "drizzle-orm";
import Header from "@/Common/Header";
import ImageGallery from "../MobileDetails/components/ImageGallery";
import Footer from "@/Common/Footer";
import MobileDescription from "../MobileDetails/components/MobileDescription";
import MobileHeaders from "../MobileDetails/components/MobileHeaders";
import Pricing from "../MobileDetails/components/Pricing";
import OwnerDetails from "../MobileDetails/components/OwnerDetails";
import MostSearchedbikes from "@/MostSearch/MostSearchedbikes";

const BikeDetails = () => {
  const { id } = useParams(); // Get car ID from the URL
  const [bike, setbike] = useState(null);

  console.log(bike, " bike");

  useEffect(() => {
    fetchBikeDetails();
  }, [id]);

  const fetchBikeDetails = async () => {
    try {
      const result = await db
        .select()
        .from(BikesListing)
        .innerJoin(BikesImages, eq(BikesListing.id, BikesImages.bikeslistingId))
        .where(eq(BikesListing.id, id));

      if (result.length > 0) {
        setbike(result[0]);
        console.log(bike);
      } else {
        console.error("bike not found!");
      }
    } catch (error) {
      console.error("Error fetching car details:", error);
    }
  };

  if (!bike) {
    return <p>Loading car details...</p>;
  }
  console.log(bike);

  return (
    <div className="bg-white ">
      <Header />
      <ImageGallery bike={bike} />
      <MobileHeaders bike={bike} />
      <Pricing bike={bike} />
      <MobileDescription bike={bike} />
      <OwnerDetails bike={bike} />

      <div className="bg-white sm:p-6 "></div>

      <MostSearchedbikes />
      <br />
      <br />
      <br />
      {/* </div> */}
      <Footer />
    </div>
  );
};

export default BikeDetails;
