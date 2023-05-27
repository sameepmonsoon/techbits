import React from "react";
import HomeLayout from "../Layout/HomeLayout";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CiBookmarkPlus } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";
import { AiOutlineComment } from "react-icons/ai";
import image from "../assets/craig-mckay-jmURdhtm7Ng-unsplash.jpg";
import ReactQuill from "react-quill";
const ReadFullBlogPage = () => {
  const { cardId } = useParams();
  const { currentBlogPosts } = useSelector((state) => state.blog);
  console.log(currentBlogPosts);

  const currentPost = currentBlogPosts
    .filter((item) => item._id === cardId)
    .map((item) => item);
  console.log(currentPost);
  return (
    <HomeLayout>
      {currentPost.map((item, index) => (
        <div className="w-full flex flex-col justify-start items-center h-full gap-5 pt-10">
          {/* body container items starts here */}

          <p className="w-full flex justify-center text-[32px] capitalize font-[700]">
            {item.titleContent}
          </p>

          <div className="flex flex-col w-full justify-center items-center gap-5">
            <div className="text-xl capitalize flex flex-row justify-start cursor-pointer border-b-[1px] w-[50%] gap-2 ">
              <img
                src={image}
                alt=""
                className="h-[3rem] w-[3rem] object-contain rounded-full"
              />
              <div className="flex flex-col">
                <div className="flex flex-row justify-start items-center gap-1">
                  <span className="text-purple hover:text-blue-purple text-[18px]">
                    {item.username}
                  </span>
                  <span className="text-[12px]  text-green-500 hover:text-green-500 border-[1px] border-green-400 hover:border-green-500 hover:bg-[#f6fef9] rounded-sm px-1 w-[3.2rem] h-[1.2rem] items-center flex justify-center">
                    Follow
                  </span>
                </div>
                <span className="text-[14px] font-[500] text-black/70">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
            {/* article reactions and bookmark */}
            <div className="w-[50%] h-10 flex justify-center items-center gap-3 border-b-[1px]">
              <IoMdHeartEmpty
                size={25}
                className="text-deep-purple/70 hover:text-blue-purple cursor-pointer"
              />
              <AiOutlineComment
                size={25}
                className="text-deep-purple/70 hover:text-blue-purple cursor-pointer"
              />
              <CiBookmarkPlus
                size={25}
                className="text-deep-purple/80 hover:text-blue-purple cursor-pointer"
              />
            </div>
            <div className=" justify-center flex w-[50%]">
              <img
                src={item.selectedPhoto}
                alt=""
                className="min-h-[10rem] w-[70%]"
              />
            </div>
            {/* article body */}
            <div className="w-[50%]">
              <ReactQuill
                value={item.editorContent}
                readOnly={true}
                theme={"bubble"}
              />
            </div>
            <div className="flex-col flex sm:flex-row gap-2 justify-center items-center w-full h-20">
              {item.categoryList
                .filter((category) => category.id != "")
                .map((category, categoryIndex) => (
                  <div
                    key={categoryIndex}
                    className="min-w-[6rem] justify-center h-10 max-w-[10rem] bg-purple/10 text-deep-purple hover:border-purple/60 border-purple/30 text-[14px] p-[2px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 border-[1px]">
                    <span> {category.item}</span>
                  </div>
                ))}
            </div>
            <div className="w-[50%] h-14 flex justify-center items-center gap-10 border-b-[1px]">
              <IoMdHeartEmpty
                size={25}
                className="text-deep-purple/70 hover:text-blue-purple cursor-pointer"
              />
              <AiOutlineComment
                size={25}
                className="text-deep-purple/70 hover:text-blue-purple cursor-pointer"
              />
              <CiBookmarkPlus
                size={25}
                className="text-deep-purple/80 hover:text-blue-purple cursor-pointer"
              />
            </div>
          </div>
        </div>
      ))}
    </HomeLayout>
  );
};

export default ReadFullBlogPage;
