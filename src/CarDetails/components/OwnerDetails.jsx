// import Service from "@/Shared/Service";
// import { useUser } from "@clerk/clerk-react";


// import { useNavigate } from "react-router-dom";

function OwnerDetails({ car }) {
  // const { user } = useUser();
  // const navigation = useNavigate();

  // const onMessageOwnerButtonClick = async () => {
  //   const ownerUserId = car?.CarListing.createdBy.split("@")[0];
  //   const userId = user?.primaryEmailAddress?.emailAddress.split("@")[0];

  //   try {
  //     if (!user) {
  //       console.error("User is not logged in.");
  //       return;
  //     }

  //     if (!userId || !user?.fullName || !user?.imageUrl) {
  //       console.error("User information is incomplete.");
  //       return;
  //     }

  //     const response = await Service.CreateSendBirdUser(
  //       userId,
  //       user.fullName,
  //       user.imageUrl
  //     );
  //     console.log("Response from SendBird:", response);
  //   } catch (error) {
  //     console.error("Error messaging the owner:", error);
  //   }

  //   try {
  //     console.log(ownerUserId);
  //     const response = await Service.CreateSendBirdUser(
  //       ownerUserId,
  //       car?.CarListing.username,
  //       car?.CarListing.userImageUrl
  //     ).then((resp) => {
  //       console.log(resp);
  //     });
  //   } catch (error) {}

  //   try {
  //     const response = await Service.CreateSendBirdChannel(
  //       [ownerUserId, userId],
  //       car?.CarListing.listing_title
  //     ).then((resp) => {
  //       console.log(resp);
  //       console.log(" Created Channel ");
  //       navigation("/profile");
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      
      <div className="p-4 sm:p-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-lg mt-7 md:p-10 lg:p-12">
        <div className="flex  items-center text-center gap-5">
          {/* User Image */}
          <div className="relative group">
            <img
              src={car?.CarListing?.userImageUrl || "/default-avatar.jpg"}
              alt="Owner"
              className="h-[80px] w-[80px] rounded-full border-4 border-purple-500 shadow-md transition-transform duration-300 hover:scale-105 sm:h-[70px] sm:w-[70px] md:h-[90px] md:w-[90px]"
            />
            <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 text-sm text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {car?.CarListing?.fullName || "Unknown User"}
            </span>
          </div>

          {/* User Name */}
          <h2 className="font-bold text-3xl text-blue-700 mt-4 sm:text-2xl md:text-3xl lg:text-4xl">
            {car?.CarListing?.fullName || "Unknown User"}
          </h2>
        </div>
        <div className="p-2  ">
          {/* User Details (Optional Extras) */}
          <div className="text-gray-600 flex justify-between text-sm sm:text-base md:text-lg">
            <p className="flex flex-col">
              <span className="font-semibold">Contact:</span>{" "}
              {car?.CarListing?.contact || "Not Available"}
            </p>
            <p className="flex flex-col">
              <span className="font-semibold">Location:</span>{" "}
              {car?.CarListing?.location || "Unknown Location"}
            </p>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex gap-3  justify-between mt-4">
          <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors duration-300">
            View Profile
          </button>
          <button className="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg shadow hover:bg-purple-700 transition-colors duration-300">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

export default OwnerDetails;
