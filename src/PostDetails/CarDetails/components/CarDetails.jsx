import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { db } from "../../../../configs";
import { CarListing, CarImages } from "../../../../configs/schema";
import { eq } from "drizzle-orm";
import Header from "@/Common/Header";
import DetailHeaders from "./DetailHeaders";
import ImageGallery from "./ImageGallery";
import CarDescription from "./CarDescription";
import Pricing from "./Pricing";
import Specification from "./Specification";
import OwnerDetails from "./OwnerDetails";
import MostSearchedCar from "@/MostSearch/MostSearchedCar";
import Footer from "@/Common/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import { fadeInUp, staggerContainer, slideIn } from "@/utils/animations";
import ShareButton from "@/components/ShareButton";
import SaveButton from "@/components/SaveButton";
import CompareFeature from "@/components/CompareFeature";
import { useTheme } from "@/context/ThemeContext";
import { useNotification } from "@/components/NotificationSystem";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useTheme();
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        const result = await db
          .select()
          .from(CarListing)
          .innerJoin(CarImages, eq(CarImages.carlistingId, CarListing.id))
          .where(eq(CarListing.id, id));

        if (result.length > 0) {
          setCar(result[0]);
          addNotification("Car details loaded successfully", "success");
        } else {
          setError("Car not found!");
          addNotification("Car not found", "error");
        }
      } catch (error) {
        setError("Error fetching car details. Please try again later.");
        addNotification("Error loading car details", "error");
        console.error("Error fetching car details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id, addNotification]);

  const handleSave = (saved) => {
    addNotification(
      saved ? "Car added to favorites" : "Car removed from favorites",
      "info"
    );
  };

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
      className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white'}`}
    >
      <Header />
      <motion.div
        variants={staggerContainer}
        className="container mx-auto px-4 py-8"
      >
        <div className="flex justify-end gap-2 mb-4">
          <SaveButton itemId={id} type="car" onSave={handleSave} />
          <ShareButton
            title={car.CarListing.title}
            description={car.CarListing.description}
          />
        </div>

        <motion.div variants={fadeInUp}>
          <ImageGallery car={car} />
        </motion.div>

        <motion.div variants={slideIn} className="mt-8">
          <Pricing car={car} />
          <DetailHeaders car={car} />
        </motion.div>

        <motion.div variants={fadeInUp}>
          <CarDescription car={car} />
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Specification car={car} />
        </motion.div>

        <motion.div variants={slideIn}>
          <OwnerDetails car={car} />
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-12">
          <MostSearchedCar />
        </motion.div>
      </motion.div>

      <CompareFeature type="car" item={car.CarListing} />
      <Footer />
    </motion.div>
  );
};

export default CarDetails;
