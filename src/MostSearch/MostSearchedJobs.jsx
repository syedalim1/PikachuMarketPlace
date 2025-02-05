import { useEffect, useState } from "react";

import Service from "../Shared/Service";
import { desc, eq } from "drizzle-orm";
import { db } from "../../configs";
import { JobsImages, JobsListing } from "../../configs/schema";
import JobItem from "@/Items/JobItem";

const MostSearchedJobs = () => {
  const [JobsList, setJobsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetPopularJobsList();
  }, []);

  const GetPopularJobsList = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(JobsListing)
        .leftJoin(JobsImages, eq(JobsListing.id, JobsImages.jobslistingId))
        .orderBy(desc(JobsListing.id));

        console.log(result);
        
      const formattedResult = Service.JobsFormatResult(result);
      setJobsList(formattedResult);
console.log(formattedResult);


      
    } catch (err) {
      setError("Failed to fetch Jobs listings. Please try again later.");
      console.error("Error fetching Jobs listings:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full  px-4 sm:px-6 lg:px-8  bg-white ">
      {/* Section Title */}
      <h2 className="font-bold  text-xl sm:text-3xl text-center py-3  text-gray-800">
        Most Searched Jobs
      </h2>

      {/* Loading State */}
      {loading && (
        <div className="text-center text-gray-500 py-8">
          <p>Loading Jobss...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center text-red-500 py-8">
          <p>{error}</p>
        </div>
      )}

      {/* Display Jobsousel if Data is Available */}
      {!loading && !error && JobsList.length > 0 && (
        <div className="flex flex-col h-screen">
          {/* Other content or header */}

          {/* Main Jobsousel Content */}
          <div className="grid grid-cols-2 gap-2">
            {/* Mapping through the Jobs list and displaying JobsItem for each */}
            {JobsList.slice(0, 4).map((Jobs, index) => (
              <div className="hover:scale-105" key={index}>
                <JobItem Jobs={Jobs} />
                
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Data Fallback */}
      {!loading && !error && JobsList.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <p>No Jobss available at the moment. Please check back later.</p>
        </div>
      )}
    </div>
  );
};

export default MostSearchedJobs;
