import React from "react";
import Logo from "../Components/Logo/Logo";
import Button from "../Components/Button/Button";
import { CiUser } from "react-icons/ci";
import { CgOptions } from "react-icons/cg";

const BlogLayout = ({ children, renderComponents }) => {
  const NavbarLinks = [{ title: "Publish", link: "/" }];
  const currentUserDetails = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="overflow-x-hidden h-screen w-full font-sans">
      <div className="">
        <div
          className={`font-sans fixed w-full z-[12] h-[5rem] flex justify-center items-center gap-10 px-4 0  bg-white backdrop-blur-sm  border-b-0 overflow-hidden`}>
          <div className="flex justify-start items-center gap-3 w-[20rem] sm:w-[30rem]">
            <Logo />
            <span className="text-deep-purple text-[16px]">Saved</span>
          </div>
          <div className="flex justify-start items-center gap-4 ">
            <Button
              icon={<CiUser size={20} />}
              title={currentUserDetails.username}
              border={true}
              color={true}
              background={false}
              linkName={"/writeBlog"}
            />
            <span className="group cursor-pointer flex justify-center items-center rounded-full hover:bg-purple/10 p-1">
              <CgOptions
                size={23}
                className="text-purple cursor-pointer group-hover:text-deep-purple/70"
              />
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center px-10 flex-wrap min-h-screen pt-[7rem]">
        {children}
      </div>
      <div className="flex justify-start items-center px-10 flex-wrap min-h-screen pt-20">
        {renderComponents}
      </div>
    </div>
  );
};

export default BlogLayout;
