import { Separator } from "@/components/ui/separator";
import { LuFuel } from "react-icons/lu";
import { TbBrandSpeedtest } from "react-icons/tb";
import { GiGearStickPattern } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const CarItemSearch = ({ car }) => {
  const navigate = useNavigate();

  if (!car) {
    return (
      <div className="text-center text-gray-500">No car data available.</div>
    );
  }

  const handleLinkClick = () => {
    navigate(`/car-details/${car.id}`);
  };

  return (
    <div
      onClick={handleLinkClick}
      className="shadow-lg  bg-white border flex justify-between p-2"
      aria-label={`View details for ${car?.listing_title || "Car"}`}
      role="button"
    >
      {/* Image */}
      <img
        src={car?.images?.[0] || "/path/to/default-image.jpg"}
        alt={car?.listing_title || "Car"}
        className="rounded-t-xl h-[100px] w-[150px] object-fill sm:w-full  sm:h-48  mb-4"
      />
      <div className="relative  h-[100px] rounded-2xl p-2  cursor-pointer hover:shadow-2xl transition-transform transform hover:scale-105">
        {/* New Badge */}
        {car?.isNew && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            New
          </div>
        )}

        {/* Car Title */}
        <div>
          <h2 className="font-bold text-black text-sm sm:text-lg mb-2">
            {car?.listing_title || "Unknown Car"}
          </h2>
        </div>

       
        {/* Price and View Details */}
        <div className="sm:flex items-center justify-between">
          <h2 className="font-bold sm:text-xl text-sm">
            ₹ {car?.selling_price || "Not Available"}
          </h2>

          <button className="mt-3 bg-black text-white px-3 py-1 w-full rounded-lg hover:bg-gray-800 transition-all">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarItemSearch;
