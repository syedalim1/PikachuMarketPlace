import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../configs";
import { eq } from "drizzle-orm";
import Header from "@/Common/Header";
import ImageGallery from "./components/ImageGallery";
import CommercialDescription from "./components/CommercialDescription";
import Pricing from "./components/Pricing";
import OwnerDetails from "./components/OwnerDetails";
import Footer from "@/Common/Footer";
import { CommercialImages, CommercialListing } from "../../../configs/schema";

const CommercialDetails = () => {
  const { id } = useParams();
  const [commercial, setCommercial] = useState(null);
const [type, setType] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!type) {
    alert("Please select a type for the listing.");
    return;
  }

  await db.insert(CommercialListing).values({ type, ...otherFields });
};

  useEffect(() => {
    const fetchCommercialDetails = async () => {
      try {
        const result = await db
          .select()
          .from(CommercialListing)
          .innerJoin(
            CommercialImages,
            eq(CommercialImages.CommercialImageslistingId, CommercialListing.id)
          )
          .where(eq(CommercialListing.id, id));

        if (result.length > 0) {
          setCommercial(result[0]);
        }
      } catch (error) {
        console.error("Error fetching commercial details:", error);
      }
    };

    fetchCommercialDetails();
  }, [id]);

  if (!commercial) {
    return <p>Loading commercial details...</p>;
  }

  return (
    <div className="bg-white px-3">
      <Header />
      <div className="sm:p-10 md:px-20 bg-white sm:mt-5">
        <ImageGallery commercial={commercial} />
        <div>
          <Pricing commercial={commercial} />
        </div>
        <CommercialDescription commercial={commercial} />
        <OwnerDetails commercial={commercial} />
      </div>
      <Footer />
    </div>
  );
};

export default CommercialDetails;
