import React from "react";

const Logo = () => {
  return (
    <div className="relative h-[2.5rem] w-[2.5rem] rounded-md flex items-center justify-center border-[1px] border-[#DDDDDD] bg-[#F5F5F4]">
      <span className="uppercase text-[25px] font-[700] text-[#9E77ED] text-shadow-red-100 z-10">
        B
      </span>
      <span className="uppercase absolute top-[-8px] left-[7px] text-[36px] font-[900] text-white z-[0] text-shadow-red-100">
        B
      </span>
    </div>
  );
};

export default Logo;
