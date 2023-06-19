import { memo, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import Button from "../../Components/Button/Button";

// var currentBlogLength;
// memo custom function
// function checkPropsBlogLength(prevBlogLength, currBlogLength) {
//   currentBlogLength = currBlogLength?.info?.totalLength;
//   return (
//     prevBlogLength?.info?.totalLength === currBlogLength?.info?.totalLength
//   );
// }

const InfoSection = ({ infoText, infoImage, info }) => {
  const [showTotalBLog, setShowTotalBLog] = useState(null);

  const handleButtonClick = () => {
    console.log("click", info?.totalLength);
    setShowTotalBLog(info?.totalLength);
  };
  console.log("I am inside info section.", info);
  return (
    <div className="font-sans flex flex-col gap-5 sm:gap-0 sm:flex-row w-full px-5 h-auto py-20 overflow-hidden">
      <div className="flex flex-col justify-start items-start flex-1 gap-4">
        <span className="text-[32px] sm:text-[48px] font-[600] w-[90%]">
          {infoText}
        </span>
        <span className=" text-[24px] text-gray-400 w-full">
          Start your 30-day free trial today.
        </span>
        <span className="flex gap-10">
          <Button border={true} title={"Learn More"} color={true} />
          <Button
            border={true}
            title={"Get Started"}
            color={false}
            background={true}
          />
        </span>
        <span>Total Length of the current blogs:</span>
        <span className="h-10 w-40 text-black justify-center flex items-center p-1 rounded-sm border-[1px]">
          {showTotalBLog}
        </span>
        <span>
          <button
            onClick={handleButtonClick}
            className="bg-gray-200 border-[1px] border-black p-1 rounded-sm">
            Show Total Length
          </button>
        </span>
      </div>
      <div className="font-sans relative w-auto sm:w-[28rem] min-h-[10rem] sm:h-[28rem]">
        <img src={infoImage} alt="" className="h-full w-full object-cover" />
        <div className="bllur absolute bottom-0 flex flex-col justify-center items-start gap-3 h-[50%] bg-gray-200/20 w-full backdrop-blur-sm p-5 text-white">
          <span className="text-[18px] h-[4.5rem] p-[1px] overflow-hidden">
            “TechBits has saved us thousands of Rupees.”
          </span>
          <div className=" w-full">
            <div className="flex justify-between items-center text-[18px] sm:text-[24px] min-w-full">
              <span className="flex-1">John Doe</span>
              <span className="flex ">
                <AiFillStar size={25} />
                <AiFillStar size={25} />
                <AiFillStar size={25} />
                <AiFillStar size={25} />
                <AiFillStar size={25} />
              </span>
            </div>
            <div className="text-[14px]">Kathmandu,Nepal</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(InfoSection);
