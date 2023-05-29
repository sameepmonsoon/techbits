import React from "react";
import HomeLayout from "../Layout/HomeLayout";
import { Link, Outlet, useLocation } from "react-router-dom";
import SkeletonCard from "../Components/Card/SkeletonCard";
import { IoSettingsOutline } from "react-icons/io5";
import image from "../assets/noah-silliman-gzhyKEo_cbU-unsplash.jpg";
const HomePage = () => {
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const username = currentUser?.username;
  const followersLength = currentUser?.followers?.length;
  console.log(currentUser);
  return (
    <HomeLayout renderComponents={""}>
      {/*profile container */}
      <div className="p-5 flex flex-col inset-0 min-w-[50%] justify-start items-start ">
        {/* profile detail */}
        <div className="flex sm:flex-row flex-col w-full items-center sm:items-end justify-start p-5 gap-5 ">
          <img
            src={image}
            className="h-[8rem] w-[8rem] rounded-full object-cover "
          />
          <div className="flex justify-start text-5xl font-[500] h-20 sm:items-start items-end gap-5 ">
            {username}
            <span className="flex items-end h-10 text-xl gap-1">
              <IoSettingsOutline size={25} />
            </span>
          </div>
        </div>
        <div className="border-b-[3px] w-full border-black/10 flex justify-start gap-5 p-1 transition-all duration-1000">
          <Link
            to="/profile"
            className={` ${
              location.pathname == "/profile" ? "text-black" : "text-black/60"
            } relative h-[2rem] min-w-[4.4rem] max-w-none group  hover:text-black cursor-pointer flex justify-center items-end rounded-sm`}>
            Home
            {location.pathname == "/profile" && (
              <span className="absolute top-[6px] w-[85%] h-full border-b-[2px] border-black text-black">
                &nbsp;
              </span>
            )}
          </Link>
          <Link
            to="/profile/bookmarks"
            className={` ${
              location.pathname == "/profile/bookmarks"
                ? "text-black"
                : "text-black/60"
            } relative h-[2rem] min-w-[4.4rem] max-w-none group  hover:text-black cursor-pointer flex justify-center items-end rounded-sm`}>
            Bookmarks{" "}
            {location.pathname == "/profile/bookmarks" && (
              <span className="absolute top-[6px] w-full h-full border-b-[2px] border-black text-black">
                &nbsp;
              </span>
            )}
          </Link>
          <Link
            to="/profile/about"
            className={` ${
              location.pathname == "/profile/about"
                ? "text-black"
                : "text-black/60"
            } relative h-[2rem] min-w-[4.4rem] max-w-none group  hover:text-black cursor-pointer flex justify-center items-end rounded-sm`}>
            About
            {location.pathname == "/profile/about" && (
              <span className="absolute top-[6px] w-[85%] h-full border-b-[2px] border-black text-black">
                &nbsp;
              </span>
            )}
          </Link>
        </div>
      </div>
      <div className="min-w-[50%] flex items-start justify-center h-screen">
        <Outlet />
      </div>
    </HomeLayout>
  );
};

export default HomePage;
