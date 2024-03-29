import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="relative h-[2.5rem] w-[2.5rem] rounded-md flex items-center justify-center border-[1px] border-[#DDDDDD] bg-[#F5F5F4]">
      <span className="uppercase text-[25px] font-[700] text-purple text-shadow-red-100 z-10">
        B
      </span>
      <span className="uppercase absolute top-[-8px] left-[7px] text-[36px] font-[900] text-white z-[0] text-shadow-red-100">
        B
      </span>
    </Link>
  );
};

export default Logo;
