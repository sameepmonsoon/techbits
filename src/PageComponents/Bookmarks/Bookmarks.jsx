import React, { useEffect, useState } from "react";
import { HttpCalls } from "../../utils/HttpCalls";
import Card from "../../Components/Card/Card";
import avatarUser from "../../assets/user.svg";
import SkeletonCard from "../../Components/Card/SkeletonCard";
const Bookmarks = () => {
  const [currentUser, setCurrentUser] = useState();
  const [allBlogList, setAllBlogList] = useState([]);
  const [currentUserBookmark, setCurrentUserBookmark] = useState([]);

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage?.getItem("user")));
    setAllBlogList(JSON.parse(localStorage?.getItem("currentBlogPosts")));
  }, []);

  useEffect(() => {
    if (currentUser && allBlogList.length > 0) {
      HttpCalls.post("/auth/getBookmark", { userId: currentUser._id })
        .then((res) => {
          setCurrentUserBookmark(res.data?.getAll?.bookmarks);
        })
        .catch((err) => console.log(err));
    }
  }, [currentUser, allBlogList]);

  const bookmarkeItem = allBlogList?.filter((item) =>
    currentUserBookmark?.includes(item._id)
  );

  return bookmarkeItem && bookmarkeItem.length > 0 ? (
    <div className="w-full md:min-w-[50%] h-auto flex flex-col justify-center items-center p-5 gap-8">
      {bookmarkeItem.map((item, index) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(item.editorContent, "text/html");

        let filteredText = "";
        const paragraphs = doc.querySelectorAll("p");
        const images = doc.querySelectorAll("img");

        paragraphs.forEach((p) => {
          filteredText += p.textContent + " ";
        });

        const imageSources = Array.from(images).map((img) => img.src);

        return (
          <Card
            key={index}
            cardImage={item.selectedPhoto}
            row={true}
            cardPostDate={item.createdAt}
            cardTitle={item.titleContent}
            cardId={item._id}
            cardDescription={item.editorContent}
            cardUserImage={avatarUser}
          />
        );
      })}
    </div>
  ) : (
    <div className="w-full md:min-w-[50%] flex flex-col justify-start items-center p-5 gap-8 h-full pt-20">
      <SkeletonCard row={true} />
      <SkeletonCard row={true} />
    </div>
  );
};

export default Bookmarks;
