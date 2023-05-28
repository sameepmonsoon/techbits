import React from "react";

const LoadingOverlayComponent = ({ openCloseOverlay, children }) => {
  return (
    <div
      className={`${openCloseOverlay === true && "bg-transparent"} ${
        openCloseOverlay ? "flex" : " hidden"
      } absolute w-full h-[137vh] lg:h-full items-center justify-center  z-20 `}>
      {children}
    </div>
  );
};

export default LoadingOverlayComponent;
