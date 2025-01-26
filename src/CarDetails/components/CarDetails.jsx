import  { useState, useEffect } from "react";
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
    <div className="bg-white px-3">
      <Header />
      <div className="sm:p-10 md:px-20 bg-white  sm:mt-5">
        <ImageGallery car={car} />
        <div className="0">
          <Pricing car={car} />
          <DetailHeaders car={car} />
        </div>

        <CarDescription car={car} />

        {/* Left section (Image Gallery, Description, Features, Financial Calculations) */}

        {/* <Features features={car.CarListing.features} /> */}
        <Specification car={car} />
        <OwnerDetails car={car} />

        {/* Right section (Pricing, Specification, Owner Details) */}
        <div className="bg-white sm:p-6 "></div>

        <MostSearchedCar />
      </div>
      <Footer />
    </div>
  );
};

export default CarDetails;
