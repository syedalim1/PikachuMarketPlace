const MobileHeaders = ({ mobile, job }) => {
  return (
    <div>
      {mobile?.MobilesListing?.brand ? (
        <div className="px-2 sm:p-6shadow-md ">
          <h2 className="font-bold text-xl sm:text-3xl">
            {mobile.MobilesListing.brand}
          </h2>
        </div>
      ) : job?.Jobs?.company ? (
        <div className="px-2 sm:p-6shadow-md ">
          <h2 className="font-bold text-xl sm:text-3xl">{job.Jobs.company}</h2>
        </div>
      ) : (
        <div className="w-full rounded-xl  bg-slate-200 animate-pulse"></div>
      )}
    </div>
  );
};

export default MobileHeaders;
