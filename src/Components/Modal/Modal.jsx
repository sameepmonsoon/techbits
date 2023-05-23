import React, { useEffect, useState } from "react";
import { RxCross2, TiTick, TiTickOutline } from "react-icons/all";
const Modal = ({
  autoHeight,
  info,
  error,
  toggleModal,
  openCloseModal,
  modalMessage,
  modalDescription,
  top,
  middle,
  bottom,
}) => {
  const handleToggle = () => {
    toggleModal((prev) => !prev);
  };
  const [focusModal, setFocusModal] = useState(false);

  useEffect(() => {
    setFocusModal(false);
  }, [openCloseModal]);
  return (
    <div
      onClick={() => {
        setFocusModal(true);
      }}
      className={`${
        focusModal === true && error
          ? "bg-red-100/20 backdrop-blur-sm"
          : focusModal === true && info
          ? "bg-green-300/10 backdrop-blur-sm"
          : " bg-white/10"
      } ${
        openCloseModal ? "flex" : " hidden"
      } absolute w-full h-[137vh] lg:h-full items-center justify-center  z-20`}>
      <div
        className={`cursor-pointer ${
          top
            ? "top-[6em]"
            : bottom
            ? "bottom-[4rem] sm:bottom-[4rem] md:bottom-[4rem] lg:bottom-[5rem]"
            : ""
        } backdrop-blur-sm animate-[modalPop_100ms_ease-in-out_1]  z-[200] max-h-[30rem] absolute m-auto flex flex-col justify-start items-start gap-1 ${
          error
            ? "bg-red-300/20 border-red-300/30  w-auto hover:border-red-300/50 h-auto hover:bg-red-300/25"
            : info
            ? "bg-green-300/10 border-green-300/30  w-auto hover:border-green-300/50 h-auto hover:bg-green-300/23"
            : "bg-purple/20 border-[1px] border-purple/30 hover:border-purple/50"
        } p-2 border-[1px]  backdrop-blur-sm rounded-lg first-letter $ ${
          autoHeight
            ? "max-w-[60%] sm:min-w-[25rem] w-[40%] h-[40%] max-h-[60%]"
            : "w-auto max-w-[16rem] sm:max-w-[25rem]"
        }`}>
        <p
          className={`${
            error
              ? "border-b-white border-b-0 max-h-full text-red-600"
              : info
              ? "border-b-white border-b-0 max-h-[2rem] text-green-600"
              : "border-b-white border-b-2 max-h-[2rem]"
          }  w-full flex items-start justify-between px-1 gap-1  overflow-hidden `}>
          <span className="flex-1 max-h-full flex justify-start overflow-hidden">
            {modalMessage}
          </span>
          {info ? (
            <RxCross2
              size={24}
              className={`${
                error
                  ? "hover:text-red-900"
                  : info
                  ? "hover:text-green-900"
                  : "text-gray-500  hover:text-blue-purple"
              } cursor-pointer`}
              onClick={handleToggle}
            />
          ) : (
            <RxCross2
              size={24}
              className={`${
                error
                  ? "hover:text-red-900"
                  : info
                  ? "hover:text-green-900"
                  : "text-gray-500  hover:text-blue-purple"
              } cursor-pointer`}
              onClick={handleToggle}
            />
          )}
        </p>
        {error || info ? (
          <></>
        ) : (
          <div className="flex justify-start items-center w-full text-[15px] font-[500] p-1 text-black/60">
            {modalDescription}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
