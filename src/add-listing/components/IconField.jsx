import React from "react";
import {
  FaClipboardList,
  FaDollarSign,
  FaMoneyBillAlt,
  FaCar,
  FaCheckCircle,
  FaIndustry,
  FaCarSide,
  FaCalendarAlt,
  FaRoad,
  FaCogs,
  FaGasPump,
  FaTachometerAlt,
  FaWrench,
  FaCircle,
  FaPalette,
  FaDoorClosed,
  FaIdCard,
  FaTags,
  FaFileAlt,
  FaMobileAlt,
} from "react-icons/fa";

// Map all icons based on their string keys
const iconMap = {
  
};

function IconField({ iconName }) {
  return <div className="text-lg">{iconMap[iconName] }</div>;
}

export default IconField;
