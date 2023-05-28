import React, { useEffect, useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CiBookmarkPlus,
  BsFillBookmarkCheckFill,
  ImSpinner5,
} from "react-icons/all";
import { IoMdHeartEmpty } from "react-icons/io";
import { AiOutlineComment } from "react-icons/ai";
import image from "../assets/craig-mckay-jmURdhtm7Ng-unsplash.jpg";
import ReactQuill, { Quill } from "react-quill";
import { HttpCalls } from "../utils/HttpCalls";
import { fetchAllBlogs } from "../Store/blogPostSlice";
import LoadingOverlayComponent from "../Components/LoadingOverlayComponent";
const ReadFullBlogPage = () => {
  //loading state
  const [isLoading, setIsLoading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeComment, setLikeComment] = useState([]);
  const { cardId } = useParams();
  const dispatch = useDispatch();
  const [currentBlog, setCurrentBlog] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentPost = currentBlog
    .filter((item) => item._id === cardId)
    .map((item) => item);
  useEffect(() => {
    setCurrentBlog(JSON.parse(localStorage.getItem("currentBlogPosts")));
  }, [isLoading]);
  const userId = currentUser._id;
  console.log("current user", userId);

  const [toFollowing, setToFollowing] = useState("Follow");
  const [showPage, setShowPage] = useState(true);
  // api calls for like bookmark and commetn
  const handleClickFollow = () => {
    setIsLoading(true);
    HttpCalls.post(`/blogReact/like`, { userId, blogId: cardId })
      .then((res) => {
        console.log(res.data.updatedlikeComment);
        setLikeComment(res.data.updatedlikeComment); // Update the likeComment state
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClickBookmark = () => {
    setIsLoading(true);
    HttpCalls.put(`/auth/bookmark`, { userId, blogId: cardId })
      .then((res) => {
        console.log(res.data.updatedUser);
        const bookmarkFlag = res.data.updatedUser.bookmarked;
        setIsBookmarked(bookmarkFlag);

        HttpCalls.get(`/auth/getBookmark`, { blogId: cardId })
          .then((res) => {
            const isBookMarked = res.data.getAll[0].bookmarks.includes(cardId);
            setIsBookmarked(isBookMarked);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    HttpCalls.post(`/blogReact/get`, { blogId: cardId })
      .then((res) => {
        console.log("inside api ", res.data);
        setLikeComment(res.data.findAll);
      })
      .catch((err) => {
        console.log(err);
      });
    HttpCalls.get(`/auth/getBookmark`, { blogId: cardId })
      .then((res) => {
        console.log(
          "inside api bookmark ",
          res.data.getAll[0].bookmarks.includes(cardId)
        );
        const isBookMarked = res.data.getAll[0].bookmarks.includes(cardId);
        setIsBookmarked(isBookMarked);
        setTimeout(() => {
          setShowPage(false);
        }, 200);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // Add cardId as a dependency

  console.log("isbookmarked", likeComment);
  return (
    <HomeLayout>
      <LoadingOverlayComponent openCloseOverlay={showPage}>
        <div className="fixed inset-0 bg-white text-purple flex flex-col justify-center items-center w-full text-6xl">
          <div className="flex  gap-5 items-center justify-center ">
            <span className="animate-pulse"> Loading . . .</span>
            {/* <ImSpinner5 size={45} className="animate-spin " />   */}
          </div>
        </div>
      </LoadingOverlayComponent>
      {currentPost.map((item, index) => (
        <div className="w-full flex flex-col justify-start items-center h-full gap-5 pt-10">
          {/* body container items starts here */}

          <p className=" w-[80%] sm:w-[50%] flex justify-center text-[32px] capitalize font-[700]">
            {item.titleContent}
          </p>

          <div className="flex flex-col w-full justify-center items-center gap-5">
            <div className="text-xl capitalize flex flex-row justify-start cursor-pointer border-b-[1px]  w-[80%] sm:w-[50%] gap-2 ">
              <img
                src={image}
                alt=""
                className="h-[3rem] w-[3rem] object-contain rounded-full"
              />
              <div className="flex flex-col">
                <div className="flex flex-row justify-start items-center gap-1">
                  <span className="text-black hover:text-blue-purple text-[18px]">
                    {item.username}
                  </span>
                  <span className="text-[12px]  text-white bg-green-700 border-[1px] border-green-400 hover:border-green-500 rounded-sm px-1 w-[3.8rem] max-w-none h-[1.3rem] items-center flex justify-center">
                    {toFollowing}
                  </span>
                </div>
                <span className="text-[14px] font-[500] text-black/60">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
            {/* article reactions and bookmark */}
            <div className=" w-[80%] sm:w-[50%] h-10 flex justify-center items-center gap-3 border-b-[1px]">
              <div className="flex justify-start gap-[1px]">
                <IoMdHeartEmpty
                  onClick={handleClickFollow}
                  size={25}
                  className="text-deep-purple/70 hover:text-blue-purple cursor-pointer"
                />
                <span>{likeComment?.likes?.length}</span>
              </div>
              <span className="flex justify-start gap-1">
                <AiOutlineComment
                  size={25}
                  className="text-deep-purple/70 hover:text-blue-purple cursor-pointer"
                />
              </span>
              <span className="flex justify-start gap-1">
                {isBookmarked ? (
                  <BsFillBookmarkCheckFill
                    onClick={handleClickBookmark}
                    size={21}
                    className="text-deep-purple/80 hover:text-blue-purple cursor-pointer"
                  />
                ) : (
                  <CiBookmarkPlus
                    onClick={handleClickBookmark}
                    size={25}
                    className="text-deep-purple/80 hover:text-blue-purple cursor-pointer"
                  />
                )}
              </span>
            </div>
            {/* photos and contents */}
            <div className=" justify-center flex  w-[80%] sm:w-[50%]">
              <img
                src={item.selectedPhoto}
                alt=""
                className="min-h-[10rem] w-[90%] sm:w-[70%]"
              />
            </div>
            {/* article body */}
            <div className=" w-[80%] sm:w-[50%]">
              <ReactQuill
                value={item.editorContent}
                readOnly={true}
                theme={"bubble"}
                style={{ fontSize: "18px" }}
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
            <div className=" w-[80%] sm:w-[50%] h-10 flex justify-center items-center gap-3 border-b-[1px]">
              <div className="flex justify-start gap-[1px]">
                <IoMdHeartEmpty
                  onClick={handleClickFollow}
                  size={25}
                  className="text-deep-purple/70 hover:text-blue-purple cursor-pointer"
                />
                <span>{likeComment?.likes?.length}</span>
              </div>
              <span className="flex justify-start gap-1">
                <AiOutlineComment
                  size={25}
                  className="text-deep-purple/70 hover:text-blue-purple cursor-pointer"
                />
              </span>
              <span className="flex justify-start gap-1">
                {isBookmarked ? (
                  <BsFillBookmarkCheckFill
                    onClick={handleClickBookmark}
                    size={21}
                    className="text-deep-purple/80 hover:text-blue-purple cursor-pointer"
                  />
                ) : (
                  <CiBookmarkPlus
                    onClick={handleClickBookmark}
                    size={25}
                    className="text-deep-purple/80 hover:text-blue-purple cursor-pointer"
                  />
                )}
              </span>
            </div>
          </div>
        </div>
      ))}
    </HomeLayout>
  );
};

export default ReadFullBlogPage;
