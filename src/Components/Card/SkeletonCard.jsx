import React from "react";
import { HiOutlineDotsHorizontal, MdArrowOutward } from "react-icons/all";
import { Link } from "react-router-dom";
const SkeletonCard = ({
  cardId,
  tag,
  cardTitle,
  cardDescription,
  cardUserName,
  cardImage,
  cardUserImage,
  cardPostDate,
  row,
  autoHeight,
}) => {
  return (
    <div
      className={`font-sans ${
        autoHeight
          ? "w-[40rem] h-[30rem] flex-col animate-pulse"
          : row
          ? "sm:w-[34rem] sm:h-[15rem] h-[28.2rem] gap-2 flex-col sm:flex-row animate-pulse"
          : "w-[20rem] sm:w-[24rem] h-[28.2rem] flex-col"
      } shadow-md shadow-gray-300 bg-white/80 backdrop-blur-sm  gap-2 flex justify-start items-start animate-pulse rounded-sm`}>
      <div
        className={`${
          autoHeight
            ? "h-[50%] w-full"
            : row
            ? "h-[60%] sm:h-full w-full sm:min-w-[50%] bg-gray-200 animate-pulse"
            : "h-[60%]  w-full bg-gray-200 animate-pulse"
        }  object-cover rounded-sm`}></div>
      <div className="flex flex-col justify-start items-start overflow-hidden w-full gap-2 animate-pulse p-4">
        <div className="text-deep-purple capitalize text-[16px] flex gap-1 justify-start items-center bg-red-400"></div>
        <div className="text-black capitalize text-[18px] w-full flex justify-between items-center bg-gray-200">
          <span>{cardTitle}</span>
          <Link to={`/read/${cardId}`}>&nbsp;</Link>
        </div>
        <span className="text-black/80 text-[13px] max-h-[5rem] overflow-hidden bg-gray-200 w-full">
          &nbsp;
        </span>
        <div className="text-black/70 text-[13px] h-20 overflow-hidden flex justify-start items-center gap-3 w-full">
          <div className="min-h-[3rem] w-[5.5rem] h-20 rounded-full bg-gray-200" />
          <div className="flex flex-col justify-center items-start h-full w-[80%] gap-2">
            <span className="bg-gray-200 w-full">&nbsp;</span>
            <span className="bg-gray-200 w-full">&nbsp;</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
