import axios from "axios";

const SendBirdApplicationId = import.meta.env.VITE_SENDBIRD_APP_ID;
const SendBirdApiToken = import.meta.env.VITE_SENDBIRD_API_TOKEN;

/**
 * Format the response to structure car listings and associated images.
 * @param {Array} resp - Response array containing car listings and images.
 * @returns {Array} Formatted result array.
 */ // In Service.js or wherever FormatResult is defined
 const CarFormatResult = (resp) => {
   const result = {};
   const finalResult = [];
 
   resp.forEach((item) => {
     const listingId = item.CarListing?.id;
     if (!listingId) return;
 
     // If the listing doesn't exist yet in the result, create it
     if (!result[listingId]) {
       result[listingId] = {
         car: item.CarListing, // Store the car listing details
         images: [], // Initialize the images array
       };
     }
 
     // Check if carImages exists and has an imageUrl, then add it to the images array
     if (item.carImages?.imageUrl) {
       result[listingId].images.push(item.carImages.imageUrl); // Add the image URL to the array
     }
   });
 
   // Convert the result object into an array, combining car details and images
   Object.values(result).forEach((item) => {
     finalResult.push({
       ...item.car, // Spread the car listing details
       images: item.images, // Attach the array of images
     });
   });
 
   return finalResult; // Return the formatted result
 };
 const MobileFormatResult = (resp) => {
   const result = {};
   const finalResult = [];

   console.log("Service "+resp);
   
   resp.forEach((item) => {
     const listingId = item.MobilesListing?.id;
     if (!listingId) return;

     // If the listing doesn't exist yet in the result, create it
     if (!result[listingId]) {
       result[listingId] = {
         mobile: item.MobilesListing, // Store the mobile listing details
         images: [], // Initialize the images array
       };
     }

     // Check if mobileImages exists and has an imageUrl, then add it to the images array
     if (item.mobilesImages?.imageUrl) {
       result[listingId].images.push(item.mobilesImages.imageUrl); // Add the image URL to the array
     }
   });

   // Convert the result object into an array, combining mobile details and images
   Object.values(result).forEach((item) => {
     finalResult.push({
       ...item.mobile, // Spread the mobile listing details
       images: item.images, // Attach the array of images
     });
   });

   return finalResult; // Return the formatted result
 };
 
/**
 * Create a SendBird user.
 * @param {string} userId - The ID of the user.
 * @param {string} nickName - The nickname of the user.
 * @param {string} profileUrl - The profile URL of the user.
 * @returns {Promise} Axios POST request promise.
 */
const CreateSendBirdUser = (userId, nickName, profileUrl) => {
  return axios.post(
    `https://api-${SendBirdApplicationId}.sendbird.com/v3/users`,
    {
      user_id: userId,
      nickname: nickName,
      profile_url: profileUrl,
      issue_access_token: false,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": SendBirdApiToken,
      },
    }
  );
};

/**
 * Create a SendBird channel.
 * @param {Array} users - Array of user IDs.
 * @param {string} title - Title of the channel.
 * @returns {Promise} Axios POST request promise.
 */
const CreateSendBirdChannel = (users, title) => {
  return axios.post(
    `https://api-${SendBirdApplicationId}.sendbird.com/v3/group_channels`,
    {
      user_ids: users,
      is_distinct: true,
      name: title,
      operator_ids: [users[0]], // Assign the first user as the operator
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": SendBirdApiToken,
      },
    }
  );
};

// Export functions for use in other files
export default {
  CreateSendBirdUser,
  CreateSendBirdChannel,
  CarFormatResult,
  MobileFormatResult,
};
