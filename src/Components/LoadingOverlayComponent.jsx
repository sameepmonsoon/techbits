import React from "react";

const LoadingOverlayComponent = ({ openCloseOverlay }) => {
  return (
    <div
      className={`${
        openCloseOverlay === true && "bg-transparent"
      } ${
        openCloseOverlay ? "flex" : " hidden"
      } absolute w-full h-[137vh] lg:h-full items-center justify-center  z-20`}>
      {}
    </div>
  );
};

export default LoadingOverlayComponent;
