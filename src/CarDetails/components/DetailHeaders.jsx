import React from "react";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { IoSpeedometerSharp } from "react-icons/io5";
import { GiGearStickPattern } from "react-icons/gi";
import { FaGasPump } from "react-icons/fa6";

const DetailHeaders = ({ car }) => {
  return (
    <div>
      {car.CarListing.listing_title ? (
        <div className="p-2 sm:p-6shadow-md ">
          <h2 className="font-bold text-xl sm:text-3xl">
            {car.CarListing.listing_title}
          </h2>
          <p className="text-sm text-gray-600">{car.CarListing.tagline}</p>
          <div className="flex  sm:gap-4 mt-4 sm:flex-wrap sm:justify-start justify-between">
            <div className="flex gap-2 items-center sm:bg-blue-100 rounded-full sm:p-3">
              <BsFillCalendar2WeekFill className="sm:h-7 sm:w-7 h-4 w-4  sm:text-blue-700" />
              <h2 className=" sm:text-blue-700 text-[10px] sm:text-sm">
                {car.CarListing?.year}
              </h2>
            </div>
            <div className="flex gap-2 items-center sm:bg-blue-100 rounded-full p-3">
              <IoSpeedometerSharp className="sm:h-7 sm:w-7 h-4 w-4  sm:text-blue-700" />
              <h2 className=" sm:text-blue-700 text-sm">
                {car.CarListing?.mileage}
              </h2>
            </div>
            <div className="flex gap-2 items-center sm:bg-blue-100 rounded-full p-3">
              <GiGearStickPattern className="sm:h-7 sm:w-7 h-4 w-4  sm:text-blue-700" />
              <h2 className=" sm:text-blue-700 text-sm">
                {car.CarListing?.transmission || "Not Mentied"}
              </h2>
            </div>
            <div className="flex gap-2 items-center sm:bg-blue-100 rounded-full p-3">
              <FaGasPump className="sm:h-7 sm:w-7 h-4 w-4  sm:text-blue-700" />
              <h2 className=" sm:text-blue-700 text-sm">
                {car.CarListing?.fuel_type || "Not Mentied"}
              </h2>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full rounded-xl  bg-slate-200 animate-pulse"></div>
      )}
    </div>
  );
};

export default DetailHeaders;
