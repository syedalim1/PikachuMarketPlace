import { db } from "./configs/db.js"; // Ensure the correct file path
import { CarListing, CarImages } from "./configs/schema.js"; // Ensure the correct file path

import moment from "moment";

const createDummyData = async () => {
  const dummyListings = [
    {
      fullName: "Admin User",
      listing_title: "Tesla Model S",
      tagline: "Experience the future of driving",
      original_price: "85000",
      selling_price: "80000",
      category: "Electric",
      condition: "New",
      make: "Tesla",
      model: "Model S",
      year: "2023",
      drive_type: "AWD",
      transmission: "Automatic",
      fuel_type: "Electric",
      mileage: "0",
      engine_size: "0",
      cylinder: "0",
      color: "Red",
      door: "4",
      offer_type: "For Sale",
      vin: "TESLA2023001",
      listing_description:
        "An electric car with top-notch performance and technology.",
      features: JSON.stringify({
        sunroof: true,
        autopilot: true,
        heatedSeats: true,
      }),
      createdBy: "admin@example.com",
      userName: "admin",
      userimageurl: "https://example.com/user1.jpg",
      postedOn: moment().format("DD/MM/yyyy"),
    },
    // Add more objects with all required fields...
  ];


  try {
    for (const listing of dummyListings) {
      // Insert data into CarListing
      const result = await db.insert(CarListing).values(listing).returning({ id: CarListing.id });
      const carListingId = result[0]?.id;

      // Insert a default image for the listing
      if (carListingId) {
        await db.insert(CarImages).values({
          carlistingId: carListingId,
          imageUrl: "https://example.com/default-image.jpg",
        });
      }
    }
    console.log("Dummy data inserted successfully.");
  } catch (error) {
    console.error("Error inserting dummy data:", error);
  }
};

createDummyData();


