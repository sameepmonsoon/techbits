import { useEffect, useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  CiBookmarkPlus,
  BsFillBookmarkCheckFill,
  MdDeleteOutline,
  MdEditNote,
  IoSettingsOutline,
} from "react-icons/all";
import { IoMdHeartEmpty } from "react-icons/io";
import { AiOutlineComment } from "react-icons/ai";
import ReactQuill from "react-quill";
import { HttpCalls } from "../utils/HttpCalls";
import LoadingOverlayComponent from "../Components/LoadingOverlayComponent";
import CommentBox from "../PageComponents/CommentBox/CommentBox";
import { toastMessageSuccess } from "../Services/Toast Messages/ToastMessages";
const ReadFullBlogPage = () => {
  const navigate = useNavigate();

  // state for delete modal open/close
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // to show comment
  const [showComment, setShowComment] = useState(false);
  //loading state
  const [isLoading, setIsLoading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeComment, setLikeComment] = useState([]);
  const { cardId } = useParams();
  const [currentBlog, setCurrentBlog] = useState([]);

  // flag for the blog posted by the currentuse
  const [currentUserBlog, setCurrentUserBlog] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  // state after adding comment
  const [commentUpdated, setCommentUpdated] = useState(false);
  // state to check if the blog is present or not
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentPost = currentBlog
    .filter((item) => item._id === cardId)
    .map((item) => item);
  useEffect(() => {
    setCurrentBlog(JSON.parse(localStorage.getItem("currentBlogPosts")));
  }, [isLoading, commentUpdated]);
  const currentUserId = currentUser?._id;

  const creatorId = currentPost[0]?.userId;
  const [isFollowing, setIsFollowing] = useState(false);
  const [allBlogPostByUser, setAllBlogPostByUser] = useState([]);
  const [showPage, setShowPage] = useState(true);

  // api calls for like bookmark and comment
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

        toastMessageSuccess(`Blog Deleted successfully.`);

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
              <div className="group flex justify-center items-center gap-[1px] group h-10 relative">
                <IoMdHeartEmpty
                  onClick={handleClickLike}
                  size={28}
                  className="text-deep-purple/70 hover:text-pink-600 cursor-pointer hover:bg-pink-100 rounded-full p-[3px]"
                />
                <span className="group-hover:text-pink-500 group">
                  {likeComment?.likes?.length}
                </span>
                <div className="absolute  top-10 group-hover:flex hidden z-20  cursor-pointer  group-hover:bg-white border-[1px] border-gray-300 shadow-sm   h-8 w-20 rounded-md overflow-hidden items-center justify-center">
                  React
                </div>
              </div>
              <div className="flex justify-start gap-1 group relative">
                <AiOutlineComment
                  size={29}
                  className="text-deep-purple/70 hover:text-blue-500 cursor-pointer hover:bg-blue-100 rounded-full p-[3px]"
                />
                <span className="absolute text-[14px] left-[-1rem] top-9 group-hover:flex hidden z-20  group-hover:bg-white border-[1px] border-gray-300 shadow-sm  h-8 w-20 rounded-md overflow-hidden items-center justify-center">
                  Comment
                </span>
              </div>
              <span className="flex justify-start gap-1">
                {isBookmarked ? (
                  <div className="relative group flex justify-center items-center gap-[1px]">
                    <BsFillBookmarkCheckFill
                      onClick={handleClickBookmark}
                      size={25}
                      className="text-deep-purple/70 hover:text-green-700 cursor-pointer hover:bg-green-100 rounded-full p-[3px]"
                    />
                    <span className="absolute text-[14px] left-[-1rem] top-9 group-hover:flex hidden z-20  group-hover:bg-white border-[1px] border-gray-300 shadow-sm  h-8 w-[8rem] rounded-md overflow-hidden items-center justify-center">
                      Remove Bookmark
                    </span>
                  </div>
                ) : (
                  <div className="relative group flex justify-center items-center gap-[1px]">
                    <CiBookmarkPlus
                      onClick={handleClickBookmark}
                      size={29}
                      className="text-deep-purple/70 hover:text-green-700 cursor-pointer hover:bg-green-100 rounded-full p-[3px]"
                    />
                    <span className="absolute text-[14px] left-[-1rem] top-9 group-hover:flex hidden z-20  group-hover:bg-white border-gray-300 border-[1px] shadow-sm  h-8 w-[8rem] rounded-md overflow-hidden items-center justify-center">
                      Add Bookmark
                    </span>
                  </div>
                )}
              </span>
              {/* to delete or edit the blog  */}
              {currentUserBlog && (
                <div className="w-auto h-auto relative flex justify-center items-center">
                  <div
                    className={`h-auto hover:bg-gray-200/60 ${
                      showSetting && "bg-gray-200/60"
                    } rounded-full p-1 cursor-pointer relative group`}
                    onClick={() => setShowSetting((prev) => !prev)}>
                    <IoSettingsOutline size={23} />
                    {!showSetting && (
                      <div className="absolute  top-10 group-hover:flex hidden z-20  cursor-pointer  group-hover:bg-white border-[1px] border-gray-300 shadow-sm  h-8 w-20 rounded-md overflow-hidden items-center justify-center">
                        Settings
                      </div>
                    )}
                  </div>
                  {showSetting && (
                    <>
                      <div className="flex gap-1 absolute left-10 bg-white border-[1px] shadow-sm h-10 w-20 justify-center items-center rounded-md">
                        <div className="relative group">
                          <Link to={`/writeBlog/${cardId}`}>
                            <MdEditNote
                              size={28}
                              className="text-deep-purple/70  hover:text-green-600 cursor-pointer"
                            />
                          </Link>
                          <div
                            className="absolute left-[-20px] top-9
                            group-hover:flex hidden z-20 cursor-pointer
                            group-hover:bg-white border-[1px] border-gray-300
                            shadow-sm h-8 w-20 rounded-md overflow-hidden
                            items-center justify-center">
                            Edit
                          </div>
                        </div>
                        <div className="relative ">
                          <div className="relative group">
                            <MdDeleteOutline
                              size={25}
                              className="text-deep-purple/70 hover:text-red-600 cursor-pointer"
                              onClick={() => {
                                setOpenDeleteModal((prev) => !prev);
                              }}
                            />
                            {!openDeleteModal && (
                              <div className="absolute left-[-25px]  top-9 group-hover:flex hidden z-20  cursor-pointer  group-hover:bg-white border-[1px] border-gray-300 shadow-sm  h-8 w-20 rounded-md overflow-hidden items-center justify-center">
                                Delete
                              </div>
                            )}
                          </div>{" "}
                          {openDeleteModal && (
                            <div className="absolute bg-white border-[1px] shadow-md gap-2 h-20 w-40 rounded-md text-[16px] flex flex-col justify-center items-center left-[-5rem] z-30 top-[3rem]">
                              <span>Are you sure?</span>

                              <div className="w-full flex gap-4 justify-center">
                                <span
                                  onClick={handleDeleteBLog}
                                  className="cursor-pointer h-auto  hover:text-red-500 px-1 rounded-md flex justify-center items-center">
                                  Delete
                                </span>
                                <span
                                  onClick={() => {
                                    setOpenDeleteModal(false);
                                  }}
                                  className="cursor-pointer h-auto  hover:text-green-500 px-1 rounded-md flex justify-center items-center">
                                  Cancel
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
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
                .map((category, categoryIndex) => {
                  if (categoryIndex === 0 || categoryIndex === 5) {
                    return (
                      <div
                        key={categoryIndex}
                        className="min-w-[6rem] justify-center h-8 max-w-[10rem] bg-red-100 text-red-700 hover:border-red-500 border-red-300 text-[14px] p-[2px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 border-[0px]">
                        <span> {category.item}</span>
                      </div>
                    );
                  } else if (categoryIndex == 1 || categoryIndex === 5) {
                    return (
                      <div
                        key={categoryIndex}
                        className="min-w-[6rem] justify-center h-8 max-w-[10rem] bg-green-100 text-green-700 hover:border-green-500 border-green-300 text-[14px] p-[2px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 border-[0px]">
                        <span> {category.item}</span>
                      </div>
                    );
                  } else if (categoryIndex === 2 || categoryIndex === 6) {
                    return (
                      <div
                        key={categoryIndex}
                        className="min-w-[6rem] justify-center h-8 max-w-[10rem] bg-blue-100 text-blue-700 hover:border-blue-500 border-blue-300 text-[14px] p-[2px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 border-[0px]">
                        <span> {category.item}</span>
                      </div>
                    );
                  } else if (categoryIndex == 3 || categoryIndex === 7) {
                    return (
                      <div
                        key={categoryIndex}
                        className="min-w-[6rem] justify-center h-8 max-w-[10rem] bg-teal-100 text-teal-700 hover:border-teal-500 border-teal-300 text-[14px] p-[2px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 border-[0px]">
                        <span> {category.item}</span>
                      </div>
                    );
                  } else if (categoryIndex == 4 || categoryIndex === 8) {
                    return (
                      <div
                        key={categoryIndex}
                        className="min-w-[6rem] justify-center h-8 max-w-[10rem] bg-yellow-100 text-yellow-700 hover:border-yellow-500 border-yellow-300 text-[14px] p-[2px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 border-[0px]">
                        <span> {category.item}</span>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={categoryIndex}
                        className="min-w-[6rem] justify-center h-8 max-w-[10rem] bg-rose-100 text-rose-700 hover:border-rose-500 border-rose-300 text-[14px] p-[2px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 border-[0px]">
                        <span> {category.item}</span>
                      </div>
                    );
                  }
                })}
            </div>
            {/* page bottom reaction */}
            <div className=" w-[80%] sm:w-[50%] h-[3rem] flex justify-center items-center gap-3 border-b-[1px]">
              <div className="group flex justify-center items-center gap-[1px] group h-10 relative">
                <IoMdHeartEmpty
                  onClick={handleClickLike}
                  size={28}
                  className="text-deep-purple/70 hover:text-pink-600 cursor-pointer hover:bg-pink-100 rounded-full p-[3px]"
                />
                <span className="group-hover:text-pink-500 group">
                  {likeComment?.likes?.length}
                </span>
                <div className="absolute  top-10 group-hover:flex hidden z-20  cursor-pointer  group-hover:bg-white border-[1px] border-gray-300 shadow-sm   h-8 w-20 rounded-md overflow-hidden items-center justify-center">
                  React
                </div>
              </div>
              <div className="flex justify-start gap-1 group relative">
                <AiOutlineComment
                  onClick={() => {
                    setShowComment((prev) => !prev);
                  }}
                  size={29}
                  className="text-deep-purple/70 hover:text-blue-500 cursor-pointer hover:bg-blue-100 rounded-full p-[3px]"
                />
                <span className="absolute text-[14px] left-[-1rem] top-9 group-hover:flex hidden z-20  group-hover:bg-white border-[1px] border-gray-300 shadow-sm  h-8 w-20 rounded-md overflow-hidden items-center justify-center">
                  Comment
                </span>
              </div>
              <span className="flex justify-start gap-1">
                {isBookmarked ? (
                  <div className="relative group flex justify-center items-center gap-[1px]">
                    <BsFillBookmarkCheckFill
                      onClick={handleClickBookmark}
                      size={25}
                      className="text-deep-purple/70 hover:text-green-700 cursor-pointer hover:bg-green-100 rounded-full p-[3px]"
                    />{" "}
                    <span className="absolute text-[14px] left-[-1rem] top-9 group-hover:flex hidden z-20  group-hover:bg-white border-[1px] border-gray-300 shadow-sm  h-8 w-[8rem] rounded-md overflow-hidden items-center justify-center">
                      Remove Bookmark
                    </span>
                  </div>
                ) : (
                  <div className="relative group flex justify-center items-center gap-[1px]">
                    <CiBookmarkPlus
                      onClick={handleClickBookmark}
                      size={29}
                      className="text-deep-purple/70 hover:text-green-700 cursor-pointer hover:bg-green-100 rounded-full p-[3px]"
                    />
                    <span className="absolute text-[14px] left-[-1rem] top-9 group-hover:flex hidden z-20  group-hover:bg-white border-gray-300 border-[1px] shadow-sm  h-8 w-[8rem] rounded-md overflow-hidden items-center justify-center">
                      Add Bookmark
                    </span>
                  </div>
                )}
              </span>
            </div>
            {currentPost.map((item, index) => (
              <div
                key={index}
                className="w-[50%] flex flex-col justify-start items-start gap-1">
                <p className="w-full h-10 flex justify-center items-start border-b-[1px]">
                  Comments
                </p>
                <div className="w-full flex flex-col justify-start items-start gap-1">
                  {item.comments.map((item, index) => (
                    <div
                      key={index}
                      className="w-full h-10 border-[1px] rounded-md p-2 ">
                      {item.content}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {showComment && (
              <div className="">
                <CommentBox
                  cardId={cardId}
                  userId={currentUserId}
                  commentAdded={setCommentUpdated}
                />
              </div>
            )}
          </div>

          {/* container for similar blogs ---based on category  */}
          {allBlogPostByUser.length > 1 && (
            <div className="h-auto w-auto flex flex-col justify-center items-start py-5 gap-5">
              <p className="w-full flex items-center justify-center text-[32px] font-[600]">
                More from {item.username}
              </p>

              {allBlogPostByUser
                .filter((item) => item._id !== cardId)
                .map((item, index) => (
                  <>
                    <Link
                      to={`/read/${item._id}`}
                      key={index}
                      className="w-[22rem] sm:w-[45rem] h-[22rem] sm:h-[15rem] border-[1px] shadow-md rounded-md flex gap-1 flex-col sm:flex-row">
                      <div className="h-full w-full sm:w-[70%] p-2 flex-col flex justify-start items-start gap-2 order-2 sm:order-1">
                        <div className="w-full h-[2rem] capitalize flex justify-start items-center  overflow-hidden gap-2 ">
                          {item.username}{" "}
                          <span className="h-full flex items-start">.</span>
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

                        <div className="min-w-full h-auto sm:h-[3rem] capitalize flex justify-start items-center  overflow-hidden">
                          <div className="flex gap-2 overflow-hidden flex-wrap min-w-full ">
                            {item.categoryList
                              .filter(
                                (category, index) =>
                                  category.id !== "" && index < 3
                              )
                              .map((category, categoryIndex) => {
                                if (categoryIndex === 0) {
                                  return (
                                    <div
                                      key={categoryIndex}
                                      className="w-auto justify-center h-[1rem] max-w-[10rem] bg-green-100/80 text-green-700 text-[13px] font-[400] p-[px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 py-3">
                                      <span> {category.item}</span>
                                    </div>
                                  );
                                } else if (categoryIndex == 1) {
                                  return (
                                    <div
                                      key={categoryIndex}
                                      className="w-auto justify-center h-[1rem] max-w-[10rem]  bg-red-100/50 text-red-700 text-[13px] font-[400] p-[px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 py-3">
                                      <span> {category.item}</span>
                                    </div>
                                  );
                                } else if (categoryIndex === 2) {
                                  return (
                                    <div
                                      key={categoryIndex}
                                      className="w-auto justify-center h-[1rem] max-w-[10rem] bg-yellow-100/70 text-yellow-700 text-[13px] font-[400] p-[px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 py-3">
                                      <span> {category.item}</span>
                                    </div>
                                  );
                                } else {
                                  return (
                                    <div
                                      key={categoryIndex}
                                      className="w-auto justify-center h-[1rem] max-w-[10rem] bg-purple/10 text-deep-purple text-[13px] font-[400] p-[px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 py-3">
                                      <span> {category.item}</span>
                                    </div>
                                  );
                                }
                              })}
                          </div>
                        </div>
                      </div>
                      <img
                        src={item.selectedPhoto}
                        alt="a"
                        className="w-full  sm:w-[40%] min-h-[30%] sm:h-full object-cover rounded-sm order-1 sm:order-2"
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
            .filter(
              (item, index) =>
                item._id !== cardId &&
                item.userId !== currentUserId &&
                index < 6
            )
            .map((item, index) => (
              <>
                <Link
                  to={`/read/${item._id}`}
                  key={index}
                  className="w-[22rem] sm:w-[45rem] h-[22rem] sm:h-[15rem] border-[1px] shadow-md rounded-md flex gap-1 flex-col sm:flex-row">
                  <div className="h-full w-full sm:w-[70%] p-2 flex-col flex justify-start items-start gap-2 order-2 sm:order-1">
                    <div className="w-full h-[2rem] capitalize flex justify-start items-center  overflow-hidden gap-2 ">
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
                    <div className="min-w-full h-auto sm:h-[3rem] capitalize flex justify-start items-center  overflow-hidden">
                      <div className="flex gap-2 overflow-hidden flex-wrap min-w-full ">
                        {item.categoryList
                          .filter(
                            (category, index) => category.id !== "" && index < 3
                          )
                          .map((category, categoryIndex) => {
                            if (categoryIndex === 0) {
                              return (
                                <div
                                  key={categoryIndex}
                                  className="w-auto justify-center h-[1rem] max-w-[10rem] bg-green-100/80 text-green-700 text-[13px] font-[400] p-[px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 py-3">
                                  <span> {category.item}</span>
                                </div>
                              );
                            } else if (categoryIndex == 1) {
                              return (
                                <div
                                  key={categoryIndex}
                                  className="w-auto justify-center h-[1rem] max-w-[10rem]  bg-red-100/50 text-red-700 text-[13px] font-[400] p-[px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 py-3">
                                  <span> {category.item}</span>
                                </div>
                              );
                            } else if (categoryIndex === 2) {
                              return (
                                <div
                                  key={categoryIndex}
                                  className="w-auto justify-center h-[1rem] max-w-[10rem] bg-yellow-100/70 text-yellow-700 text-[13px] font-[400] p-[px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 py-3">
                                  <span> {category.item}</span>
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  key={categoryIndex}
                                  className="w-auto justify-center h-[1rem] max-w-[10rem] bg-purple/10 text-deep-purple text-[13px] font-[400] p-[px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 py-3">
                                  <span> {category.item}</span>
                                </div>
                              );
                            }
                          })}
                      </div>
                    </div>
                  </div>
                  <img
                    src={item.selectedPhoto}
                    alt="a"
                    className="w-full  sm:w-[40%] min-h-[30%] sm:h-full object-cover rounded-sm order-1 sm:order-2"
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
