import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";

const Bookmarks = () => {
  const [currentUser, setCurrentUser] = useState();
  const [allBlogList, setAllBlogList] = useState([]);
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage?.getItem("user")));
    setAllBlogList(JSON.parse(localStorage?.getItem("currentBlogPosts")));
    console.log(allBlogList);
  }, []);
  const bookmarkeItem = allBlogList?.filter((item) =>
    currentUser?.bookmarks?.includes(item._id)
  );
  console.log("bookmarked item a", bookmarkeItem);

  return (
    <div className="w-[50%] h-auto flex flex-col justify-center items-center p-5 gap-5 ">
      {bookmarkeItem.map((item, index) => (
        <div className="relative flex w-full bg-red-800 h-[8rem] sm:h-[14rem] justify-start flex-row items-start">
          <img
            src={item.selectedPhoto}
            alt=""
            className="order-2  z-[0] top-0 h-full w-[30%] object-cover"
          />
          <div className="w-full relative h-full flex-col flex  justify-start">
            <span className="w-full bg-red-900 flex justify-start px-1 gap-2">
              {item.username}-
              {new Date(item.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="text-[14px] sm:text-xl">{item.titleContent}</span>
            <div className="text-[14px] sm:text-xl overflow-hidden">
              <ReactQuill
                value={item.editorContent}
                readOnly={true}
                theme={"bubble"}
              />
              {item.titleContent}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bookmarks;
