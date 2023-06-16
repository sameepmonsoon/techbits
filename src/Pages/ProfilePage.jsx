import { useEffect, useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import image from "../assets/noah-silliman-gzhyKEo_cbU-unsplash.jpg";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Store/authSlice";
const HomePage = () => {
  // state to verify logout
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const username = currentUser?.username;
  const profilePicture = currentUser?.profilePicture;
  const dispatch = useDispatch();
  const isUserAuthenticated = localStorage.getItem("isAuthenticated");
  const { logoutState } = useSelector((state) => state.auth);
  console.log(isUserAuthenticated);
  // for child modal
  const [openSetting, setOpenSetting] = useState(false);
  const handleSettingClick = () => {
    if (!openDeleteModal) setOpenSetting((prev) => !prev);
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (currentUser == null) {
      navigate("/");
    }
    if (!isUserAuthenticated) {
      navigate("/");
    }
  }, [isUserAuthenticated, currentUser, logoutState]);
  return (
    <HomeLayout renderComponents={""}>
      {/*profile container */}
      <div className="p-5 flex flex-col inset-0 min-w-[50%] justify-start items-start relative ">
        {/* modal */}
        {openDeleteModal && (
          <div className="absolute bg-white border-[1px] shadow-md gap-2 h-20 text-black w-40 rounded-md text-[16px] flex flex-col justify-center items-center sm:left-[25rem] z-30 left-[10rem] top-[25rem] sm:top-[16rem]">
            <span>Are you sure?</span>

            <div className="w-full flex gap-4 justify-center">
              <span
                onClick={handleLogout}
                className="cursor-pointer h-auto  hover:text-red-500 px-1 rounded-md flex justify-center items-center">
                Logout
              </span>
              <span
                onClick={() => {
                  setOpenDeleteModal(false);
                }}
                className="cursor-pointer h-auto  hover:text-green-500 px-1 rounded-md flex justify-center items-center">
                Cancel
              </span>
            </div>
          </div>
        )}
        <div
          onMouseEnter={() => {
            console.log("enter");
          }}
          className={`w-auto h-auto max-h-[20rem] ${
            openSetting
              ? "opacity-100 relative left-[8rem] top-[25rem] sm:top-[15.5rem] sm:left-[18rem] md:left-[24rem] md:top-[15rem]"
              : "opacity-0 absolute left-[-8rem] top-[-25rem] sm:top-[-15.5rem] sm:left-[-18rem] md:left-[-24rem] md:top-[-15rem]"
          } max-w-[15rem] flex flex-col gap-3 bg-white border-[1px] shadow-md p-2 py-5 relative z-20  rounded-lg transition-opacity duration-200`}>
          <div className="flex flex-col gap-2">
            <Link
              onClick={() => {
                handleSettingClick();
                setOpenDeleteModal((prev) => !prev);
              }}
              className="w-[6.5rem] flex items-center relative gap-2 justify-center  border-gray-300 cursor-pointer border-[1px] rounded-lg h-10 bg-red-600 hover:bg-red-700 text-white">
              <IoIosLogOut size={25} /> Logout
            </Link>
            <Link
              to="/update"
              className="w-40 flex  items-center justify-center hover:border-gray-400/50 hover:bg-gray-200/60  border-gray-300 cursor-pointer border-[1px] rounded-md h-10 bg-gray-100 text-black">
              Update Profile
            </Link>
          </div>
        </div>

        {/* profile detail */}
        <div className="flex sm:flex-row flex-col w-full items-center sm:items-end justify-start p-5 gap-5 ">
          <img
            src={profilePicture ? profilePicture : image}
            className="h-[8rem] w-[8rem] rounded-full object-cover "
          />
          <div className="flex justify-start text-5xl font-[500] h-20 sm:items-start items-end gap-5 ">
            {username}
            <div
              className={`flex items-end h-auto text-xl gap-1 ${
                openSetting && "bg-gray-200"
              } hover:bg-gray-200 rounded-full p-1 cursor-pointer relative group`}
              onClick={handleSettingClick}>
              <IoSettingsOutline size={25} />

              {!openSetting && (
                <div className="absolute  top-10 group-hover:flex hidden z-20 text-[16px] font-[400]  group-hover:justify-center  group-hover:items-center cursor-pointer  group-hover:bg-white border-[1px] border-gray-300 shadow-sm  h-8 w-20 rounded-md overflow-hidden items-center justify-center">
                  Settings
                </div>
              )}
            </div>
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
