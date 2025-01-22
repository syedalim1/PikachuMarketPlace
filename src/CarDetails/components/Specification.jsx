import IconField from "@/add-listing/components/IconField";
import CarSpecification from "@/Shared/CarSpecification";
import React from "react";

function Specification({ car }) {
  console.log(car);

  return (
    <div className="p-2 sm:p-8  bg-white shadow-xl border py-2 sm:mt-7 mt-2  ">
      <h2 className="font-semibold sm:text-3xl text-xl text-purple-700 mb-6">
        Specifications
      </h2>
      {car ? (
        CarSpecification.map((item, index) => (
          <div key={index} className=" p-2">
            <div className="mt-2 flex items-center justify-between sm:shadow-sm  rounded-lg  ">
              <h2 className="flex items-center gap-3 text-lg text-blue-600">
                <IconField
                  iconName={item.icon}
                  className="text-blue-500 text-2xl"
                />
                <p className="text-sm sm:text-lg"> {item.label}</p>
              </h2>
              <h2 className="font-medium text-gray-700 text-sm sm:text-lg">
                {car.CarListing[item.name] || "N/A"}
              </h2>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full h-[500px] rounded-xl bg-gray-300 animate-pulse"></div>
      )}
    </div>
  );
}

export default Specification;
