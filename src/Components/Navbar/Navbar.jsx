import React, { useState } from "react";
import Logo from "../Logo/Logo";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button/Button";
import {
  RxCross1,
  CiMenuBurger,
  BsPencilSquare,
  CiUser,
} from "react-icons/all";
import { useSelector } from "react-redux";
const Navbar = ({ Links, fixed, border }) => {
  const location = useLocation();
  const [openModal, setOpenModal] = useState(true);
  // function
  const handleToggle = () => {
    setOpenModal(!openModal);
  };

  //
  const { currentUserDetail, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const currentLoggedUser = JSON.parse(localStorage.getItem("user"));
  console.log(currentLoggedUser?.username);
  return (
    <>
      <div
        className={`font-sans ${
          fixed && "fixed"
        } w-full z-[10] h-[3.5rem] flex justify-start items-center gap-10 px-4 0  bg-white/90 backdrop-blur-sm  ${
          border ? "border-b-[1px] border-b-gray-100/70" : "border-b-0"
        } overflow-hidden`}>
        <div>
          <Logo />
        </div>
        <div className=" h-10 w-full flex justify-end sm:justify-between items-center gap-5 text-deep-purple/80 text-[16px] font-[400]">
          <div className="hidden sm:flex justify-start gap-5 items-center">
            {Links.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className={`cursor-pointer hover:text-blue-purple ${
                  location.pathname === `${item.link}` && "text-[#53389E]"
                }`}>
                {item.title}
              </Link>
            ))}
          </div>
          {currentLoggedUser ? (
            <div className="hidden sm:flex gap-4 px-5">
              <Button
                icon={<BsPencilSquare size={20} />}
                title={"Write"}
                border={false}
                color={true}
                background={false}
                linkName={"/writeBlog"}
              />
              <Button
                icon={<CiUser size={20} />}
                title={currentLoggedUser?.username}
                border={false}
                color={true}
                background={false}
                linkName={"/profile"}
              />
            </div>
          ) : (
            <div className="hidden sm:flex gap-4 px-5">
              <Button
                title={"Log in"}
                border={true}
                color={true}
                background={false}
                linkName={"/login"}
              />
              <Button
                title={"Sign up"}
                border={false}
                color={false}
                background={true}
                linkName={"/signup"}
              />
            </div>
          )}
          <span className="sm:hidden flex text-[#9E77ED] hover:text-[#53389e] cursor-pointer">
            <CiMenuBurger size={25} onClick={handleToggle} />
          </span>
        </div>
      </div>
      {/*  for small devices modal*/}
      <div
        className={`absolute z-[100] transition-all ease-in-out overflow-hidden duration-900 flex sm:hidden flex-col justify-start items-center w-[80%] right-0 top-[-4.2rem] h-[108vh] border-l-[1px] ${
          openModal && "left-[-200%]"
        } border-l-gray-100`}>
        <span className="absolute top-[5.1rem] right-4 z-10 cursor-pointer hover:text-[#53389E] text-[#9E77ED]/90">
          <RxCross1 size={25} onClick={handleToggle} />
        </span>
        <div className="flex flex-col  justify-start pt-3 px-20 gap-7 items-start  bg-gray-100/70  relative top-[4.2rem] h-full w-full  backdrop-blur-sm  ">
          <div className="flex flex-col gap-7">
            {Links.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className={`cursor-pointer text-[#9E77ED] text-[20px] hover:text-[#53389E] ${
                  location.pathname === `${item.link}` && "text-[#53389E]"
                }`}>
                {item.title}
              </Link>
            ))}
          </div>
          {currentLoggedUser ? (
            <div className="flex flex-col gap-4 px-0 z-10 ">
              <Button
                icon={<BsPencilSquare size={20} />}
                title={"Write"}
                border={false}
                color={true}
                background={false}
                linkName={"/writeBlog"}
              />
              <Button
                icon={<CiUser size={20} />}
                title={currentLoggedUser?.username}
                border={false}
                color={true}
                background={false}
                linkName={"/profile"}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-4 px-0 z-10 ">
              <Button
                title={"Log in"}
                border={true}
                color={true}
                background={false}
                linkName={"/login"}
              />
              <Button
                title={"Sign up"}
                border={false}
                color={false}
                background={true}
                linkName={"/signup"}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
