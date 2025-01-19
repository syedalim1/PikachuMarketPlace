import React, { useEffect, useState } from "react";
import CarItem from "./CarItem"; // Importing the CarItem component
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Carousel components
import Service from "./Shared/Service";
import { desc, eq } from "drizzle-orm";
import { db } from "../configs";
import { CarImages, CarListing } from "../configs/schema";

const MostSearchedCar = () => {
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
    } catch (err) {
      setError("Failed to fetch car listings. Please try again later.");
      console.error("Error fetching car listings:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8  bg-white ">
      {/* Section Title */}
      <h2 className="font-bold  text-xl sm:text-3xl text-center py-5 mb-8 text-gray-800">
        Most Searched Cars
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
        <Carousel>
          <CarouselContent className="flex flex-nowrap  g">
            {/* Mapping through the car list and displaying CarItem for each */}
            {carList.map((car, index) => (
              <CarouselItem
                className="flex-none  basis-1/2 sm:basis-1/2 md:basis-1/3 p-2 transition-transform transform hover:scale-105"
                key={index}
              >
                <CarItem car={car} />{" "}
                {/* Display each car in a carousel item */}
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Carousel Navigation Buttons */}
          <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white" />
          <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white" />
        </Carousel>
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

export default MostSearchedCar;
