import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../configs";
import { FurnitureListing, FurnitureImages } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import Header from "@/Common/Header";
import ImageGallery from "./components/ImageGallery";
import FurnitureDescription from "./components/FurnitureDescription";
import Pricing from "./components/Pricing";
import OwnerDetails from "./components/OwnerDetails";
import Footer from "@/Common/Footer";

const FurnitureDetails = () => {
  const { id } = useParams();
  const [furniture, setFurniture] = useState(null);

  useEffect(() => {
    const fetchFurnitureDetails = async () => {
      try {
        const result = await db
          .select()
          .from(FurnitureListing)
          .innerJoin(
            FurnitureImages,
            eq(FurnitureImages.FurnitureListingId, FurnitureListing.id)
          )
          .where(eq(FurnitureListing.id, id));

        if (result.length > 0) {
          setFurniture(result[0]);
        }
      } catch (error) {
        console.error("Error fetching furniture details:", error);
      }
    };

    fetchFurnitureDetails();
  }, [id]);

  if (!furniture) {
    return <p>Loading furniture details...</p>;
  }

  return (
    <div className="bg-white px-3">
      <Header />
      <div className="sm:p-10 md:px-20 bg-white sm:mt-5">
        <ImageGallery furniture={furniture} />
        <div>
          <Pricing furniture={furniture} />
        </div>
        <FurnitureDescription furniture={furniture} />
        <OwnerDetails furniture={furniture} />
      </div>
      <Footer />
    </div>
  );
};

export default FurnitureDetails;
