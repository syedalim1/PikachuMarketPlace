import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DropdownField = ({ item, handleInputChanges, carInfo, mobileInfo }) => {
  if (
    !item ||
    typeof item !== "object" ||
    !item.name ||
    !item.label ||
    !Array.isArray(item.options)
  ) {
    console.error("Invalid `item` prop passed to DropdownField:", item);
    return null;
  }

  // Determine the selected value dynamically
  const selectedValue = carInfo?.[item.name] || mobileInfo?.[item.name]  ;

  console.log("Selected Value:", selectedValue);

  return (
    <div className="dropdown-field">
      {/* Dropdown field for selecting options */}
      <Select
        onValueChange={(value) => handleInputChanges(item.name, value)}
        value={selectedValue} // Use value instead of defaultValue
        required={item.required || false}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={item.label || "Select an option"} />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {item.options.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DropdownField;
