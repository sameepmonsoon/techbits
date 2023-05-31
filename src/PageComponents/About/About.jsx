import React, { useEffect, useState } from "react";
import { HttpCalls } from "../../utils/HttpCalls";

const About = ({ userDetails }) => {
  const [currentUser, setCurrentUser] = useState();
  const [allBlogList, setAllBlogList] = useState([]);
  const [currentUserBookmark, setCurrentUserBookmark] = useState([]);
  const [usrBlogCount, setUserBlogCount] = useState(0);
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage?.getItem("user")));
    setAllBlogList(JSON.parse(localStorage?.getItem("currentBlogPosts")));
  }, []);
  useEffect(() => {
    HttpCalls.post("/auth/getBookmark", { userId: currentUser?._id }).then(
      (res) => {
        setCurrentUserBookmark(res.data?.getAll?.bookmarks);
      }
    );
    totalBLogByUser();
  }, [currentUser?._id]);

  function totalBLogByUser() {
    var count = 0;
    allBlogList.map((item, index) => {
      if (item.userId == currentUser._id) {
        count++;
      }
      setUserBlogCount(count);
    });
  }

  return (
    <div className="w-full h-auto flex flex-col justify-start items-start p-5 gap-5 ">
      <div className="w-full flex justify-start items-center gap-5">
        <span className="flex justify-start items-center text-black min-w-[20%]">
          Email Address
        </span>
        <span className="flex justify-start items-center text-black/70">
          {currentUser?.email}
        </span>
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <span className="flex justify-start items-center text-black min-w-[20%]">
          Profile Information
        </span>
        <span className="flex justify-start items-center text-black/70">
          {currentUser?.username}
        </span>
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <span className="flex justify-start items-center text-black w-[20%]">
          Bookmarks
        </span>
        <span className="flex justify-start items-center text-black/70">
          {currentUser?.bookmarks?.length}
        </span>
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <span className="flex justify-start items-center text-black w-[20%]">
          Followers
        </span>
        <span className="flex justify-start items-center text-black/70">
          {currentUser?.followers?.length}
        </span>
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <span className="flex justify-start items-center text-black w-[20%]">
          Following
        </span>
        <span className="flex justify-start items-center text-black/70">
          {currentUser?.following.length}
        </span>
      </div>
      <div className="w-full flex justify-start items-center gap-5">
        <span className="flex justify-start items-center text-black w-[20%]">
          Blog Post
        </span>
        <span className="flex justify-start items-center text-black/70">
          {usrBlogCount}
        </span>
      </div>
    </div>
  );
};

export default About;
