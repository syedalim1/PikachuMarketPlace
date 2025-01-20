import { Button } from "@/components/ui/button";
import Service from "@/Shared/Service";
import { useUser } from "@clerk/clerk-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function OwnerDetails({ car }) {
  const { user } = useUser();
  const navigation = useNavigate();

  const onMessageOwnerButtonClick = async () => {
    const ownerUserId = car?.CarListing.createdBy.split("@")[0];
    const userId = user?.primaryEmailAddress?.emailAddress.split("@")[0];

    try {
      if (!user) {
        console.error("User is not logged in.");
        return;
      }

      if (!userId || !user?.fullName || !user?.imageUrl) {
        console.error("User information is incomplete.");
        return;
      }

      const response = await Service.CreateSendBirdUser(
        userId,
        user.fullName,
        user.imageUrl
      );
      console.log("Response from SendBird:", response);
    } catch (error) {
      console.error("Error messaging the owner:", error);
    }

    try {
      console.log(ownerUserId);
      const response = await Service.CreateSendBirdUser(
        ownerUserId,
        car?.CarListing.username,
        car?.CarListing.userImageUrl
      ).then((resp) => {
        console.log(resp);
      });
    } catch (error) {}

    try {
      const response = await Service.CreateSendBirdChannel(
        [ownerUserId, userId],
        car?.CarListing.listing_title
      ).then((resp) => {
        console.log(resp);
        console.log(" Created Channel ");
        navigation("/profile");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-2 sm:p-8    sm:mt-7  s md:p-8 lg:p-10">
      <div className="flex items-center px-5 justify-start gap-5">
        
        <img
          src={car?.CarListing?.userImageUrl || "/default-avatar.jpg"}
          alt="Owner"
          className="h-[80px] w-[80px] rounded-full  border-4 border-purple-500 shadow-md sm:h-[60px] sm:w-[60px] md:h-[80px] md:w-[80px]"
        />
        <h2 className="font-bold text-sm  mt-4 text-blue-700 sm:text-xl md:text-2xl">
          {car?.CarListing?.fullName || "Unknown User"}
        </h2>
      </div>
    
    </div>
  );
}

export default OwnerDetails;
