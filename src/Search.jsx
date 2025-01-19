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

const Search = () => {
  const [car, setCar] = useState("");
  const [make, setMake] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div
      className="flex  gap-2 flex-row md:p-4 md:p-6  rounded-md 
      md:rounded-full  md:flex-row md:gap-10 md:px-5 items-center md:w-[100%] transition-all  hover:scale-105"
    >
      {/* Car Type Selection */}
      <Select onValueChange={(value) => setCar(value)} className="">
        <SelectTrigger className="outline-none rounded-full md:border-none md:w-full shadow-md  transition-all focus:ring-2 focus:ring-indigo-400 p-2 text-lg">
          <SelectValue placeholder="Cars" />
        </SelectTrigger>
        <SelectContent className="bg-white rounded-md shadow-lg">
          <SelectItem value="New">New</SelectItem>
          <SelectItem value="Used">Used</SelectItem>
          <SelectItem value="Certified Pre-Owned">
            Certified Pre-Owned
          </SelectItem>
        </SelectContent>
      </Select>

      <Separator
        orientation="vertical"
        className="hidden md:block bg-gradient-to-r from-red-600 to-yellow-400 mx-4"
      />

      {/* Car Make Selection */}
      <Select onValueChange={(value) => setMake(value)}>
        <SelectTrigger className="outline-none rounded-full md:border-none w-full shadow-md  transition-all focus:ring-2 focus:ring-indigo-400 p-2 text-lg">
          <SelectValue placeholder="Car Makes"  />
        </SelectTrigger>
        <SelectContent className="bg-white rounded-md shadow-lg">
          {Data.CarMakes.map((maker, index) => (
            <SelectItem key={index} value={maker.name}>
              {maker.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Separator
        orientation="vertical"
        className="hidden md:block bg-gradient-to-r from-red-600 to-yellow-400 mx-4"
      />

      {/* Price Selection */}
      <Select onValueChange={(value) => setPrice(value)}>
        <SelectTrigger className="outline-none rounded-full md:border-none w-full shadow-md  transition-all focus:ring-2 focus:ring-indigo-400 p-2 text-lg">
          <SelectValue placeholder="Pricing" />
        </SelectTrigger>
        <SelectContent className="bg-white rounded-md shadow-lg">
          {Data.Pricing.map((price, index) => (
            <SelectItem key={index} value={price.amount}>
              {price.amount}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Search Button */}
      <Link to={`/searching?cars=${car}&make=${make}&price=${price}`}>
        <FiSearch className="text-[50px] bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full p-4 hover:scale-125 transition-all cursor-pointer shadow-xl hover:shadow-2xl" />
      </Link>
    </div>
  );
};

export default Search;
