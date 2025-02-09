import Header from "@/Common/Header";
import Search from "@/Main/Search";
import { db } from "../../../configs";
import {
  MobilesImages,
  MobilesListing,
  CarListing,
  CarImages,
  JobsImages,
  JobsListing,
  BikesListing,
  BikesImages,
} from "../../../configs/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Service from "@/Shared/Service";
import MobileItem from "@/Items/MobileItem";
import CarItem from "@/Items/CarItem"; // Assuming CarItem component exists
import JobItem from "@/Items/JobItem";
import JobItemSearch from "./JobItemSearch";
import BikeItemSearch from "./BikeItemSearch";
import MobileSearch from "./MobileSearch";
import CarItemSearch from "./CarItemSearch";
import Footer from "@/Common/Footer";

const SeachBycategory = () => {
  const { category } = useParams();
  const [carList, setCarList] = useState([]);
  const [showNotAvailable, setShowNotAvailable] = useState(false);
  const [mobileList, setMobileList] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [bikeList, setBikeList] = useState([]);

  useEffect(() => {
    if (category === "Mobiles") {
      GetMobileResult();
    } else if (category === "Cars") {
      GetCarResult();
    } else if (category === "Jobs") {
      GetJobResult();
    } else if (category === "Bikes") {
      GetBikeResult();
    }
    const timeout = setTimeout(() => {
      setShowNotAvailable(true);
    }, 2000);
    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, [category]); // useEffect will trigger when category changes
  // Timeout for "Not Available" message (2 seconds)

  const GetCarResult = async () => {
    try {
      const result = await db
        .select()
        .from(CarListing)
        .innerJoin(CarImages, eq(CarImages.carlistingId, CarListing.id));
      const formattedCars = Service.CarFormatResult(result);
      setCarList(formattedCars);
    } catch (error) {
      console.error("Error fetching car results:", error);
    }
  };

  const GetMobileResult = async () => {
    try {
      const result = await db
        .select()
        .from(MobilesListing)
        .innerJoin(
          MobilesImages,
          eq(MobilesImages.mobilelistingId, MobilesListing.id)
        );
      const formattedMobiles = Service.MobileFormatResult(result);
      setMobileList(formattedMobiles);
    } catch (error) {
      console.error("Error fetching mobile results:", error);
    }
  };
  const GetJobResult = async () => {
    try {
      const result = await db
        .select()
        .from(JobsListing)
        .innerJoin(JobsImages, eq(JobsImages.jobslistingId, JobsListing.id));
      const formattedJob = Service.JobsFormatResult(result);
      setJobList(formattedJob);
    } catch (error) {
      console.error("Error fetching mobile results:", error);
    }
  };
  const GetBikeResult = async () => {
    try {
      const result = await db
        .select()
        .from(BikesListing)
        .innerJoin(
          BikesImages,
          eq(BikesImages.bikeslistingId, BikesListing.id)
        );

      const formattedJob = Service.BikeFormatResult(result);
      console.log("bike List ", formattedJob);
      setBikeList(formattedJob);
    } catch (error) {
      console.error("Error fetching mobile results:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="p-2 flex justify-center"></div>
      <div className="py-2 px-2 md:px-20">
        <h2 className="text-4xl font-bold capitalize">{category}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
          {/* Render Cars if available */}
          {carList.length ? (
            carList.map((car, index) => <CarItemSearch car={car} key={index} />)
          ) : mobileList.length ? (
            mobileList.map((mobile, index) => (
              <MobileSearch mobile={mobile} key={index} />
            ))
          ) : jobList.length ? (
            jobList.map((jobs, index) => (
              <JobItemSearch job={jobs} key={index} />
            ))
          ) : bikeList.length ? (
            bikeList.map((bikes, index) => (
              <BikeItemSearch bike={bikes} key={index} />
            ))
          ) : showNotAvailable ? (
            <div className="h-[370px] rounded-xl flex justify-center items-center  ">
              <h1 className="text-red-600 text-xl font-semibold">
                Not Available {category} Post
              </h1>
            </div>
          ) : (
            [1, 2, 3].map((_, index) => {
              <div
                key={index}
                className="h-[370px] rounded-xl   items-center bg-slade-200 animate-pulse"
              ></div>;
            })
          )}
          <Footer/>
        </div>
      </div>
    </div>
  );
};

export default SeachBycategory;
