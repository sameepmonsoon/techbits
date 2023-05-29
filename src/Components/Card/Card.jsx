import React from "react";
import { HiOutlineDotsHorizontal, MdArrowOutward } from "react-icons/all";
import { Link } from "react-router-dom";
const Card = ({
  cardId,
  writerId,
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
          ? "w-[40rem] h-[30rem] flex-col"
          : row
          ? "sm:w-[34rem] sm:h-[15rem] h-[28.2rem] gap-2 flex-col sm:flex-row"
          : "w-[22rem] sm:w-[24rem] h-[28.2rem] flex-col"
      } shadow-md shadow-gray-300 bg-white/80 backdrop-blur-sm p-4 gap-2 flex justify-start items-start`}>
      <img
        src={cardImage}
        alt=""
        className={`${
          autoHeight
            ? "h-[50%] w-full"
            : row
            ? "h-[60%] sm:h-full w-full sm:w-[50%] "
            : "h-[60%]  w-full"
        }  object-cover`}
      />
      <div className="flex flex-col justify-start items-start overflow-hidden w-full">
        <div className="text-deep-purple capitalize text-[16px] flex gap-1 justify-start items-center ">
          {tag} <span>{tag != "" && ""}</span>
        </div>
        <div className="text-black capitalize text-[18px] w-full flex justify-between items-center">
          <span>{cardTitle}</span>
          <Link to={`/read/${cardId}`}>
            <MdArrowOutward
              size={23}
              className="text-black/70 hover:text-black"
            />
          </Link>
        </div>
        <span className="text-black/80 text-[13px] max-h-[5rem] overflow-hidden">
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
            <span className="text-[14px]">
              {" "}
              {new Date(cardPostDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
