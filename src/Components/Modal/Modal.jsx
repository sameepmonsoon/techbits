import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/all";
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
        focusModal === true ? "bg-red-300/10 backdrop-blur-sm" : " bg-white/10"
      } ${
        openCloseModal ? "flex" : " hidden"
      } absolute w-full h-full items-center justify-center  z-20`}>
      <div
        className={`cursor-pointer ${
          top
            ? "top-[6em]"
            : bottom
            ? "bottom-[0rem] sm:bottom-0 lg:bottom-[2rem]"
            : ""
        } backdrop-blur-sm animate-[modalPop_100ms_ease-in-out_1]  z-[200] max-h-[30rem] absolute m-auto flex flex-col justify-start items-center gap-1 ${
          error
            ? "bg-red-300/20 border-red-300/30  w-auto hover:border-red-300/50 h-auto hover:bg-red-300/25"
            : info
            ? "bg-green-300/10 border-green-400/30 hover:border-green-400/40 w-auto hover:bg-green-400/25 h-auto"
            : "bg-purple/20"
        } p-2 border-[1px]  backdrop-blur-sm rounded-lg first-letter $ ${
          autoHeight
            ? "max-w-[20rem] sm:min-w-[25rem] w-[50%] h-[50%]"
            : "w-auto max-w-[5rem] sm:max-w-[22rem]"
        }`}>
        <p
          className={`${
            error
              ? "border-b-white border-b-0 max-h-full text-red-600"
              : info
              ? "border-b-white border-b-0 max-h-full text-green-600"
              : "border-b-white border-b-2 max-h-[2rem]"
          }  w-full flex items-start justify-between px-1 gap-1  overflow-hidden `}>
          <span className="flex-1 max-h-full flex justify-start overflow-hidden">
            {modalMessage}
          </span>
          <RxCross2
            size={24}
            className={`${
              error ? "hover:text-red-900" : "hover:text-red-500"
            } cursor-pointer`}
            onClick={handleToggle}
          />
        </p>
        {error ? (
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
