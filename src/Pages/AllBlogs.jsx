import React, { useEffect, useState } from "react";
import BlogsPageLayout from "../Layout/BlogsPageLayout";
import HeroSectionText from "../PageComponents/HeroSectionText/HeroSectionText";
import Card from "../Components/Card/Card";
import image from "../assets/amr-taha-PksS6SX-t-c-unsplash.jpg";
import { Outlet } from "react-router-dom";
import InfoSection from "../PageComponents/InfoSection/InfoSection";
import infoImage from "../assets/rezvani-IIDZ77VDVQE-unsplash.jpg";
import { fetchAllBlogs } from "../Store/blogPostSlice";
import { useDispatch, useSelector } from "react-redux";
import SkeletonCard from "../Components/Card/SkeletonCard";

const AllBlogs = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [currentBlogPosts, setCurrentBlogPosts] = useState([]);
  useEffect(() => {
    dispatch(fetchAllBlogs());
    setCurrentBlogPosts(JSON.parse(localStorage.getItem("currentBlogPosts")));
  }, []);
  setTimeout(() => {
    setIsLoading(false);
  }, 800);
  // const { isLoading } = useSelector((state) => state.blog);

  return (
    <BlogsPageLayout
      renderComponents={<HeroSectionText align={"center"} color={"white"} />}>
      <>
        <div className="font-sans flex flex-col justify-center items-center w-full ">
          {/* <p className="text-[18px] font-[700] capitalize">Recent Posts</p> */}
          <div className="flex justify-center items-center gap-[8rem] flex-wrap py-10 w-full">
            {isLoading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              currentBlogPosts
                .filter((item, index) => index < 6)
                .map((item, index) => {
                  if (index === 0) {
                    return (
                      <div className="w-full flex items-center justify-center relative top-[-6rem] h-[10rem]"    key={index}>
                        <Card
                          autoHeight={true}
                          key={index}
                          cardId={item._id}
                          writerId={item.userId}
                          tag={
                            <div className="flex gap-2 overflow-hidden">
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
                                        className="w-auto justify-center h-[1rem] max-w-[10rem] bg-red-100/50 text-red-700 text-[13px] font-[400] p-[px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 py-3">
                                        <span> {category.item}</span>
                                      </div>
                                    );
                                  } else if (categoryIndex == 1) {
                                    return (
                                      <div
                                        key={categoryIndex}
                                        className="w-auto justify-center h-[1rem] max-w-[10rem] bg-green-100/80 text-green-700 text-[13px] font-[400] p-[px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 py-3">
                                        <span> {category.item}</span>
                                      </div>
                                    );
                                  } else if (categoryIndex === 2) {
                                    return (
                                      <div
                                        key={categoryIndex}
                                        className="w-auto justify-center h-[1rem] max-w-[10rem] bg-purple/10 text-deep-purple text-[13px] font-[400] p-[px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 py-3">
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
                          }
                          cardTitle={item.titleContent}
                          cardDescription={item.editorContent}
                          cardUserName={item.username}
                          cardImage={item.selectedPhoto}
                          cardPostDate={item.createdAt}
                          cardUserImage={image}
                        />
                        ;
                      </div>
                    );
                  } else {
                    return (
                      <Card
                        key={index}
                        cardId={item._id}
                        writerId={item.userId}
                        tag={
                          <div className="flex gap-2 overflow-hidden">
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
                        }
                        cardTitle={item.titleContent}
                        cardDescription={""}
                        cardUserName={item.username}
                        cardImage={item.selectedPhoto}
                        cardPostDate={item.createdAt}
                        cardUserImage={image}
                      />
                    );
                  }
                })
            )}
          </div>
        </div>
      </>
      <Outlet />
    </BlogsPageLayout>
  );
};

export default AllBlogs;
