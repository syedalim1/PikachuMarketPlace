import { useNavigate } from "react-router-dom";

const JobItemSearch = ({ job }) => {
  const navigate = useNavigate();

  console.log(job + " is Details");

  if (!job) {
    return (
      <div className="text-center text-gray-500">No job data available.</div>
    );
  }

  const handleLinkClick = () => {
    navigate(`/Jobs-details/${job.id}`);
  };

  return (
    <div
      onClick={handleLinkClick}
      className="shadow-lg  bg-white border flex justify-between p-2"
      aria-label={`View details for ${job?.listing_title || "job"}`}
      role="button"
    >
      {/* Image */}
      <img
        src={job?.images?.[0] || "/path/to/default-image.jpg"}
        alt={job?.listing_title || "job"}
        className="rounded-t-xl h-[100px] w-[150px] object-contain sm:w-full  sm:h-48  mb-4"
      />
      <div className="relative  h-[100px] rounded-2xl p-2  cursor-pointer hover:shadow-2xl transition-transform transform hover:scale-105">
        {/* New Badge */}
        {job?.isNew && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            New
          </div>
        )}

        {/* job Title */}
        <div>
          <h2 className="font-bold text-black text-sm sm:text-lg mb-2">
            {job?.title
              ? job.title.length > 10
                ? job.title.substring(0, 10) + "..."
                : job.title
              : "Unknown job"}
          </h2>
        </div>

        {/* salary and View Details */}
        <div className="sm:flex items-center justify-between">
          <h2 className="font-bold sm:text-xl text-sm">
            ₹ {job?.salary || "Not Available"}
          </h2>

          <button className="mt-3 bg-black text-white px-3 py-1 w-full rounded-xl hover:bg-gray-800 transition-all">
            <p className="font-bold text-sm">View Details</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobItemSearch;
