import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// Ensure Clerk SDK is installed

const ProfilePage = () => {
  const { user, isLoaded } = useUser();
  const [searchParams] = useSearchParams();

  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");

  useEffect(() => {
    getUserDetails();
    console.log(user);
  }, []);

  const getUserDetails = () => {
    setEditFirstName(user.firstName || "");
    setEditLastName(user.lastName || "");
    setEditImageUrl(user.imageUrl);
  };

  const updateUser = async () => {
    try {
      await user.update({
        firstName: editFirstName,
        lastName: editLastName,
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };


  // Call the function

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Edit Profile</h1>
      <div className="flex flex-col justify-center items-center mb-6">
        <div className="relative">
          <img
            src={editImageUrl || "https://via.placeholder.com/150"} // Fallback image
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
        </div>
       
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold" htmlFor="first-name">
            First Name
          </label>
          <input
            type="text"
            id="first-name"
            value={editFirstName}
            onChange={(e) => setEditFirstName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold" htmlFor="last-name">
            Last Name
          </label>
          <input
            type="text"
            id="last-name"
            value={editLastName}
            onChange={(e) => setEditLastName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={user.primaryEmailAddress.emailAddress}
            onChange={(e) => setEditEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            value={user.phoneNumbers}
            onChange={(e) => setEditPhone(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mt-4">
          <button
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={updateUser}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
