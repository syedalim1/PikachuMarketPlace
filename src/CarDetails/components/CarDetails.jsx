import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../configs"; // Adjust the path to your database configuration
import { CarListing, CarImages } from "../../../configs/schema"; // Adjust paths to schema
import { eq } from "drizzle-orm";
import Header from "@/Common/Header";
import DetailHeaders from "./DetailHeaders";
import ImageGallery from "./ImageGallery";
import CarDescription from "./CarDescription";
import Features from "./Features";
import Pricing from "./Pricing";
import Specification from "./Specification";
import OwnerDetails from "./OwnerDetails";
import FinancialCalculater from "./FinancialCalculater";
import MostSearchedCar from "@/MostSearchedCar";
import Footer from "@/Common/Footer";

const CarDetails = () => {
  const { id } = useParams(); // Get car ID from the URL
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const result = await db
          .select()
          .from(CarListing)
          .innerJoin(CarImages, eq(CarImages.carlistingId, CarListing.id))
          .where(eq(CarListing.id, id));

        if (result.length > 0) {
          setCar(result[0]);
          console.log(car);
        } else {
          console.error("Car not found!");
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (!car) {
    return <p>Loading car details...</p>;
  }

  return (
    <div className="bg-white">
      <Header />
      <div className="sm:p-10 md:px-20 bg-white  sm:mt-5">
        <DetailHeaders car={car} />

        <ImageGallery car={car} />
        <CarDescription car={car} />

        <div className="grid grid-cols-2 md:grid-cols-3  sm:mt-10">
          {/* Left section (Image Gallery, Description, Features, Financial Calculations) */}
          <div className="md:col-span-2 ">
            <Features features={car.CarListing.features} />
            <OwnerDetails car={car} />
          </div>

          {/* Right section (Pricing, Specification, Owner Details) */}
          <div className="bg-white sm:p-6 ">
            <Pricing car={car} />
            <Specification car={car} />
          </div>
        </div>
        <FinancialCalculater car={car} />
        <MostSearchedCar />
      </div>
      <Footer />
    </div>
  );
};

export default CarDetails;
