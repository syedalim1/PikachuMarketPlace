import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { db } from "../../../configs";
import { JobsImages, JobsListing } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import Header from "@/Common/Header";
import ImageGallery from "../MobileDetails/components/ImageGallery";
import Footer from "@/Common/Footer";
import MobileDescription from "../MobileDetails/components/MobileDescription";
import MobileHeaders from "../MobileDetails/components/MobileHeaders";
import Pricing from "../MobileDetails/components/Pricing";
import OwnerDetails from "../MobileDetails/components/OwnerDetails";
import MostSearchedJobs from "@/MostSearch/MostSearchedJobs";
import LoadingSpinner from "@/components/LoadingSpinner";
import { fadeInUp, staggerContainer, bounceIn } from "@/utils/animations";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const result = await db
          .select()
          .from(JobsListing)
          .innerJoin(JobsImages, eq(JobsListing.id, JobsImages.jobslistingId))
          .where(eq(JobsListing.id, id));

        if (result.length > 0) {
          setJob(result[0]);
        } else {
          setError("Job not found!");
        }
      } catch (error) {
        setError("Error fetching job details. Please try again later.");
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
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
        <motion.div variants={bounceIn}>
          <ImageGallery job={job} />
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-8">
          <MobileHeaders job={job} />
        </motion.div>

        <motion.div variants={bounceIn} className="mt-6">
          <Pricing job={job} />
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-8">
          <MobileDescription job={job} />
        </motion.div>

        <motion.div variants={bounceIn} className="mt-8">
          <OwnerDetails job={job} />
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-12">
          <MostSearchedJobs />
        </motion.div>
      </motion.div>
      <Footer />
    </motion.div>
  );
};

export default JobDetails;
