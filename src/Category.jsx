import React from "react";
import Data from "./Shared/Data";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <div className="md:mt-[200px]  bg-white ">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Browse By Type
      </h2>

      <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-6 sm:px-12 lg:px-20">
        {Data.Category.map((category, index) => (
          <div
            key={index}
            className=" p-4 flex flex-col items-center hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
          >
            <Link to={"/search/" + category.name}>
              <img
                src={category.icon}
                alt={category.name}
                className="w-14 h-14 object-contain" // Adjusting the image size
              />
              <h2 className="mt-3 text-lg text-center text-gray-700 font-semibold">
                {category.name}
              </h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
