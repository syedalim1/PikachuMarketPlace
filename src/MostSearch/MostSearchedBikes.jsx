import { useEffect, useState } from "react";
import Service from "../Shared/Service";
import { desc, eq } from "drizzle-orm";
import { db } from "../../configs";
import { BikesImages, BikesListing } from "../../configs/schema";
import BikeItem from "@/Items/BikeItem";

const MostSearchedBikes = () => {
  const [Bikelist, setBikelist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetPopularBikelist();
  }, []);

  const GetPopularBikelist = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(BikesListing)
        .leftJoin(BikesImages, eq(BikesListing.id, BikesImages.bikeslistingId))
        .orderBy(desc(BikesListing.id));

      const formattedResult = Service.BikeFormatResult(result);
      setBikelist(formattedResult);
      console.log(Bikelist);
    } catch (err) {
      setError("Failed to fetch car listings. Please try again later.");
      console.error("Error fetching car listings:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" px-4 sm:px-6 lg:px-8  bg-white ">
      {/* Section Title */}
      <h2 className="font-bold  text-xl sm:text-3xl text-center py-3  text-gray-800">
        Most Searched Bikes
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
      {!loading && !error && Bikelist.length > 0 && (
        <div className="flex flex-col mb-15">
          {/* Other content or header */}

          {/* Main Carousel Content */}
          <div className="grid grid-cols-2 gap-2">
            {/* Mapping through the car list and displaying CarItem for each */}
            {Bikelist.map((bike, index) => (
              <div className=" hover:scale-105">
                <BikeItem key={index} bike={bike} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Data Fallback */}
      {!loading && !error && Bikelist.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <p>No cars available at the moment. Please check back later.</p>
        </div>
      )}
    </div>
  );
};

export default MostSearchedBikes;
