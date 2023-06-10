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
  image,
  ...rest
}) => {
  return (
    <Link
      {...rest}
      to={linkName ? linkName : null}
      className={`gap-2 font-sans flex justify-center items-center text-[14px] sm:text-[16px] font-[400] h-[2.5rem] rounded-[20px]  ${
        fullWidth
          ? "min-w-[60%] sm:w-full h-[2.5rem]"
          : "min-w-[7rem] sm:min-w-[7.9rem] max-w-none"
      } rounded-md ${border && "border-[1px] border-gray-400"} ${
        background
          ? "bg-deep-purple hover:bg-white hover:text-black text-white"
          : "hover:bg-gray-100/50 hover:text-deep-purple"
      } ${color ? "text-deep-purple/80" : "text-white"}`}>
      {image ? (
        <img
          src={image}
          className="h-[2rem] w-[2rem] rounded-full object-cover"
        />
      ) : (
        icon && (
          <span className="h-full flex justify-center items-center overflow-hidden object-contain w-auto">
            {icon}
          </span>
        )
      )}
      <span className="flex justify-center items-center">{title}</span>
    </Link>
  );
};

export default Button;
