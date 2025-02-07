import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../configs";
import { ElectronicsListing, ElectronicsImages } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import Header from "@/Common/Header";
import ImageGallery from "./components/ImageGallery";
import ElectronicsDescription from "./components/ElectronicsDescription";
import Pricing from "./components/Pricing";
import OwnerDetails from "./components/OwnerDetails";
import Footer from "@/Common/Footer";

const ElectronicsDetails = () => {
  const { id } = useParams();
  const [electronics, setElectronics] = useState(null);

  useEffect(() => {
    const fetchElectronicsDetails = async () => {
      try {
        const result = await db
          .select()
          .from(ElectronicsListing)
          .innerJoin(
            ElectronicsImages,
            eq(ElectronicsImages.ElectronicslistingId, ElectronicsListing.id)
          )
          .where(eq(ElectronicsListing.id, id));

        if (result.length > 0) {
          setElectronics(result[0]);
        }
      } catch (error) {
        console.error("Error fetching electronics details:", error);
      }
    };

    fetchElectronicsDetails();
  }, [id]);

  if (!electronics) {
    return <p>Loading electronics details...</p>;
  }

  return (
    <div className="bg-white px-3">
      <Header />
      <div className="sm:p-10 md:px-20 bg-white sm:mt-5">
        <ImageGallery electronics={electronics} />
        <div>
          <Pricing electronics={electronics} />
        </div>
        <ElectronicsDescription electronics={electronics} />
        <OwnerDetails electronics={electronics} />
      </div>
      <Footer />
    </div>
  );
};

export default ElectronicsDetails;
