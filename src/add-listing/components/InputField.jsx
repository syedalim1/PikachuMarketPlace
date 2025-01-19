import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React from "react";

const InputField = ({ item, handleInputChanges, carInfo }) => {
  return (
    <div>
      {/* Corrected Label */}

      {/* Corrected Input Field */}
      <Input
        id={item?.name}
        type={item?.fieldType}
        name={item?.name}
        required={item?.required}
        onChange={(e) => handleInputChanges(item.name, e.target.value)}
        defaultValue={carInfo?.[item.name]}
        placeholder={item?.placeholder}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        
      />
    </div>
  );
};

export default InputField;
