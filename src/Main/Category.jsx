import Data from "../Shared/Data";
import { Link } from "react-router-dom";

const Categories1 = () => {
  return (
    <div className="md:mt-[200px] bg-white">
      {/* Section Title */}

      {/* Categories Rows */}
      <div className="flex flex-col  px-6 sm:px-12 lg:px-20">
        <h2 className="text-2xl font-bold text-start  mb-6 text-gray-800">
          Category
        </h2>
        {/* First Categories Row */}
        <div className="flex justify-between scrollbar-hide gap-6">
          {Data.Categories1.map((category, index) => (
            <div
              key={index}
              className="w-13 h-15  flex gap-2 items-center justify-between  hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer rounded-lg"
            >
              <Link to={`/search/${category.name}`}>
                <div className="flex flex-col items-center">
                  <div className="text-xl text-white bg-blue-500 p-2 rounded-full">
                    {category.icon}
                  </div>
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
