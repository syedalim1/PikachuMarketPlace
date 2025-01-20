import Data from "./Shared/Data";
import { Link } from "react-router-dom";

const Categories1 = () => {
  return (
    <div className="md:mt-[200px] bg-white">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Browse By Type
      </h2>

      {/* First Categories Row */}
      <div className="flex flex-col overflow-x-auto scrollbar-hide scroll-smooth gap-6 px-6 sm:px-12 lg:px-20">
        <div className="flex">
          {Data.Categories1.map((category, index) => (
            <div
              key={index}
              className="p-4 flex flex-col items-center hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
            >
              <Link to={`/search/${category.name}`}>
                <img
                  src={category.icon}
                  alt={category.name}
                  className="w-10 h-10" // Adjusted image size
                />
                <h2 className="mt-3 text-[12px] text-center text-gray-700 font-semibold">
                  {category.name}
                </h2>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex ">
          {Data.Categories2.map((category, index) => (
            <div
              key={index}
              className="p-4 flex flex-col items-center hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
            >
              <Link to={`/search/${category.name}`}>
                <img
                  src={category.icon}
                  alt={category.name}
                  className="w-10 h-10" // Adjusted image size
                />
                <h2 className="mt-3 text-[12px] text-center text-gray-700 font-semibold">
                  {category.name}
                </h2>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Second Categories Row */}
    </div>
  );
};

export default Categories1;
