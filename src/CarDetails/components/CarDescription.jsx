import React from "react";

function CarDescription({ car }) {
  return (
    <div className="">
      {car.CarListing.listing_description ? (
        <div className="sm:p-8 p-2 rounded-xl bg-white  sm:h-[500px]">
          <h2 className="my-4 font-semibold sm:text-2xl text-xl border-b pb-3">
            Description
          </h2>
          <div className="max-h-[170px]  sm:h-[440px] overflow-y-auto scroll-smooth">
            {/* Ensure text scales with different screen sizes */}
            <p className="text-[12px] sm:text-[14px]">
              {car.CarListing.listing_description}
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full bg-slate-200 animate-pulse rounded-xl mt-7"></div>
      )}
    </div>
  );
}

export default CarDescription;
