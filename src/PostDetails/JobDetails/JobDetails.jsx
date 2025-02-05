import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../configs"; // Adjust the path to your database configuration
import { JobsImages, JobsListing } from "../../../configs/schema"; // Adjust paths to schema
import { eq } from "drizzle-orm";
import Header from "@/Common/Header";
import ImageGallery from "../MobileDetails/components/ImageGallery";
import Footer from "@/Common/Footer";
import MobileDescription from "../MobileDetails/components/MobileDescription";
import MobileHeaders from "../MobileDetails/components/MobileHeaders";
import Pricing from "../MobileDetails/components/Pricing";
import MostSearchedMobile from "@/MostSearch/MostSearchedMobile";
import OwnerDetails from "../MobileDetails/components/OwnerDetails";

const JobDetails = () => {
  const { id } = useParams(); // Get car ID from the URL
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const result = await db
        .select()
        .from(JobsListing)
        .innerJoin(JobsImages, eq(JobsListing.id, JobsImages.jobslistingId))
        .where(eq(JobsListing.id, id));

      if (result.length > 0) {
        setJob(result[0]);
        console.log(job);
      } else {
        console.error("job not found!");
      }
    } catch (error) {
      console.error("Error fetching car details:", error);
    }
  };

  if (!job) {
    return <p>Loading car details...</p>;
  }
console.log(job);

  return (
    <div className="bg-white px-3">
      <Header />
      <ImageGallery job={job} />
      <MobileHeaders job={job} />
      <Pricing job={job} />
      <MobileDescription job={job} />
      <OwnerDetails job={job}/>

      <div className="bg-white sm:p-6 "></div>

      <MostSearchedMobile />
      <br />
      <br />
      <br />
      {/* </div> */}
      <Footer />
    </div>
  );
};

export default JobDetails;
