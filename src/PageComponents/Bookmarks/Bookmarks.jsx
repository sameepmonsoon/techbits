import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import { HttpCalls } from "../../utils/HttpCalls";

const Bookmarks = () => {
  const [currentUser, setCurrentUser] = useState();
  const [allBlogList, setAllBlogList] = useState([]);
  const [currentUserBookmark, setCurrentUserBookmark] = useState([]);
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage?.getItem("user")));
    setAllBlogList(JSON.parse(localStorage?.getItem("currentBlogPosts")));
  }, []);
  useEffect(() => {
    HttpCalls.post("/auth/getBookmark", { userId: currentUser?._id }).then(
      (res) => {
        setCurrentUserBookmark(res.data?.getAll?.bookmarks);
      }
    );
  }, [currentUser?._id]);
  const bookmarkeItem = allBlogList?.filter((item) =>
    currentUserBookmark?.includes(item._id)
  );
  return (
    <div className="w-full md:min-w-[50%] h-auto flex flex-col justify-center items-center p-5 gap-8">
      {bookmarkeItem.map((item, index) => (
        <div key={index} className="relative flex w-full  h-[8rem] sm:h-[10rem] justify-start flex-row items-start border-b-2 gap-1">
          <img
            src={item.selectedPhoto}
            alt=""
            className="order-2  z-[0] top-0 h-full w-[30%] object-cover"
          />
          <div className="w-full relative h-full flex-col flex  justify-start">
            <span className="w-full  flex justify-start px-0 gap-2">
              {item.username}-
              {new Date(item.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <Link
              to={`/read/${item._id}`}
              className="text-[14px] sm:text-xl font-bold cursor-pointer">
              {item.titleContent}
            </Link>
            <div className=" hidden  text-[19px] overflow-hidden relative left-[-12px]">
              <ReactQuill
                className="overflow-hidden"
                value={item.editorContent}
                readOnly={true}
                theme={"bubble"}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bookmarks;
