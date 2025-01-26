import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { db } from "../../configs"; // Ensure correct path to your database configuration
import { CarListing, CarImages } from "../../configs/schema"; // Correct paths to schema
import { eq } from "drizzle-orm";
import CarItem from "@/CarItem";
import Service from "../Shared/Service"; // Ensure correct path to Service
import Header from "@/Common/Header";
import Footer from "@/Common/Footer";
import CarItemSearch from "@/search/[category]/CarItemSearch";

const SearchByTarget = () => {
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState([]);

  const condition = searchParams.get("cars");
  const make = searchParams.get("make");
  const price = searchParams.get("price");

  useEffect(() => {
    const getCarResult = async () => {
      try {
        const query = db
          .select()
          .from(CarListing)
          .innerJoin(CarImages, eq(CarImages.carlistingId, CarListing.id));

        // Apply conditional filters
        if (condition) query.where(eq(CarListing.condition, condition));
        if (make) query.where(eq(CarListing.make, make));
        if (price) query.where(lte(CarListing.price, Number(price)));
        // Modify this logic as per your schema

        const result = await query;
        const formattedResult = Service.FormatResult(result);
        setCars(formattedResult);
        console.log("Fetched results:", formattedResult);
      } catch (error) {
        console.error("Error fetching car results:", error);
      }
    };

    getCarResult();
  }, [condition, make, price]);

  return (
    <div className="">
      <Header />
      {cars.length > 0 ? (
        <div className="p-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7">
          {cars.map((item, index) => (
            <div key={index}>
              <CarItemSearch car={item} />
            </div>
          ))}
        </div>
      ) : (
        <p>No cars found matching the criteria.</p>
      )}

      <Footer/>
    </div>
  );
};

export default SearchByTarget;
