import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../configs";
import { PetsListing, PetsImages } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import Header from "@/Common/Header";
import ImageGallery from "./components/ImageGallery";
import PetsDescription from "./components/PetsDescription";
import Pricing from "./components/Pricing";
import OwnerDetails from "./components/OwnerDetails";
import Footer from "@/Common/Footer";

const PetsDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const result = await db
          .select()
          .from(PetsListing)
          .innerJoin(PetsImages, eq(PetsImages.PetsListingId, PetsListing.id))
          .where(eq(PetsListing.id, id));

        if (result.length > 0) {
          setPet(result[0]);
        }
      } catch (error) {
        console.error("Error fetching pet details:", error);
      }
    };

    fetchPetDetails();
  }, [id]);

  if (!pet) {
    return <p>Loading pet details...</p>;
  }

  return (
    <div className="bg-white px-3">
      <Header />
      <div className="sm:p-10 md:px-20 bg-white sm:mt-5">
        <ImageGallery pet={pet} />
        <div>
          <Pricing pet={pet} />
        </div>
        <PetsDescription pet={pet} />
        <OwnerDetails pet={pet} />
      </div>
      <Footer />
    </div>
  );
};

export default PetsDetails;
