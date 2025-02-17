import { useEffect, useState, Suspense } from "react";
import { SignedIn } from "@clerk/clerk-react";
import Header from "../Common/Header";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Category from "./Category";
// import Maps from "./Maps";



import LoadingSpinner from "../Common/LoadingSpinner";
import ErrorBoundary from "../Common/ErrorBoundary";
import useTheme from "../hooks/useTheme";
import MostSearchedCar from "@/MostSearch/MostSearchedCar";
import MostSearchedMobile from "@/MostSearch/MostSearchedMobile";
import MostSearchedJobs from "@/MostSearch/MostSearchedJobs";
import MostSearchedBikes from "@/MostSearch/MostSearchedBikes";
import Footer from "@/Common/Footer";
// import ScrollToTop from "../Common/ScrollToTop";

function Home() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  if (isLoading) {
    return (
      <motion.div
        className="h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <LoadingSpinner />
      </motion.div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        <motion.div
          className={`overflow-hidden min-h-screen ${
            theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
          }`}
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Theme Toggle */}
          <motion.button
            className="fixed top-4 right-4 z-50 p-2 rounded-full bg-opacity-80 backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </motion.button>

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <Header />
          </motion.div>

          {/* Category Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          >
            <Category />
          </motion.div>

          {/* Main Content Section */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="container mx-auto px-4 py-8"
          >
            <Suspense fallback={<LoadingSpinner />}>
              <motion.div variants={itemVariants} className="mb-8">
                {/* <Maps onLoad={() => setMapLoaded(true)} loading={!mapLoaded} /> */}
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="mb-8"
              >
                <MostSearchedCar />
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="mb-8"
              >
                <MostSearchedMobile />
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="mb-8"
              >
                <MostSearchedJobs />
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="mb-8"
              >
                <MostSearchedBikes />
              </motion.div>
            </Suspense>
          </motion.div>

          {/* Footer Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
          >
            <Footer />
          </motion.div>

          <SignedIn />
          {/* <ScrollToTop /> */}
        </motion.div>
      </AnimatePresence>
    </ErrorBoundary>
  );
}

export default Home;
