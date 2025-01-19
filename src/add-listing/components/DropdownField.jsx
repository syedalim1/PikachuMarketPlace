import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DropdownField = ({ item, handleInputChanges, carInfo }) => {
  // Validate `item` properties
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

  return (
    <div className="dropdown-field">
      {/* Dropdown field for selecting options */}
      <Select
        onValueChange={(value) => handleInputChanges(item.name, value)}
        defaultValue={carInfo?.[item.name] || ""}
        required={item.required || false}
      >
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={
              carInfo?.[item.name] || item.label || "Select an option"
            }
          />
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
