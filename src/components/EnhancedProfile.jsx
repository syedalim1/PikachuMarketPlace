import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

function EnhancedProfile() {
  const { user } = useUser();
  const [profile, setProfile] = useState({
    profilePicture: '',
    contactInfo: {
      email: '',
      phone: '',
    },
    activityHistory: [],
  });

  useEffect(() => {
    if (user) {
      setProfile({
        profilePicture: user.profileImageUrl,
        contactInfo: {
          email: user.primaryEmailAddress.emailAddress,
          phone: user.phoneNumbers[0]?.phoneNumber || '',
        },
        activityHistory: user.activityHistory || [],
      });
    }
  }, [user]);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <img
          src={profile.profilePicture}
          alt="Profile"
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">{user.fullName}</h2>
          <p className="text-gray-600">{profile.contactInfo.email}</p>
          <p className="text-gray-600">{profile.contactInfo.phone}</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Activity History</h3>
        <ul className="space-y-2">
          {profile.activityHistory.map((activity, index) => (
            <li key={index} className="text-gray-600">
              {activity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EnhancedProfile;
