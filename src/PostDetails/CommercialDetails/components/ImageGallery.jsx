import React from "react";

function ImageGallery({ commercial }) {
  return (
    <div>
      <img
        src={commercial?.CommercialImages?.imageUrl || "default-image-url.jpg"}
        alt="Commercial Listing"
        className="w-full h-[250px] sm:h-[400px] sm:object-cover object-contain rounded-xl"
      />
    </div>
  );
}

export default ImageGallery;
