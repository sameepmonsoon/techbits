import React from "react";
import { Link } from "react-router-dom";

const Button = ({ title, border, color, background, linkName, fullWidth }) => {
  return (
    <Link
      to={linkName ? linkName : null}
      className={`font-sans flex justify-center items-center text-[16px] sm:text-[15px] font-[500] h-[2.2rem]  ${
        fullWidth ? "w-full h-[2.5rem]" : "min-w-[6rem] max-w-[8rem]"
      } rounded-md ${border && "border-[1px] border-gray-300"} ${
        background
          ? "bg-deep-purple hover:bg-blue-purple"
          : "hover:bg-gray-100/50 "
      } ${color ? "text-purple" : "text-white"}`}>
      {title}
    </Link>
  );
};

export default Button;
