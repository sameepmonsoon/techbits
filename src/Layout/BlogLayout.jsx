import React, { createContext, useEffect, useState } from "react";
import Logo from "../Components/Logo/Logo";
import Button from "../Components/Button/Button";
import { CiUser } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
export const BlogContext = createContext({
  isHovering: false,
  handleHovering: () => {},
});

const BlogLayout = ({ children, renderComponents, getIsSaved }) => {
  const NavbarLinks = [{ title: "Publish", link: "/" }];
  const location = useLocation();
  const currentUserDetails = JSON.parse(localStorage.getItem("user"));
  const [toggleModal, setToggleModal] = useState(true);
  const [isHovering, setIsHovering] = useState(true);
  const handleMouseEnter = (event) => {
    setIsHovering(event);
  };
  const handleMouseLeave = (event) => {
    setIsHovering(event);
  };
  const navigate = useNavigate();
  useEffect(() => {
    setIsHovering(false);
  }, [location.pathname]);
  useEffect(() => {
    if (currentUserDetails == null) {
      navigate("/");
    }
  }, []);

  return (
    <div
      className="min-h-screen w-full font-sans flex flex-col overflow-x-hidden "
      // onClick={() => handleMouseLeave(false)}
    >
      <div className="border-b-[1px] bg-white backdrop-blur-sm">
        <div className="flex justify-between items-center px-4 py-2">
          <div className="flex justify-start items-center gap-3 w-[20rem] sm:w-[30rem]">
            <Logo />
            <span className="text-deep-purple text-[16px]">{getIsSaved}</span>
          </div>
          <div className="flex justify-start items-center gap-4">
            <Button
              image={currentUserDetails?.profilePicture}
              icon={<CiUser size={20} />}
              title={currentUserDetails?.username}
              border={true}
              color={true}
              background={false}
              // linkName={currentUserDetails ? "/Profile" : "/"}
            />
            <span
              className={`group cursor-pointer z-20 flex justify-center items-center rounded-full hover:bg-purple/10 p-1 ${
                isHovering && "bg-purple/10"
              } `}>
              <IoSettingsOutline
                size={23}
                className={`text-purple cursor-pointer group-hover:text-deep-purple/70 `}
                onClick={() => {
                  setIsHovering((prev) => !prev);
                }}
                // onMouseEnter={() => handleMouseEnter(true)}
              />
            </span>
          </div>
        </div>
      </div>
      <BlogContext.Provider
        value={{ isHovering, handleMouseEnter, handleMouseLeave }}>
        <div className="flex-grow overflow-hidden w-full flex justify-start sm:justify-center items-start px-10 pt-[7rem]">
          {children}
        </div>
      </BlogContext.Provider>
      <div className="overflow-y-auto px-10 pt-20">{renderComponents}</div>
    </div>
  );
};

export default BlogLayout;
