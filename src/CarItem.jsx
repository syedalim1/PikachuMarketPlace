import { Separator } from "@/components/ui/separator";
import { LuFuel } from "react-icons/lu";
import { TbBrandSpeedtest } from "react-icons/tb";
import { GiGearStickPattern } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const CarItem = ({ car }) => {
  const navigate = useNavigate();
  console.log("====================================");
  console.log(car);
  console.log("====================================");
  if (!car) {
    return (
      <div className="text-center text-gray-500">No car data available.</div>
    );
  }

  const handleLinkClick = () => {
    navigate("/car-details/" + car.id);
  };

  return (
    <div
      onClick={handleLinkClick}
      className="relative border h-[250px] rounded-2xl shadow-lg p-3 bg-white cursor-pointer hover:shadow-2xl transition-transform transform hover:scale-105"
      role="button"
      aria-label={`View details for ${car?.listing_title || "Car"}`}
    >
      {/* New Badge */}
      {car?.isNew && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2  rounded">
          New
        </div>
      )}

      {/* Image */}
      <img
        src={car?.images?.[0] || "/path/to/default-image.jpg"}
        alt={car?.listing_title || "Car"}
        className="rounded-t-xl h-[100px] w-full  sm:w-full  sm:h-48 object-contain mb-4"
      />

      {/* Car Title */}
      <div>
        <h2 className="font-bold text-black text-sm sm:text-lg mb-2">
          {car?.listing_title || "Unknown Car"}
        </h2>
      </div>


      {/* Price and View Details */}
      <div className="sm:flex items-center justify-between">
        <h2 className="font-bold sm:text-xl text-sm">
          ${car?.selling_price || "Not Available"}
        </h2>

        <button className="mt-3 bg-black text-white px-3 py-1 w-full rounded-lg hover:bg-gray-800 transition-all">
          View Details
        </button>
      </div>
    </div>
  );
};

export default CarItem;
