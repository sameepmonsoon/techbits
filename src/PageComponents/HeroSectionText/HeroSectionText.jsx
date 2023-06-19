import { memo, useRef } from "react";
import Button from "../../Components/Button/Button";

const HeroSectionText = ({ align, color, getSearchValue }) => {
  const searchContent = useRef("");
  const handleSearchChange = () => {
    // setSearchValue(e?.target?.value);
  };
  const handleSubmit = () => {
    if (searchContent.current.value) {
      getSearchValue(searchContent.current?.value);
    }
  };

  console.log("consoling inside hero section");
  return (
    <div
      className={`p-1 font-sans flex flex-col justify-center ${
        color === "white" ? "text-white" : "text-purple "
      } ${
        align == "center"
          ? "items-center"
          : align == "start"
          ? "items-start"
          : "items-center"
      } w-full h-[30rem] gap-3 sm:gap-5`}>
      <span
        className={`bg-gray-100/50 text-[13px] h-[1.5rem] min-w-[8rem] max-w-[20rem]  flex justify-center items-center rounded-[5rem]`}>
        Latest Updates
      </span>
      <span className="sm:h-[4rem] h-[3rem] w-full flex justify-center items-center text-[1.6rem] sm:text-[3rem]">
        Resources and insights
      </span>
      <span className="h-[1.5rem] w-auto  text-[0.9rem]">
        The latest gadgets, devices, blogs and news.
      </span>
      <span className="flex sm:flex-row flex-col justify-center items-center gap-2">
        <label htmlFor="email">
          <input
            ref={searchContent}
            maxLength={20}
            onChange={handleSearchChange}
            type="text"
            name="text"
            id="search"
            placeholder="Search Blogs"
            className="border-[1px] border-gray-200 focus:outline-1 text-gray-600 focus:outline-purple/90 h-[2.4rem] w-[18rem] rounded-md px-4"
          />
        </label>
        <Button
          title={"Search"}
          border={true}
          background={true}
          onClick={handleSubmit}
        />
      </span>
    </div>
  );
};

export default memo(HeroSectionText);
