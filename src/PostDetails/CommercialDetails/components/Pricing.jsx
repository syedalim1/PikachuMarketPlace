import { Button } from "@/components/ui/button";
import { MdLocalOffer } from "react-icons/md";

function Pricing({ commercial }) {
  return (
    <div className="p-2 rounded-xl flex justify-between items-center bg-white">
      <div>
        <h2 className="font-extrabold text-[20px] sm:text-5xl text-blue-600">
          ₹ {commercial?.CommercialListing?.price}
        </h2>
      </div>

      <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl sm:py-3 px-6 sm:text-lg flex items-center justify-center gap-2 hover:from-blue-500 hover:to-purple-500 transition-all duration-300">
        <MdLocalOffer className="sm:text-2xl text-2xl" />
        <p className="text-xl font-bold sm:text-lg">Message</p>
      </Button>
    </div>
  );
}

export default Pricing;
