import { Button } from "@/components/ui/button";
import { MdLocalOffer } from "react-icons/md";

function Pricing({ car }) {
  return (
    <div className="p-8 rounded-xl bg-white  ">
      <h2 className="text-[25px]  sm:text-2xl font-semibold text-purple-700 mb-4">
        Our Price
      </h2>
      <h2 className="font-extrabold text-[25px] sm:text-5xl text-blue-600 mb-6">
        $ {car.CarListing.selling_price}
      </h2>
      <Button className="w-full  bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl sm:py-3 px-6 sm:text-lg flex items-center justify-center gap-2 hover:from-blue-500 hover:to-purple-500 transition-all duration-300">
        <MdLocalOffer className="sm:text-2xl" />
        <p className="text-[10px] sm:text-lg">Make an Offer Price</p>
      </Button>
    </div>
  );
}

export default Pricing;
