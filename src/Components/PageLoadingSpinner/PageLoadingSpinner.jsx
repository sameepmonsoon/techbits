import React from "react";
import { ImSpinner5 } from "react-icons/im";
import loadingImage from "../../assets/data-processing.svg";

const PageLoadingSpinner = ({ allowBackground }) => {
  return (
    <div className="relative flex flex-col justify-center items-center bg-transparent h-[20rem] w-[30rem] gap-4">
      {allowBackground ? (
        <img
          src={loadingImage}
          className=" h-[50%] sm:h-[80%] w-full object-contain"
        />
      ) : null}
      <div className="flex justify-evenly items-center h-[3rem] w-[15rem]  bg-transparent backdrop-blur-sm ">
        <span className="text-[27px] sm:text-[32px] font-[700] text-blue-purple">
          Loading
        </span>
        <ImSpinner5
          size={25}
          className={`text-4xl animate-[spin_1s_ease-in-out_infinite] text-deep-purple`}
        />
      </div>
    </div>
  );
};

export default PageLoadingSpinner;
