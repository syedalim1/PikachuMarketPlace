

const MobileHeaders = ({ mobile }) => {
  return (
    <div>
      {mobile.MobilesListing.brand ? (
        <div className="px-2 sm:p-6shadow-md ">
          <h2 className="font-bold text-xl sm:text-3xl">
            {mobile.MobilesListing.brand}
          </h2>
        </div>
      ) : (
        <div className="w-full rounded-xl  bg-slate-200 animate-pulse"></div>
      )}
    </div>
  );
};

export default MobileHeaders;
