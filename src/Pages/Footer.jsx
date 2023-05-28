import React from "react";
import Logo from "../Components/Logo/Logo";
import SocialMedia from "../Components/SocialMedia/SocialMedia";
import { footerDetails } from "../Details";
const Footer = ({ footerText }) => {
  return (
    <div className="relative bottom-0 font-sans min-h-[30rem] w-full bg-deep-purple flex flex-col justify-start items-center sm:items-start">
      <div className="flex-1 flex sm:flex-row flex-col p-20 flex-wrap lg:flex-nowrap items-center sm:items-start">
        <div className="flex flex-col gap-2 sm:items-start items-center">
          <span className="flex justify-start items-center gap-2">
            <Logo />
            <span className="w-[10rem] h-[1.6rem] text-[18px] font-[800] text-white overflow-hidden">
              TechBits
            </span>
          </span>
          <div className="w-[20rem] h-[2.8rem] overflow-hidden text-gray-300 text-[16px] font-[400] flex justify-center sm:justify-start">
            Brand and Sell Your Products.
          </div>
        </div>
        {/* link container */}
        <div className="font-sans flex flex-col sm:flex-row justify-start items-start gap-5 flex-nowrap sm:flex-wrap h-full sm:h-auto w-auto"> 
        {/* link container div */}
          <div className=" w-[12rem] h-[12rem] p-2 flex flex-col justify-start items-start gap-1">
            <span className=" text-[20px] sm:text-[18px] capitalize text-gray-400 cursor-pointer hover:underline">
              Products
            </span>
            <span className="capitalize text-[16px] sm:text-[14px] text-gray-100 cursor-pointer hover:underline">
              overiew
            </span>
            <span className="capitalize text-[16px] sm:text-[14px] text-gray-100 cursor-pointer hover:underline">
              Features
            </span>
            <span className="capitalize text-[16px] sm:text-[14px] text-gray-100 cursor-pointer hover:underline">
              Solutions
            </span>
            <span className="capitalize text-[16px] sm:text-[14px] text-gray-100 cursor-pointer hover:underline">
              Pricing
            </span>
            <span className="capitalize text-[16px] sm:text-[14px] text-gray-100 cursor-pointer hover:underline">
              overiew
            </span>
          </div>
          <div className=" w-[12rem] h-[12rem] p-2 flex flex-col justify-start items-start gap-1">
            <span className=" text-[20px] sm:text-[18px] capitalize text-gray-400 cursor-pointer hover:underline">
          News
            </span>
            <span className="capitalize text-[16px] sm:text-[14px] text-gray-100 cursor-pointer hover:underline">
             Technology
            </span>
            <span className="capitalize text-[16px] sm:text-[14px] text-gray-100 cursor-pointer hover:underline">
              Gadgets
            </span>
            <span className="capitalize text-[16px] sm:text-[14px] text-gray-100 cursor-pointer hover:underline">
              Devices
            </span>
            <span className="capitalize text-[16px] sm:text-[14px] text-gray-100 cursor-pointer hover:underline">
              Mobile
            </span>
            <span className="capitalize text-[16px] sm:text-[14px] text-gray-100 cursor-pointer hover:underline">
             Laptop
            </span>
          </div><div className=" w-[12rem] h-[12rem] p-2 flex flex-col justify-start items-start gap-1">
            <span className=" text-[20px] sm:text-[18px] capitalize text-gray-400 cursor-pointer hover:underline">
              Blog
            </span>
            <span className="capitalize text-[16px] sm:text-[14px] text-gray-100 cursor-pointer hover:underline">
            Personal
            </span>
            <span className="capitalize text-[16px] sm:text-[14px] text-gray-100 cursor-pointer hover:underline">
            Technology
            </span>
            <span className="capitalize text-[16px] sm:text-[14px] text-gray-100 cursor-pointer hover:underline">
              Opinion
            </span>
            <span className="capitalize text-[16px] sm:text-[14px] text-gray-100 cursor-pointer hover:underline">
             Trending
            </span>
            
          </div>
          
        </div>
      </div>
      <div className="socials min-h-[6rem] w-full flex sm:flex-row flex-col justify-evenly sm:justify-between px-20 items-center bg-blue-purple">
        <div className="sm:order-1 order-2 text-gray-300 w-screen sm:w-auto flex justify-center items-center text-[16px]">
          {footerDetails.details}
        </div>
        <div className="order-1 sm:order-2">
          <SocialMedia />
        </div>
      </div>
    </div>
  );
};

export default Footer;
