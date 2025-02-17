import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { db } from "../../../../configs";
import { MobilesListing, MobilesImages } from "../../../../configs/schema";
import { eq } from "drizzle-orm";
import Header from "@/Common/Header";
import ImageGallery from "./ImageGallery";
import Footer from "@/Common/Footer";
import MobileDescription from "./MobileDescription";
import MobileHeaders from "./MobileHeaders";
import Pricing from "./Pricing";
import MostSearchedMobile from "@/MostSearch/MostSearchedMobile";
import OwnerDetails from "./OwnerDetails";
import LoadingSpinner from "@/components/LoadingSpinner";
import { fadeInUp, staggerContainer, bounceIn } from "@/utils/animations";

const MobileDetails = () => {
  const { id } = useParams();
  const [mobile, setMobile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMobileDetails = async () => {
      try {
        setLoading(true);
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
        } else {
          setError("Mobile device not found!");
        }
      } catch (error) {
        setError("Error fetching mobile details. Please try again later.");
        console.error("Error fetching mobile details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMobileDetails();
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
        <motion.div variants={fadeInUp}>
          <ImageGallery mobile={mobile} />
        </motion.div>

        <motion.div variants={bounceIn} className="mt-8">
          <MobileHeaders mobile={mobile} />
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-6">
          <Pricing mobile={mobile} />
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-8">
          <MobileDescription mobile={mobile} />
        </motion.div>

        <motion.div variants={bounceIn} className="mt-8">
          <OwnerDetails mobile={mobile} />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="mt-12"
        >
          <MostSearchedMobile />
        </motion.div>
      </motion.div>
      <Footer />
    </motion.div>
  );
};

export default MobileDetails;
