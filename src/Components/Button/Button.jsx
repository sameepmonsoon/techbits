import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  icon,
  title,
  border,
  color,
  background,
  linkName,
  fullWidth,
  ...rest
}) => {
  return (
    <Link
      {...rest}
      to={linkName ? linkName : null}
      className={`gap-2 font-sans flex justify-center items-center text-[16px] sm:text-[14px] font-[400] h-[2.2rem]  ${
        fullWidth
          ? "min-w-[60%] sm:w-full h-[2.5rem]"
          : "min-w-[6rem] max-w-[10rem]"
      } rounded-md ${border && "border-[1px] border-gray-300"} ${
        background
          ? "bg-deep-purple hover:bg-blue-purple"
          : "hover:bg-gray-100/50 hover:text-deep-purple"
      } ${color ? "text-deep-purple/80" : "text-white"}`}>
      {icon && <span className="h-full flex justify-center items-center overflow-hidden object-contain w-auto">{icon}</span>}
      <span>{title}</span>
    </Link>
  );
};

export default Button;
