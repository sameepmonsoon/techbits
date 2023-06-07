import React, { createContext, useEffect, useState } from "react";
import Logo from "../Components/Logo/Logo";
import Button from "../Components/Button/Button";
import { CiUser } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
export const BlogContext = createContext({
  isHovering: false,
  handleHovering: () => {},
});
const BlogLayout = ({ children, renderComponents }) => {
  const NavbarLinks = [{ title: "Publish", link: "/" }];
  const currentUserDetails = JSON.parse(localStorage.getItem("user"));
  const [toggleModal, setToggleModal] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = (event) => {
    setTimeout(() => {
      setIsHovering(event);
    }, 100);
  };
  const handleMouseLeave = (event) => {
    setTimeout(() => {
      setIsHovering(event);
    }, 600);
  };

  const handleHovering = (event) => {
    setIsHovering(event);
    console.log("mutator events", event);
  };

  useEffect(() => {}, [isHovering]);
  return (
    <div className="min-h-screen w-full font-sans flex flex-col overflow-x-hidden">
      <div className="border-b-[1px] bg-white backdrop-blur-sm">
        <div className="flex justify-between items-center px-4 py-2">
          <div className="flex justify-start items-center gap-3 w-[20rem] sm:w-[30rem]">
            <Logo />
            <span className="text-deep-purple text-[16px]">Saved</span>
          </div>
          <div className="flex justify-start items-center gap-4">
            <Button
              image={currentUserDetails?.profilePicture}
              icon={<CiUser size={20} />}
              title={currentUserDetails?.username}
              border={true}
              color={true}
              background={false}
              linkName={currentUserDetails ? "/Profile" : "/"}
            />
            <span className="group cursor-pointer flex justify-center items-center rounded-full hover:bg-purple/10 p-1">
              <IoSettingsOutline
                size={23}
                className="text-purple cursor-pointer group-hover:text-deep-purple/70"
                onClick={() => {
                  setToggleModal((prev) => !prev);
                }}
                onMouseEnter={() => handleMouseEnter(true)}
                onMouseLeave={() => handleMouseLeave(false)}
              />
            </span>
          </div>
        </div>
      </div>
      <BlogContext.Provider
        value={{ isHovering, handleMouseEnter, handleMouseLeave }}>
        <div className="flex-grow overflow-y-auto w-full flex justify-start sm:justify-center items-start px-10 pt-[7rem]">
          {children}
        </div>
      </BlogContext.Provider>
      <div className="overflow-y-auto px-10 pt-20">{renderComponents}</div>
    </div>
  );
};

export default BlogLayout;
