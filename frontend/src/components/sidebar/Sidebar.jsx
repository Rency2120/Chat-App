import React from "react";
import { IoPersonCircleSharp } from "react-icons/io5"; 
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

const Sidebar = ({ showProfile }) => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col h-full">
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <div className="flex justify-between items-center mt-4">
        <LogoutButton />
        <IoPersonCircleSharp
          className="text-4xl text-blue-500 cursor-pointer"
          onClick={showProfile}
        />
      </div>
    </div>
  );
};

export default Sidebar;

