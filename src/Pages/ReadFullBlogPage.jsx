import React, { useEffect, useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  CiBookmarkPlus,
  BsFillBookmarkCheckFill,
  MdDeleteOutline,
  FiEdit3,
  MdEditNote,
  IoSettingsOutline,
} from "react-icons/all";
import { IoMdHeartEmpty } from "react-icons/io";
import { AiOutlineComment, AiOutlineDelete } from "react-icons/ai";
import ReactQuill, { Quill } from "react-quill";
import { HttpCalls } from "../utils/HttpCalls";
import LoadingOverlayComponent from "../Components/LoadingOverlayComponent";
import { toast } from "react-hot-toast";
import Card from "../Components/Card/Card";
import image from "../assets/data-processing.svg";
const ReadFullBlogPage = () => {
  const navigate = useNavigate();
  //loading state
  const [isLoading, setIsLoading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeComment, setLikeComment] = useState([]);
  const { cardId } = useParams();
  const dispatch = useDispatch();
  const [currentBlog, setCurrentBlog] = useState([]);

  // flag for the blog posted by the currentuse
  const [currentUserBlog, setCurrentUserBlog] = useState(false);
  const [showSetting, setShowSetting] = useState(false);

  // state to check if the blog is present or not
  const [blogIsPresent, setBlogIsPresent] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentPost = currentBlog
    .filter((item) => item._id === cardId)
    .map((item) => item);
  useEffect(() => {
    setCurrentBlog(JSON.parse(localStorage.getItem("currentBlogPosts")));
  }, [isLoading]);
  const currentUserId = currentUser?._id;

  const creatorId = currentPost[0]?.userId;
  const [isFollowing, setIsFollowing] = useState(false);
  const [allBlogPostByUser, setAllBlogPostByUser] = useState([]);
  const [showPage, setShowPage] = useState(true);
  // api calls for like bookmark and commetn
  const handleClickLike = () => {
    setIsLoading(true);
    HttpCalls.post(`/blogReact/like`, {
      userId: currentUserId,
      blogId: cardId,
      creatorId,
    })
      .then((res) => {
        setLikeComment(res.data.updatedlikeComment);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClickBookmark = () => {
    setIsLoading(true);
    HttpCalls.put(`/auth/bookmark`, { userId: currentUserId, blogId: cardId })
      .then((res) => {
        const bookmarkFlag = res?.data?.updatedUser?.bookmarks.includes(cardId);
        setIsBookmarked(bookmarkFlag);

        // HttpCalls.post(`/auth/getBookmark`, { userId: currentUserId })
        //   .then((res) => {
        //     const isBookMarked =
        //       res.data?.getAll[0]?.bookmarks.includes(cardId);
        //     // setIsBookmarked(isBookMarked);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    HttpCalls.post(`/blogReact/get`, { blogId: cardId })
      .then((res) => {
        setLikeComment(res.data.findAll[0]);
      })
      .catch((err) => {
        console.log(err);
      });

    if (currentUserId) {
      HttpCalls.post(`/auth/getBookmark`, { userId: currentUserId })
        .then((res) => {
          const isBookMarked = res.data?.getAll?.bookmarks?.includes(cardId);
          setIsBookmarked(isBookMarked);
          setIsFollowing(res.data.getAll?.following.includes(creatorId));
          setTimeout(() => {
            setShowPage(false);
          }, 200);
        })
        .catch((err) => {
          console.log(err);
        });

      //   // Update the follow status
      //   HttpCalls.put("/auth/follow", {
      //     userId: creatorId,
      //     followerId: currentUserId,
      //   })
      //     .then((res) => {
      //       console.log("inside follow api", res.data.updatedFollowList);
      //       setIsFollowing(
      //         res.data.updatedFollowList.following?.includes(creatorId)
      //       );
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      //
    }

    currentBlog.map((item) => {
      if (item._id == cardId && item.userId == currentUserId)
        setCurrentUserBlog(true);
    });

    currentBlog.map((item) => {
      if (item.titleContent == "") {
        navigate("/");
      }
    });

    // to get all the post of current id
    setAllBlogPostByUser(
      currentBlog?.filter((item) => item?.userId === creatorId)
    );
    console.log(allBlogPostByUser);
  }, [cardId, creatorId, currentUserId]);

  useEffect(() => {
    if (currentUser == null) {
      navigate("/");
    }
  }, []);
  const handleClickFollow = () => {
    HttpCalls.put("/auth/follow", {
      userId: creatorId,
      followerId: currentUserId,
    })
      .then((res) => {
        setIsFollowing(
          res.data.updatedFollowList.following?.includes(creatorId)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // delete your blog

  const handleDeleteBLog = () => {
    HttpCalls.deleteData(`/blogPost/deleteBlog/${cardId}`)
      .then((res) => {
        localStorage.setItem(
          "currentBlogPosts",
          JSON.stringify(res?.data?.allBlogsAfterDelete)
        );
        toast.success(`Blog Deleted Successfully.`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <HomeLayout>
      <LoadingOverlayComponent openCloseOverlay={showPage}>
        <div className="fixed inset-0 bg-white text-purple flex flex-col justify-center items-center w-full text-6xl">
          <div className="flex  gap-5 items-center justify-center ">
            <span className="animate-pulse"> Loading . . .</span>
          </div>
        </div>
      </LoadingOverlayComponent>
      {currentPost.map((item, index) => (
        <div
          key={index}
          className="w-full flex flex-col justify-start items-center h-full gap-5 pt-10">
          {/* body container items starts here */}

          <p className=" w-[80%] sm:w-[50%] flex justify-center text-[32px] capitalize font-[700]">
            {item.titleContent}
          </p>

          <div className="flex flex-col w-full justify-center items-center gap-5">
            <div className="text-xl capitalize flex flex-row justify-start cursor-pointer border-b-[1px]  w-[80%] sm:w-[50%] gap-2 ">
              {/* <img
                src={image}
                alt=""
                className="h-[3rem] w-[3rem] object-contain rounded-full"
              /> */}
              <div className="flex flex-col">
                <div className="flex flex-row justify-start items-center gap-1">
                  <span className="text-black hover:text-blue-purple text-[18px]">
                    {item.username}
                  </span>
                  {currentUserBlog ? (
                    <></>
                  ) : (
                    <span
                      onClick={handleClickFollow}
                      className="text-[12px]  text-white bg-green-700 border-[1px] border-green-400 hover:border-green-500 rounded-sm px-1 w-[3.8rem] max-w-none h-[1.3rem] items-center flex justify-center">
                      {isFollowing ? "Following" : "follow"}
                    </span>
                  )}
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
            <div className=" w-[80%] sm:w-[50%] h-[3rem] flex justify-center items-center gap-3 border-b-[1px]">
              <div className="flex justify-center items-center gap-[1px] group h-10">
                <IoMdHeartEmpty
                  onClick={handleClickLike}
                  size={28}
                  className="text-deep-purple/70 hover:text-pink-600 cursor-pointer hover:bg-pink-100 rounded-full p-[3px]"
                />
                <span className="group-hover:text-pink-500 group">
                  {likeComment?.likes?.length}
                </span>
              </div>
              <span className="flex justify-start gap-1">
                <AiOutlineComment
                  size={29}
                  className="text-deep-purple/70 hover:text-blue-500 cursor-pointer hover:bg-blue-100 rounded-full p-[3px]"
                />
              </span>
              <span className="flex justify-start gap-1">
                {isBookmarked ? (
                  <BsFillBookmarkCheckFill
                    onClick={handleClickBookmark}
                    size={25}
                    className="text-deep-purple/70 hover:text-green-700 cursor-pointer hover:bg-green-100 rounded-full p-[3px]"
                  />
                ) : (
                  <CiBookmarkPlus
                    onClick={handleClickBookmark}
                    size={29}
                    className="text-deep-purple/70 hover:text-green-700 cursor-pointer hover:bg-green-100 rounded-full p-[3px]"
                  />
                )}
              </span>
              {/* to delete or edit the blog  */}
              {currentUserBlog && (
                <div className="w-auto h-auto relative flex justify-center items-center">
                  <div
                    className="h-auto hover:bg-gray-200/60 rounded-full p-1 cursor-pointer"
                    onClick={() => setShowSetting((prev) => !prev)}>
                    <IoSettingsOutline size={23} />
                  </div>
                  {showSetting && (
                    <>
                      <div className="flex gap-1 absolute left-10 bg-white border-[1px] shadow-sm h-10 w-20 justify-center items-center rounded-md">
                        <MdEditNote
                          size={28}
                          className="text-deep-purple/70  hover:text-green-600 cursor-pointer"
                        />
                        <MdDeleteOutline
                          size={25}
                          className="text-deep-purple/70 hover:text-red-600 cursor-pointer"
                          onClick={handleDeleteBLog}
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
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
            <div className="flex-col flex sm:flex-row gap-2 justify-center items-center w-[50%] sm:w-full h-auto sm:h-20 flex-wrap">
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
                  onClick={handleClickLike}
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

          {/* container for similar blogs ---based on category  */}
          {allBlogPostByUser.length > 1 && (
            <div className="h-auto w-auto flex flex-col justify-center items-start py-5 gap-5">
              <p className="w-full flex items-center justify-center text-[32px] font-[600]">
                More From {item.username}
              </p>

              {allBlogPostByUser
                .filter((item) => item._id !== cardId)
                .map((item, index) => (
                  <>
                    <Link
                      to={`/read/${item._id}`}
                      key={index}
                      className="w-[45rem] h-[15rem] border-[1px] shadow-md rounded-md flex gap-1">
                      <div className="h-full w-[70%] p-2 flex-col flex justify-start items-start gap-2">
                        <div className="w-full h-[2rem] capitalize flex justify-start items-center  overflow-hidden">
                          {new Date(item.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </div>
                        <div className="w-full max-h-[4rem] text-[20px] capitalizeflex justify-start items-start overflow-hidden">
                          {item.titleContent}
                        </div>

                        <div className="w-full h-[3rem] capitalize flex justify-start items-center  overflow-hidden">
                          <div className="flex gap-2 overflow-hidden flex-wrap">
                            {item.categoryList
                              .filter(
                                (category, index) =>
                                  category.id !== "" && index < 3
                              )
                              .map((category, categoryIndex) => (
                                <div
                                  key={categoryIndex}
                                  className="w-auto justify-center h-[1rem] max-w-[10rem] bg-purple/10 text-deep-purple text-[14px] font-[400] p-[px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 py-3">
                                  <span> {category.item}</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                      <img
                        src={item.selectedPhoto}
                        alt="a"
                        className="min-w-[30%] h-full object-cover rounded-sm"
                      />
                    </Link>
                  </>
                ))}
            </div>
          )}
        </div>
      ))}

      {currentBlog.length > 1 && (
        <div className="h-auto w-auto flex flex-col justify-center items-start py-5 gap-5">
          <p className="w-full flex items-center justify-center text-[32px] font-[600]">
            Recommended Blogs
          </p>

          {currentBlog
            .filter((item) => item._id !== cardId)
            .map((item, index) => (
              <>
                <Link
                  to={`/read/${item._id}`}
                  key={index}
                  className="w-[45rem] h-[15rem] border-[1px] shadow-md rounded-md flex gap-1">
                  <div className="h-full w-[70%] p-2 flex-col flex justify-start items-start gap-2">
                    <div className="w-full h-[2rem] capitalize flex justify-start items-center  overflow-hidden gap-2">
                      {item.username}{" "}
                      <span className="h-full flex items-start">.</span>
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>

                    <div className="w-full max-h-[4rem] text-[20px] capitalizeflex justify-start items-start overflow-hidden">
                      {item.titleContent}
                    </div>

                    <div className="w-full h-[3rem] capitalize flex justify-start items-center  overflow-hidden">
                      <div className="flex gap-2 overflow-hidden flex-wrap">
                        {item.categoryList
                          .filter(
                            (category, index) => category.id !== "" && index < 3
                          )
                          .map((category, categoryIndex) => (
                            <div
                              key={categoryIndex}
                              className="w-auto justify-center h-[1rem] max-w-[10rem] bg-purple/10 text-deep-purple text-[14px] font-[400] p-[px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 py-3">
                              <span> {category.item}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <img
                    src={item.selectedPhoto}
                    alt="a"
                    className="min-w-[30%] h-full object-cover rounded-sm"
                  />
                </Link>
              </>
            ))}
        </div>
      )}
    </HomeLayout>
  );
};

export default ReadFullBlogPage;
