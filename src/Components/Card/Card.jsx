import React from "react";
import { MdArrowOutward } from "react-icons/all";
const Card = ({
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
      className={`${
        autoHeight
          ? "w-[40rem] h-[30rem] flex-col"
          : row
          ? "w-[34rem] h-[15rem] gap-2"
          : "w-[20rem] h-[28.2rem] flex-col"
      } shadow-md shadow-gray-300 bg-white/80 backdrop-blur-sm p-4 gap-1 flex  justify-start items-start`}>
      <img
        src={cardImage}
        alt=""
        className={`${
          autoHeight
            ? "h-[50%] w-full"
            : row
            ? "h-full w-[50%]"
            : "h-[60%]  w-full"
        }  object-cover`}
      />
      <div className="flex flex-col justify-start items-start">
        <span className="text-deep-purple capitalize text-[16px]">{tag}</span>
        <div className="text-black capitalize text-[20px] w-full flex justify-between items-center">
          <span>{cardTitle}</span>
          <MdArrowOutward size={25} />
        </div>
        <span className="text-black/70 text-[13px] h-[5.2rem] overflow-hidden">
          {cardDescription}
        </span>
        <div className="text-black/70 text-[13px] h-20 overflow-hidden flex justify-start items-center gap-3 w-full">
          <img
            src={cardUserImage}
            alt=""
            className="min-h-[3rem] w-[3rem] rounded-md"
          />
          <div className="flex flex-col justify-center items-start h-full">
            <span className="text-[16px] text-black font-[500] capitalize ">
              {cardUserName}
            </span>
            <span className="text-[14px]">{cardPostDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
