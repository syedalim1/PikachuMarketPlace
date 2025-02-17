import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { db } from "../../../configs";
import { BikesImages, BikesListing } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import Header from "@/Common/Header";
import ImageGallery from "../MobileDetails/components/ImageGallery";
import Footer from "@/Common/Footer";
import MobileDescription from "../MobileDetails/components/MobileDescription";
import MobileHeaders from "../MobileDetails/components/MobileHeaders";
import Pricing from "../MobileDetails/components/Pricing";
import OwnerDetails from "../MobileDetails/components/OwnerDetails";
import MostSearchedBikes from "@/MostSearch/MostSearchedBikes";
import LoadingSpinner from "@/components/LoadingSpinner";
import { fadeInUp, staggerContainer, scaleIn } from "@/utils/animations";

const BikeDetails = () => {
  const { id } = useParams();
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBikeDetails = async () => {
      try {
        setLoading(true);
        const result = await db
          .select()
          .from(BikesListing)
          .innerJoin(BikesImages, eq(BikesListing.id, BikesImages.bikeslistingId))
          .where(eq(BikesListing.id, id));

        if (result.length > 0) {
          setBike(result[0]);
        } else {
          setError("Bike not found!");
        }
      } catch (error) {
        setError("Error fetching bike details. Please try again later.");
        console.error("Error fetching bike details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBikeDetails();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-red-500 text-xl font-semibold"
        >
          {error}
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="bg-white min-h-screen"
    >
      <Header />
      <motion.div variants={staggerContainer} className="container mx-auto px-4 py-8">
        <motion.div variants={scaleIn}>
          <ImageGallery bike={bike} />
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-8">
          <MobileHeaders bike={bike} />
        </motion.div>

        <motion.div variants={scaleIn} className="mt-6">
          <Pricing bike={bike} />
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-8">
          <MobileDescription bike={bike} />
        </motion.div>

        <motion.div variants={scaleIn} className="mt-8">
          <OwnerDetails bike={bike} />
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-12">
          <MostSearchedBikes />
        </motion.div>
      </motion.div>
      <Footer />
    </motion.div>
  );
};

export default BikeDetails;
