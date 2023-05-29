import React from "react";

const About = ({ userDetails }) => {
  return (
    <div className="w-full h-auto flex flex-col justify-start items-start p-5 gap-5 ">
      <div className="w-full flex justify-start items-center gap-5">
        <span className="flex justify-start items-center text-black min-w-[20%]">
          Email Address
        </span>
        <span className="flex justify-start items-center text-black/70">
          {userDetails?.email}
        </span>
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <span className="flex justify-start items-center text-black min-w-[20%]">
          Profile Information
        </span>
        <span className="flex justify-start items-center text-black/70">
          {userDetails?.username}
        </span>
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <span className="flex justify-start items-center text-black w-[20%]">
          Bookmarks
        </span>
        <span className="flex justify-start items-center text-black/70">
          {userDetails?.bookmarks?.length}
        </span>
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <span className="flex justify-start items-center text-black w-[20%]">
          Followers
        </span>
        <span className="flex justify-start items-center text-black/70">
          {userDetails?.followers?.length}
        </span>
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <span className="flex justify-start items-center text-black w-[20%]">
          Following
        </span>
        <span className="flex justify-start items-center text-black/70">
          {userDetails?.following.length}
        </span>
      </div>
    </div>
  );
};

export default About;
