import React, { useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import SkeletonCard from "../Components/Card/SkeletonCard";
import { IoSettingsOutline } from "react-icons/io5";
import image from "../assets/noah-silliman-gzhyKEo_cbU-unsplash.jpg";
import { IoIosLogOut } from "react-icons/io";
const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const username = currentUser?.username;
  const profilePicture = currentUser?.profilePicture;
  const followersLength = currentUser?.followers?.length;

  // for child modal
  const [openSetting, setOpenSetting] = useState(false);
  const handleSettingClick = () => {
    setOpenSetting((prev) => !prev);
  };
  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("user");
  };
  return (
    <HomeLayout renderComponents={""}>
      {/*profile container */}
      <div className="p-5 flex flex-col inset-0 min-w-[50%] justify-start items-start ">
        {/* modal */}

        <div
          className={`w-auto h-auto max-h-[20rem] ${
            openSetting ? "opacity-100 " : "opacity-0 "
          } max-w-[15rem] flex flex-col gap-3 bg-white border-[1px] shadow-md p-2 py-5 absolute left-[50rem] top-[12rem] rounded-lg transition-opacity duration-200`}>
          <>
            <Link
              onClick={handleLogout}
              className="w-[6.5rem] flex items-center gap-2 justify-center  border-gray-300 cursor-pointer border-[1px] rounded-lg h-10 bg-red-600 hover:bg-red-700 text-white">
              <IoIosLogOut size={25} /> Logout
            </Link>
            <Link
              to="/update"
              className="w-40 flex  items-center justify-center hover:border-gray-400/50 hover:bg-gray-200/60  border-gray-300 cursor-pointer border-[1px] rounded-md h-10 bg-gray-100 text-black">
              Update Profile
            </Link>
          </>
        </div>
        {/* profile detail */}
        <div className="flex sm:flex-row flex-col w-full items-center sm:items-end justify-start p-5 gap-5 ">
          <img
            src={profilePicture ? profilePicture : image}
            className="h-[8rem] w-[8rem] rounded-full object-cover "
          />
          <div className="flex justify-start text-5xl font-[500] h-20 sm:items-start items-end gap-5 ">
            {username}
            <span
              className={`flex items-end h-auto text-xl gap-1 ${
                openSetting && "bg-gray-200"
              } hover:bg-gray-200 rounded-full p-1 cursor-pointer`}
              onClick={handleSettingClick}>
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
      <div className="min-w-[50%] flex items-start justify-center h-auto">
        <Outlet />
      </div>
    </HomeLayout>
  );
};

export default HomePage;
