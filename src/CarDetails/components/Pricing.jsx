import { Button } from "@/components/ui/button";
import { MdLocalOffer } from "react-icons/md";

function Pricing({ car }) {
  return (
    <div className="px-3   ">
      <h2 className="font-extrabold text-[20px] sm:text-5xl text-blue-600 ">
        $ {car.CarListing.selling_price}
      </h2>

 
    </div>
  );
}

export default Pricing;
