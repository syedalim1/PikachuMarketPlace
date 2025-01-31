import { useEffect, useState } from "react";
import CarItem from "./CarItem"; // Importing the CarItem component
// Carousel components
import Service from "./Shared/Service";
import { desc, eq } from "drizzle-orm";
import { db } from "../configs";
import { MobilesListing, MobilesImages } from "../configs/schema";

const MostSearchedMobile = () => {
  const [MobileList, setMobileList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetPopularMobileList();
  }, []);

  const GetPopularMobileList = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(MobilesListing)
        .leftJoin(
          MobilesImages,
          eq(MobilesListing.id, MobilesImages.mobilelistingId)
        )
        .orderBy(desc(MobilesListing.id));

      const formattedResult = Service.FormatResult(result);
      setMobileList(formattedResult);
      console.log(formattedResult);
    } catch (err) {
      setError("Failed to fetch car listings. Please try again later.");
      console.error("Error fetching car listings:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full  px-4 sm:px-6 lg:px-8  bg-white ">
      {/* Section Title */}
      <h2 className="font-bold  text-xl sm:text-3xl text-center py-3  text-gray-800">
        Most Searched Mobiles
      </h2>

      {/* Loading State */}
      {loading && (
        <div className="text-center text-gray-500 py-8">
          <p>Loading cars...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center text-red-500 py-8">
          <p>{error}</p>
        </div>
      )}

      {/* Display Carousel if Data is Available */}
      {!loading && !error && MobileList.length > 0 && (
        <div className="flex flex-col h-screen">
          {/* Other content or header */}

          {/* Main Carousel Content */}
          <div className="grid grid-cols-2 gap-2">
            {/* Mapping through the car list and displaying CarItem for each */}
            {MobileList.map((car, index) => (
              <div className=" hover:scale-105">
                <CarItem key={index} car={car} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Data Fallback */}
      {!loading && !error && MobileList.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <p>No cars available at the moment. Please check back later.</p>
        </div>
      )}
    </div>
  );
};

export default MostSearchedMobile;
