import React from "react";
import Button from "../../Components/Button/Button";

const HeroSectionText = ({ align }) => {
  return (
    <div
      className={`p-1  font-sans flex flex-col justify-center ${align=='center'?'items-center':align=='start'?'items-start':'items-center'} w-full h-[30rem] gap-3 sm:gap-5`}>
      <span className="bg-gray-100/50 text-[13px] text-purple h-[1.5rem] min-w-[8rem] max-w-[20rem]  flex justify-center items-center rounded-[5rem]">
        Latest Updates
      </span>
      <span className="sm:h-[4rem] h-[3rem] w-auto text-deep-purple text-[2rem] sm:text-[3rem]">
        Resources and insights
      </span>
      <span className="h-[1.5rem] w-auto text-purple text-[1rem]">
        The latest gadgets, devices, blogs and news.
      </span>
      <span className="flex sm:flex-row flex-col justify-center items-center gap-2">
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Subscribe now"
            className="border-[1px] border-gray-200 focus:outline-1 text-gray-600 focus:outline-purple/90 h-[2.4rem] w-[18rem] capitalize rounded-md px-4"
          />
        </label>
        <Button title={"Get Started"} border={true} background={true} />
      </span>
    </div>
  );
};

export default HeroSectionText;
