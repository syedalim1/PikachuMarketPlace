import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { FiSearch } from "react-icons/fi";
import Data from "../src/Shared/Data"; // Ensure the `Data` object is correctly imported
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input"


const Search = () => {
  const [car, setCar] = useState("");
  const [make, setMake] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div
      className="flex  gap-3 flex-row md:p-4 md:p-6  rounded-md w-[90%]
      md:rounded-full  md:flex-row md:gap-10 md:px-5 items-center md:w-[100%] transition-all  hover:scale-105"
    >
      {/* Car Type Selection */}
     
      {/* Price Selection */}
  <Input className='w-full'/>

      {/* Search Button */}
      <Link to={`/searching?cars=${car}&make=${make}&price=${price}`}>
        <FiSearch className="text-[50px] bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full p-4 hover:scale-125 transition-all cursor-pointer shadow-xl hover:shadow-2xl" />
      </Link>
    </div>
  );
};

export default Search;
