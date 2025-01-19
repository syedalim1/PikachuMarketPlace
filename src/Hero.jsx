import Search from "./Search";

const Hero = () => {
  return (
    <div className="flex flex-col items-center sm:p-10 sm:py-20 gap-6 sm:h-[650px] w-full bg-white py-5">
      <h2 className="text-xl font-bold sm:text-lg">
        Find cars for sale and for rent near you
      </h2>

      <h1 className="text-2xl sm:text-[60px] font-bold">Find Your Dream Car</h1>
      <Search />
      <img src="./tesla.png" alt="demo car" className="mt-10 sm:mb-10" />
    </div>
  );
};

export default Hero;
