import Service from "@/Shared/Service";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function OwnerDetails({ commercial }) {
  const { user } = useUser();
  const navigation = useNavigate();

  const onMessageOwnerButtonClick = async () => {
    const ownerUserId = commercial.CommercialListing.createdBy.split("@")[0];
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

      await Service.CreateSendBirdUser(userId, user.fullName, user.imageUrl);
      await Service.CreateSendBirdUser(
        ownerUserId,
        commercial?.CommercialListing.username,
        commercial?.CommercialListing.userImageUrl
      );

      await Service.CreateSendBirdChannel(
        [ownerUserId, userId],
        commercial?.CommercialListing.type
      );

      navigation("/profile");
    } catch (error) {
      console.error("Error messaging the owner:", error);
    }
  };

  return (
    <div>
      <div className="p-2 sm:p-8 mb-2 sm:mt-7 md:p-8 lg:p-10">
        <h2 className="font-semibold text-center text-xl sm:text-3xl text-purple-700 mb-4">
          Owner Details
        </h2>
        <div className="flex justify-around">
          <img
            src={
              commercial?.CommercialListing?.userImageUrl ||
              "/default-avatar.jpg"
            }
            alt="Owner"
            className="h-[80px] w-[80px] rounded-full border-4 border-purple-500 shadow-md sm:h-[60px] sm:w-[60px] md:h-[80px] md:w-[80px]"
          />
          <div>
            <h2 className="font-bold text-sm mt-4 text-blue-700 sm:text-xl md:text-2xl">
              {commercial?.CommercialListing?.fullName || "Unknown User"}
            </h2>
            <h2 className="font-bold text-sm mt-4 text-blue-700 sm:text-xl md:text-2xl">
              {commercial?.CommercialListing?.location || "Unknown Location"}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerDetails;
