import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/message/MessageContainer";
import Profile from "../profile/Profile";

const Home = () => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="flex sm:h-min[450px] md:h-[550px] md:min-w-[550px] w-fit rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      {showProfile ? (
        <Profile goBack={() => setShowProfile(false)} />
      ) : (
        <>
          <Sidebar showProfile={() => setShowProfile(true)} />
          <MessageContainer />
        </>
      )}
    </div>
  );
};

export default Home;



