import React, { useEffect, useState } from "react";
import { App as SendbirdApp, SendBirdProvider } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";
import { useUser } from "@clerk/clerk-react";
import { GroupChannelList } from "@sendbird/uikit-react/GroupChannelList";
import { GroupChannel } from "@sendbird/uikit-react/GroupChannel";
import Header from "@/Common/Header";
import Footer from "@/Common/Footer";

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

  if (!userId) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500">Loading your inbox, please wait...</div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Header/>
      
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
      <Footer/>
    </div>
  );
}

export default Inbox;
