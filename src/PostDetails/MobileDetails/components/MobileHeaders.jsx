const MobileHeaders = ({ mobile, job, bike }) => {
  return (
    <div>
      {mobile?.MobilesListing?.brand ||
      job?.Jobs?.company ||
      bike.Bikes.brand ? (
        <div className="px-2 sm:p-6shadow-md ">
          <h2 className="font-bold text-xl sm:text-3xl">
            {mobile?.MobilesListing?.brand ||
              job?.Jobs?.title ||
              bike?.Bikes?.brand}
          </h2>
        </div>
      ) : (
        <div className="w-full rounded-xl  bg-slate-200 animate-pulse"></div>
      )}
    </div>
  );
};

export default MobileHeaders;
