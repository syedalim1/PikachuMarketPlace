
import { useNavigate } from "react-router-dom";

const CarItem = ({ car }) => {
  const navigate = useNavigate();
  console.log(car);
  if (!car) {
    return (
      <div className="text-center text-gray-500">No car data available.</div>
    );
  }

  const handleLinkClick = () => {
    navigate("/car-details/" + car.id || car.id); // Navigate to the details page

    setTimeout(() => {
      window.location.reload(); // Refresh after navigation
    }, 100); // Short delay to allow navigation first
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
          {car?.listing_title
            ? car.listing_title.length > 10
              ? car.listing_title.substring(0, 10) + "..."
              : car.listing_title
            : "Unknown Car"}
        </h2>
      </div>

      {/* Price and View Details */}
      <div className="sm:flex items-center justify-between">
        <h2 className="font-bold sm:text-xl text-sm">
          ₹{" "}
          {car?.selling_price
            ? car.selling_price.toString().length > 5
              ? car.selling_price.toString().slice(0, 1) +
                "," +
                car.selling_price.toString().slice(1, 3) +
                "," +
                car.selling_price.toString().slice(3)
              : car.selling_price.toString().slice(0, 2) +
                "," +
                car.selling_price.toString().slice(2)
            : "Not Available"}{" "}
        </h2>

        <button className="mt-3 bg-black text-white px-3 py-1 w-full rounded-xl hover:bg-gray-800 transition-all">
          <p className="font-bold text-sm">View Details</p>
        </button>
      </div>
    </div>
  );
};

export default CarItem;
