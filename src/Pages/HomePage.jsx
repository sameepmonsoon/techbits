import React, { useEffect, useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import HeroSectionText from "../PageComponents/HeroSectionText/HeroSectionText";
import Card from "../Components/Card/Card";
import image from "../assets/amr-taha-PksS6SX-t-c-unsplash.jpg";
import { Outlet } from "react-router-dom";
import InfoSection from "../PageComponents/InfoSection/InfoSection";
import infoImage from "../assets/rezvani-IIDZ77VDVQE-unsplash.jpg";
import { fetchAllBlogs } from "../Store/blogPostSlice";
import { useDispatch, useSelector } from "react-redux";
import SkeletonCard from "../Components/Card/SkeletonCard";

const HomePage = () => {
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
  console.log("current post", currentBlogPosts);

  return (
    <HomeLayout
      renderComponents={
        <>
          <div className="font-sans flex flex-col justify-center items-center w-full">
            <p className="text-[18px] font-[700] capitalize">Recent Posts</p>
            <div className="flex justify-center items-center gap-[8rem] flex-wrap py-10 w-full">
              {isLoading ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : (
                currentBlogPosts.map((item, index) => (
                  <Card
                    cardId={item._id}
                    tag={
                      <div className="flex gap-2 overflow-hidden">
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
                    }
                    cardTitle={item.titleContent}
                    cardDescription={""}
                    cardUserName={item.username}
                    cardImage={item.selectedPhoto}
                    cardPostDate={item.createdAt}
                    cardUserImage={image}
                  />
                ))
              )}
            </div>
          </div>
          <div className="min-h-screen border-t-[1px] border-t-gray-300 w-full">
            <InfoSection
              infoText={"Join 1000+ startups growing with blog"}
              infoImage={infoImage}
            />
          </div>
        </>
      }>
      <HeroSectionText align={"center"} />
      <Outlet />
    </HomeLayout>
  );
};

export default HomePage;
