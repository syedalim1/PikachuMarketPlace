import React from "react";
import { Textarea } from "@/components/ui/textarea";

const TextAreaField = ({ item, handleInputChanges, carInfo }) => {
  return (
    <div>
      <Textarea
        onChange={(value) => handleInputChanges(item.name, value.target.value)}
        required={item.required}
        defaultValue={carInfo?.[item.name]}
      />
    </div>
  );
};

export default TextAreaField;
