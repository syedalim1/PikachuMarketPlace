

const DetailHeaders = ({ car }) => {
  return (
    <div>
      {car.CarListing.listing_title ? (
        <div className="px-2 sm:p-6shadow-md ">
          <h2 className="font-bold text-xl sm:text-3xl">
            {car.CarListing.listing_title}
          </h2>
        </div>
      ) : (
        <div className="w-full rounded-xl  bg-slate-200 animate-pulse"></div>
      )}
    </div>
  );
};

export default DetailHeaders;
