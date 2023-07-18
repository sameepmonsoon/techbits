import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HttpCalls } from "../utils/HttpCalls";
import SkeletonCard from "../Components/Card/SkeletonCard";
import { fetchAllBlogs } from "../Store/blogPostSlice";
const withFetch = (Component, url) => {
  return function HOCComp(props) {
    const { currentBlogPosts } = useSelector((state) => state.blog);
    const dispatch = useDispatch();
    const [currentList, setCurrentList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      dispatch(fetchAllBlogs());
    }, [dispatch]);

    useEffect(() => {
      HttpCalls.get(url)
        .then((res) => {
          setCurrentList([]);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, []);
    return (
      <Component
        currentBlogPosts={currentBlogPosts}
        currentList={currentList}
        isLoading={isLoading}
        {...props}>
        {" "}
        <p className="text-[18px] font-[700] capitalize">Recent Posts</p>
        {isLoading && (
          <>
            <br />
            <br />
            <div className="flex sm:gap-10 flex-wrap lg:flex-nowrap w-full h-full justify-center align-center p-10">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </>
        )}
      </Component>
    );
  };
};

export default withFetch;
