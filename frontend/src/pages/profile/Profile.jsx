import React from "react";
import useUserProfile from "../../hooks/useUserProfile";

const Profile = ({ goBack }) => {
  const { userProfile, loading } = useUserProfile();

  if (loading) {
    return <p className="text-center text-gray-500 text-lg mt-10">Loading profile...</p>;
  }

  if (!userProfile) {
    return <p className="text-center text-red-500 text-lg mt-10">User not found!</p>;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">User Profile</h2>

      <img
        src={userProfile.profilepic || "https://via.placeholder.com/150"}
        alt="Profile"
        className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg"
      />
      <p className="text-xl font-medium text-gray-700 mt-4">{userProfile.fullname}</p>
      <p className="text-md text-gray-500">@{userProfile.username}</p>

      <div className="mt-6 w-2/3">
        <div className="border-b py-2">
          <span className="text-gray-600 font-semibold">Full Name : </span>
          <span className="text-gray-800">{userProfile.fullname}</span>
        </div>
        <div className="border-b py-2">
          <span className="text-gray-600 font-semibold">Username : </span>
          <span className="text-gray-800">{userProfile.username}</span>
        </div>
        <div className="py-2">
          <span className="text-gray-600 font-semibold">Gender : </span>
          <span className="text-gray-800 capitalize">{userProfile.gender}</span>
        </div>
      </div>

      <button
        className="mt-6 w-1/3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300"
        onClick={goBack}
      >
        Go Back
      </button>
    </div>
  );
};

export default Profile;
