import { useEffect, useState } from "react";
import CarItem from "../Items/CarItem"; // Importing the CarItem component
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Carousel components
import Service from "../Shared/Service";
import { desc, eq } from "drizzle-orm";
import { db } from "../../configs";
import { CarImages, CarListing } from "../../configs/schema";
import MobileItem from "@/Items/MobileItem";

const MostSearchedBikes = () => {
  const [carList, setCarList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetPopularCarList();
  }, []);

  const GetPopularCarList = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(CarListing)
        .leftJoin(CarImages, eq(CarListing.id, CarImages.carlistingId))
        .orderBy(desc(CarListing.id));

      const formattedResult = Service.FormatResult(result);
      setCarList(formattedResult);
      console.log(carList);
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
      {!loading && !error && carList.length > 0 && (
        <div className="flex flex-col h-screen">
          {/* Other content or header */}

          {/* Main Carousel Content */}
          <div className="grid grid-cols-2 gap-2">
            {/* Mapping through the car list and displaying CarItem for each */}
            {carList.map((mobile, index) => (
              <div className=" hover:scale-105">
                <MobileItem key={index} car={car} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Data Fallback */}
      {!loading && !error && carList.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <p>No cars available at the moment. Please check back later.</p>
        </div>
      )}
    </div>
  );
};

export default MostSearchedBikes;
