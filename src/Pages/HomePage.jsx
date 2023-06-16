import { useEffect, useState } from "react";
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
  const { isLoading, currentBlogPosts } = useSelector((state) => state.blog);
  const [getSearchValue, setGetSearchValue] = useState("");

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  const searchValueContent = (value) => {
    setGetSearchValue(value.toLowerCase().split(" ").join());
  };

  return (
    <HomeLayout
      renderComponents={
        <>
          <div className="font-sans flex flex-col justify-center items-center w-full ">
            <p className="text-[18px] font-[700] capitalize">Recent Posts</p>
            <div className="flex justify-center items-center gap-[8rem] flex-wrap py-10 w-full">
              {isLoading ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : (
                currentBlogPosts
                  .slice(0, 6)
                  .filter((item) =>
                    item.titleContent
                      .toLowerCase()
                      .split(" ")
                      .join()
                      .includes(getSearchValue)
                  )
                  .map((item, index) => (
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
                              if (categoryIndex === 0 || categoryIndex == 2) {
                                return (
                                  <div
                                    key={categoryIndex}
                                    className="w-auto justify-center h-[1rem] max-w-[10rem] bg-red-100/50 text-red-700 text-[13px] font-[400] p-[px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 py-3">
                                    <span> {category.item}</span>
                                  </div>
                                );
                              } else if (
                                categoryIndex == 1 ||
                                categoryIndex == 3
                              ) {
                                return (
                                  <div
                                    key={categoryIndex}
                                    className="w-auto justify-center h-[1rem] max-w-[10rem] bg-green-100/80 text-green-700 text-[13px] font-[400] p-[px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 py-3">
                                    <span> {category.item}</span>
                                  </div>
                                );
                              } else if (
                                categoryIndex === 4 ||
                                categoryIndex == 5
                              ) {
                                return (
                                  <div
                                    key={categoryIndex}
                                    className="w-auto justify-center h-[1rem] max-w-[10rem] bg-rose-100/70 text-rose-700 text-[13px] font-[400] p-[px] gap-1 flex items-center whitespace-nowrap capitalize rounded-full px-2 py-3">
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
      <HeroSectionText align={"center"} getSearchValue={searchValueContent} />
      <Outlet />
    </HomeLayout>
  );
};

export default HomePage;
