import React from "react";
import Header from "@/Common/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FiUser, FiSettings } from "react-icons/fi";
import { MdMessage } from "react-icons/md";
import MyListing from "./components/MyListing";
import Inbox from "./components/Inbox";
import ProfilePage from "./components/ProfilePage";
import { SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import Footer from "@/Common/Footer";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user || !user.primaryEmailAddress) {
    return (
      <div>
        <Header />
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg">
          <h1 className="text-2xl font-bold text-center text-red-600 mb-6">
            Not Registered
          </h1>
          <p className="text-center text-gray-700">
            Please register an account to view or edit your profile.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <SignedOut>
            <SignInButton>
              <Button className="hover:scale-110 hover:text-black hover:bg-white transition-transform text-white bg-black">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </div >
        <Footer />
      </div>
    );
  }
  return (
    <div className="">
      {/* Header */}
      <Header />

      {/* Profile Tabs Section */}
      <div className="container sm:mx-auto sm:px-6 lg:px-8 sm:py-8">
        <Tabs
          defaultValue="my-listing"
          className=" sm:px-4 bg-white sm:rounded-xl "
        >
          {/* Tabs List */}
          <TabsList className="flex flex-row h-[10] sm:flex-row justify-between bg-gradient-to-r from-indigo-500 to-purple-500 text-white sm:p-4 items-center  shadow-md">
            <TabsTrigger
              value="my-listing"
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg hover:scale-105 transition-transform focus:ring-2 focus:ring-white pb-2 sm:mb-0"
              aria-label="My Listing"
            >
              <FiUser className="text-lg" />
              <span>My Listing</span>
            </TabsTrigger>

            <TabsTrigger
              value="inbox"
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg hover:scale-105 transition-transform focus:ring-2 focus:ring-white pb-2 sm:mb-0"
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
                <ProfilePage />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
