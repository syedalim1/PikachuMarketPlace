import React, { useEffect, useState } from "react";
import { App as SendbirdApp, SendBirdProvider } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useUser,
} from "@clerk/clerk-react";
import { GroupChannelList } from "@sendbird/uikit-react/GroupChannelList";
import { GroupChannel } from "@sendbird/uikit-react/GroupChannel";
import Header from "@/Common/Header";
import Footer from "@/Common/Footer";
import { Button } from "@/components/ui/button";

function Inbox() {
  const { user } = useUser();
  const [userId, setUserId] = useState(null);
  const [channelUrl, setChannelUrl] = useState(null);

  useEffect(() => {
    if (user) {
      const id =
        user.primaryEmailAddress?.emailAddress.split("@")[0] || "guest";
      setUserId(id);
    }
  }, [user]);

  if (!import.meta.env.VITE_SENDBIRD_APP_ID) {
    return (
      <div className="text-center text-red-500 mt-6">
        <strong>Error:</strong> Sendbird App ID is not configured.
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <Header />
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center text-red-600 mb-6">
            Not Registered
          </h1>
          <p className="text-center text-gray-700">
            Please register an account to view or edit your profile.
          </p>
          <div className="flex items-center justify-center mt-5">
            <SignedOut>
              <SignInButton>
                <Button className="hover:scale-110 text-center hover:text-black hover:bg-white transition-transform text-white bg-black">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Header />

      <SendBirdProvider
        appId={import.meta.env.VITE_SENDBIRD_APP_ID}
        userId={userId}
        nickname={
          user?.username ||
          user?.firstName ||
          user?.primaryEmailAddress?.emailAddress
        }
        profileUrl={user?.imageUrl || "https://via.placeholder.com/150"}
        allowProfileEdit={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
          {/* Channel List */}
          <div className="overflow-y-auto scrollable">
            <GroupChannelList
              onChannelSelect={(channel) => setChannelUrl(channel?.url)}
              channelListQueryParams={{ includeEmpty: true }}
            />
          </div>

          {/* Channel Details */}
          <div className="md:col-span-2 flex items-center justify-center">
            {channelUrl ? (
              <GroupChannel channelUrl={channelUrl} />
            ) : (
              <div className="text-gray-500">
                Select a channel to view details
              </div>
            )}
          </div>
        </div>
      </SendBirdProvider>
      <Footer />
    </div>
  );
}

export default Inbox;
