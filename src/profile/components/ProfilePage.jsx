import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const { user, isLoaded } = useUser();
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (isLoaded && user) {
      getUserDetails();
    }
  }, [isLoaded, user]);

  const getUserDetails = () => {
    setEditFirstName(user?.firstName || "");
    setEditLastName(user?.lastName || "");
    setEditImageUrl(user?.imageUrl || "https://via.placeholder.com/150");
    setEmail(user?.primaryEmailAddress?.emailAddress || "");
    setPhone(user?.phoneNumbers?.[0]?.phoneNumber || ""); // Use the first phone number if available
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

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-red-600 mb-6">
          Not Registered
        </h1>
        <p className="text-center text-gray-700">
          Please register an account to view or edit your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-5 bg-white rounded-lg ">
      <h2 className="text-xl text-start mt-6 sm:text-3xl font-semibold text-purple-700">
        Edit Profile
      </h2>

      <div className="flex flex-col justify-start items-center mb-6">
        <div>
          <img
            src={editImageUrl}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover mb-4 border border-gray-300"
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
            className="w-full p-1 border border-gray-300 rounded-lg"
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
            value={email}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>
        <div className="mt-6">
          <button
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
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
