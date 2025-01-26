import Header from "@/Common/Header";
import Search from "@/Search";
import { db } from "../../../configs";
import { CarImages, CarListing } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CarItem from "@/CarItem";
import Service from "@/Shared/Service";

const SeachBycategory = () => {
  const { category } = useParams();
  const [Car, setCar] = useState([]);

  useEffect(() => {
    GetCarResult();
  }, [category]);

  const GetCarResult = async () => {
    try {
      const result = await db
        .select()
        .from(CarListing)
        .innerJoin(CarImages, eq(CarImages.carlistingId, CarListing.id))
        .where(eq(CarListing.category, category));

      const resp = Service.FormatResult(result);
      setCar(resp);
    } catch (error) {
      console.error("Error fetching car results:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="p-2 flex justify-center">
        <Search />
      </div>
      <div className="p-10 md:px-20">
        <h2 className="text-4xl font-bold capitalize">{category}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
          {Car.length > 0
            ? Car.map((item, index) => (
                <div key={index}>
                  <CarItem car={item} />
                </div>
              ))
            : [1, 2, 3, 4, 5, 6].map((_, index) => (
                <div
                  key={index}
                  className="h-[370px] rounded-xl bg-slate-200 animate-pulse"
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default SeachBycategory;
