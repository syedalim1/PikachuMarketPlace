import { FaMobileScreen } from "react-icons/fa6";
import { IoCarSportSharp } from "react-icons/io5";

import { FaMobileAlt, FaBiking, FaChair, FaDog } from "react-icons/fa";
import { MdWork, MdElectricalServices } from "react-icons/md";
import { GiCommercialAirplane, GiRunningShoe } from "react-icons/gi";

const Categories1 = [
  {
    id: 1,
    name: "Cars",
    icon: <IoCarSportSharp />, // Car-related icon
  },
  {
    id: 2,
    name: "Mobiles",
    icon: <FaMobileAlt />, // Mobile-related icon
  },
  {
    id: 3,
    name: "Jobs",
    icon: <MdWork />, // Job-related icon
  },
  {
    id: 4,
    name: "Bikes",
    icon: <FaBiking />, // Bike-related icon
  },
  {
    id: 5,
    name: "Electronics",
    icon: <MdElectricalServices />, // Electronics-related icon
  },
  {
    id: 6,
    name: "Commercial",
    icon: <GiCommercialAirplane />, // Commercial vehicle-related icon
  },
  {
    id: 7,
    name: "Furniture",
    icon: <FaChair />, // Furniture-related icon
  },
  {
    id: 8,
    name: "Fashion",
    icon: <GiRunningShoe />, // Fashion-related icon
  },
  {
    id: 9,
    name: "Sports",
    icon: <FaBiking />, // Sports-related icon
  },
  {
    id: 10,
    name: "Pets",
    icon: <FaDog />, // Pet-related icon
  },
];

const Categories2 = [
  
];

export { Categories1, Categories2 };

export default {
  Categories1,
 
};
