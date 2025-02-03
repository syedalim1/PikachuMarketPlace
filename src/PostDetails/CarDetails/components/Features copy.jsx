import React, { useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

function Features({ features }) {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features-section");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  // bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100
  return (
    <div className="p-5 sm:my-20 sm:mt-2   py-7">
      {/* Scroll Down Button */}

      {/* Features Section */}
      <h2 className="font-medium sm:text-2xl text-xl text-gray-800 mb-5 sticky fixed">
        Features
      </h2>
      <div
        id="features-section"
        className="flex flex-col gap-2 h-[380px] overflow-y-auto scroll-smooth"
      >
        {Object.entries(features).map(([featureKey, value]) => (
          <div
            key={featureKey}
            className=" flex gap-2 items-center cursor-pointer"
          >
            <IoMdCheckmarkCircleOutline className="text-xl" />
            <span className="text-gray-700 text-sm font-bold sm:text-xl">
              {featureKey}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
