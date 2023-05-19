import React from "react";

const Button = ({ title, border, color, background }) => {
  return (
    <button
      className={`flex justify-center items-center text-[16px] sm:text-[15px] font-[500] h-[2.2rem] min-w-[6rem] max-w-[8rem] rounded-md ${
        border && "border-[1px] border-gray-200 hover:border-gray-200"
      } ${background && "bg-[#9E77ED] "} ${
        color ? "text-[#9E77ED]" : "text-white"
      }`}>
      {title}
    </button>
  );
};

export default Button;
