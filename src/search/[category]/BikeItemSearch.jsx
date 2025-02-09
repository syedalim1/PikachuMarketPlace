import { useNavigate } from "react-router-dom";

const BikeItemSearch = ({ bike }) => {
  const navigate = useNavigate();

  console.log(bike + " is Details");

  if (!bike) {
    return (
      <div className="text-center text-gray-500">No bike data available.</div>
    );
  }

  const handleLinkClick = () => {
    navigate(`/bikes-details/${bike.id}`);
  };

  return (
    <div
      onClick={handleLinkClick}
      className="shadow-lg  bg-white border flex justify-between p-2"
      aria-label={`View details for ${bike?.listing_title || "bike"}`}
      role="button"
    >
      {/* Image */}
      <img
        src={bike?.images?.[0] || "/path/to/default-image.jpg"}
        alt={bike?.listing_title || "bike"}
        className="rounded-t-xl h-[120px] w-[180px] object-contain sm:w-full  sm:h-48  mb-4"
      />
      <div className="relative  h-[100px] rounded-2xl p-2  cursor-pointer hover:shadow-2xl transition-transform transform hover:scale-105">
        {/* New Badge */}
        {bike?.isNew && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            New
          </div>
        )}

        {/* bike brand */}
        <div>
          <h2 className="font-bold text-black text-sm sm:text-lg mb-2">
            {bike?.brand
              ? bike.brand.length > 10
                ? bike.brand.substring(0, 20) + "..."
                : bike.brand
              : "Unknown bike"}
          </h2>
        </div>

        {/* price and View Details */}
        <div className="sm:flex items-center justify-between">
          <h2 className="font-bold sm:text-xl text-sm">
            ₹ {bike?.price || "Not Available"}
          </h2>

          <button className="mt-3 bg-black text-white px-3 py-1 w-full rounded-xl hover:bg-gray-800 transition-all">
            <p className="font-bold text-sm">View Details</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BikeItemSearch;
