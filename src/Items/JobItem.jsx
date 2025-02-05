import { useNavigate } from "react-router-dom";

const JobItem = ({ Jobs }) => {
  const navigate = useNavigate();

  
  if (!Jobs) {
    return (
      <div className="text-center text-gray-500">No Jobs data available.</div>
    );
  }


  const handleLinkClick = () => {
    navigate(`/Jobs-details/${Jobs.id}`);

    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div
      onClick={handleLinkClick}
      className="relative border h-[250px] rounded-2xl shadow-lg p-3 bg-white cursor-pointer hover:shadow-2xl transition-transform transform hover:scale-105"
      role="button"
      aria-label={`View details for ${Jobs?.company} ${Jobs?.company}`}
    >
      {/* New Badge */}
      {Jobs?.isNew && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 rounded">
          New
        </div>
      )}

      {/* Image */}
      <img
        src={Jobs?.images?.[0] || "/path/to/default-image.jpg"}
        alt={`${Jobs?.brand} ${Jobs?.model}`}
        className="rounded-t-xl h-[100px] w-full sm:w-full sm:h-48 object-contain mb-4"
      />

      {/* Jobs Title */}
      <div>
        <h2 className="font-bold text-black text-sm sm:text-lg mb-2">
          {Jobs?.company}
        </h2>
      </div>

      {/* Price and View Details */}
      <div className="sm:flex items-center justify-between">
        <h2 className="font-bold sm:text-xl text-sm">
          ${Jobs?.salary || "Not Available"}
        </h2>

        <button className="mt-3 bg-black text-white px-3 py-1 w-full rounded-xl hover:bg-gray-800 transition-all">
          <p className="font-bold text-sm">View Details</p>
        </button>
      </div>
    </div>
  );
};

export default JobItem;
