function CommercialDescription({ commercial }) {
  return (
    <div>
      {commercial?.CommercialListing?.description ? (
        <div className="sm:p-8 p-2 rounded-xl bg-white sm:h-[500px]">
          <h2 className="my-4 font-semibold sm:text-2xl text-xl border-b pb-3">
            Description
          </h2>
          <div className="sm:h-[440px] overflow-y-auto scroll-smooth">
            <p className="text-[12px] sm:text-[14px]">
              {commercial.CommercialListing.description}
            </p>
          </div>
        </div>
      ) : (
        <div
          className="w-full bg-slate-200 animate-pulse rounded-xl mt-7 p-4 text-center"
          aria-hidden="true"
        >
          Loading...
        </div>
      )}
    </div>
  );
}

export default CommercialDescription;
