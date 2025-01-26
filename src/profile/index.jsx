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
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <div className="">
      {/* Header */}
      <Header />

      <h2 className="text-2xl text-center mt-6 sm:text-3xl font-semibold text-purple-700">
        Profile Section
      </h2>
      <ProfilePage />

      <Footer />
    </div>
  );
};

export default Profile;
