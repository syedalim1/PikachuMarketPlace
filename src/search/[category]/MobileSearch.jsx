import { useNavigate } from "react-router-dom";

const MobileSearch = ({ mobile }) => {
  const navigate = useNavigate();

  console.log(mobile + " is Details");

  if (!mobile) {
    return (
      <div className="text-center text-gray-500">No mobile data available.</div>
    );
  }

  const handleLinkClick = () => {
    navigate(`/mobile-details/${mobile.id}`);
  };

  return (
    <div
      onClick={handleLinkClick}
      className="shadow-lg  bg-white border flex justify-between p-2"
      aria-label={`View details for ${mobile?.listing_title || "mobile"}`}
      role="button"
    >
      {/* Image */}
      <img
        src={mobile?.images?.[0] || "/path/to/default-image.jpg"}
        alt={mobile?.listing_title || "mobile"}
        className="rounded-t-xl h-[100px] w-[150px] object-contain sm:w-full  sm:h-48  mb-4"
      />
      <div className="relative  h-[100px] rounded-2xl p-2  cursor-pointer hover:shadow-2xl transition-transform transform hover:scale-105">
        {/* New Badge */}
        {mobile?.isNew && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            New
          </div>
        )}

        {/* mobile Title */}
        <div>
          <h2 className="font-bold text-black text-sm sm:text-lg mb-2">
            {mobile?.brand
              ? mobile.brand.length > 10
                ? mobile.brand.substring(0, 10) + "..."
                : mobile.brand
              : "Unknown mobile"}
          </h2>
        </div>

        {/* Price and View Details */}
        <div className="sm:flex items-center justify-between">
          <h2 className="font-bold sm:text-xl text-sm">
            ₹ {mobile?.price || "Not Available"}
          </h2>

          <button className="mt-3 bg-black text-white px-3 py-1 w-full rounded-xl hover:bg-gray-800 transition-all">
            <p className="font-bold text-sm">View Details</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileSearch;
