import React from "react";
import Header from "@/Common/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FiUser, FiSettings } from "react-icons/fi";
import { MdMessage } from "react-icons/md";
import MyListing from "./components/MyListing";
import Inbox from "./components/Inbox";
import ProfilePage from "./components/ProfilePage";

const Profile = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <Header />

      {/* Profile Tabs Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs
          defaultValue="my-listing"
          className="w-full p-4 bg-white rounded-xl shadow-lg"
        >
          {/* Tabs List */}
          <TabsList className="flex flex-row sm:flex-row justify-between bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 rounded-xl shadow-md">
            <TabsTrigger
              value="my-listing"
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg hover:scale-105 transition-transform focus:ring-2 focus:ring-white mb-2 sm:mb-0"
              aria-label="My Listing"
            >
              <FiUser className="text-lg" />
              <span>My Listing</span>
            </TabsTrigger>

            <TabsTrigger
              value="inbox"
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg hover:scale-105 transition-transform focus:ring-2 focus:ring-white mb-2 sm:mb-0"
              aria-label="Inbox"
            >
              <MdMessage className="text-lg" />
              <span>Inbox</span>
            </TabsTrigger>

            <TabsTrigger
              value="profile"
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg hover:scale-105 transition-transform focus:ring-2 focus:ring-white"
              aria-label="Profile"
            >
              <FiSettings className="text-lg" />
              <span>Profile</span>
            </TabsTrigger>
          </TabsList>

          {/* Tabs Content */}
          <div className="mt-6">
            <TabsContent value="my-listing">
              <MyListing />
            </TabsContent>

            <TabsContent value="inbox">
              <Inbox />
            </TabsContent>

            <TabsContent value="profile">
              <div className="text-center text-gray-600 p-8">
                <h2 className="text-2xl sm:text-3xl font-semibold text-purple-700">
                  Profile Section
                </h2>
                <ProfilePage/>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
