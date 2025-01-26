import Data from "./Shared/Data";
import { Link } from "react-router-dom";

const Categories1 = () => {
  return (
    <div className="md:mt-[200px] bg-white">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Browse By Type
      </h2>

      {/* Categories Rows */}
      <div className="flex flex-col gap-6 px-6 sm:px-12 lg:px-20">
        {/* First Categories Row */}
        <div className="flex overflow-x-auto scrollbar-hide gap-6">
          {Data.Categories1.map((category, index) => (
            <div
              key={index}
              className="w-20 h-20 p-6 flex flex-col items-center justify-center  hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer rounded-lg"
            >
              <Link to={`/search/${category.name}`}>
                <div className="flex flex-col items-center">
                  <div className="text-3xl text-gray-600">{category.icon}</div>
                  <h2 className="mt-4 text-sm text-center text-gray-700 font-semibold">
                    {category.name}
                  </h2>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Second Categories Row */}
        <div className="flex overflow-x-auto scrollbar-hide gap-6">
          {Data.Categories2.map((category, index) => (
            <div
              key={index}
              className="w-20 h-20 p-6 flex flex-col items-center justify-center  hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer rounded-lg"
            >
              <Link to={`/search/${category.name}`}>
                <div className="flex flex-col items-center">
                  <div className="text-3xl text-gray-600">{category.icon}</div>
                  <h2 className="mt-4 text-sm text-center text-gray-700 font-semibold">
                    {category.name}
                  </h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories1;
