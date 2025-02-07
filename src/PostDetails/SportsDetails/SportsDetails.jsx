import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../configs";
import { SportsListing, SportsImages } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import Header from "@/Common/Header";
import ImageGallery from "./components/ImageGallery";
import SportsDescription from "./components/SportsDescription";
import Pricing from "./components/Pricing";
import OwnerDetails from "./components/OwnerDetails";
import Footer from "@/Common/Footer";

const SportsDetails = () => {
  const { id } = useParams();
  const [sports, setSports] = useState(null);

  useEffect(() => {
    const fetchSportsDetails = async () => {
      try {
        const result = await db
          .select()
          .from(SportsListing)
          .innerJoin(
            SportsImages,
            eq(SportsImages.SportsListingId, SportsListing.id)
          )
          .where(eq(SportsListing.id, id));

        if (result.length > 0) {
          setSports(result[0]);
        }
      } catch (error) {
        console.error("Error fetching sports equipment details:", error);
      }
    };

    fetchSportsDetails();
  }, [id]);

  if (!sports) {
    return <p>Loading sports equipment details...</p>;
  }

  return (
    <div className="bg-white px-3">
      <Header />
      <div className="sm:p-10 md:px-20 bg-white sm:mt-5">
        <ImageGallery sports={sports} />
        <div>
          <Pricing sports={sports} />
        </div>
        <SportsDescription sports={sports} />
        <OwnerDetails sports={sports} />
      </div>
      <Footer />
    </div>
  );
};

export default SportsDetails;
