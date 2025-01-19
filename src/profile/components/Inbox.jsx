import React, { useEffect, useState } from "react";
import { App as SendbirdApp, SendBirdProvider } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";
import { useUser } from "@clerk/clerk-react";
import { GroupChannelList } from "@sendbird/uikit-react/GroupChannelList";
import { GroupChannel } from "@sendbird/uikit-react/GroupChannel";

function Inbox() {
  const { user } = useUser();
  const [userId, setUserId] = useState(null);
  const [channelUrl, setChannelUrl] = useState(null);

  useEffect(() => {
    if (user) {
      const id = user.primaryEmailAddress?.emailAddress.split("@")[0];
      setUserId(id); // Fixed setting userId
    }
  }, [user]);

  if (!userId) {
    // Render a loader or placeholder until the userId is ready
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <SendBirdProvider
        appId={import.meta.env.VITE_SENDBIRD_APP_ID}
        userId={userId}
        nickname={user?.username}
        profileUrl={user?.imageUrl}
        allowProfileEdit={true}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
          {/* Channel List */}
          <div>
            <GroupChannelList
              onChannelSelect={(channel) => {
                setChannelUrl(channel?.url); // Corrected channelUrl spelling
              }}
              channelListQueryParams={{ includeEmpty: true }}
            />
          </div>
          {/* Channel Details */}
          <div className="md:col-span-2">
            {channelUrl ? (
              <GroupChannel channelUrl={channelUrl} />
            ) : (
              <div>Select a channel to view details</div>
            )}
          </div>
        </div>
      </SendBirdProvider>
    </div>
  );
}

export default Inbox;
